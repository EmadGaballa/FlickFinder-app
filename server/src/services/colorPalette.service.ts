import sharp from "sharp";

export interface HeroPalette {
  primary: string; // "r, g, b" string, e.g. "180, 90, 40"
  secondary: string;
  glow: string;
  isDark: boolean;
}

// Keeps already-computed colors in memory so we don't re-download and
// re-process the same movie backdrop every single time someone visits
// a profile. Resets when the server restarts — that's fine.
const paletteCache = new Map<string, HeroPalette | null>();
const MAX_CACHE_ENTRIES = 500;

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r:
        h = ((g - b) / d) % 6;
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s, l };
}

export async function extractHeroPalette(
  imageUrl: string,
): Promise<HeroPalette | null> {
  if (paletteCache.has(imageUrl)) {
    return paletteCache.get(imageUrl)!;
  }

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error(`Image fetch failed: ${response.status}`);
    const buffer = Buffer.from(await response.arrayBuffer());

    const { data, info } = await sharp(buffer)
      .resize(32, 18, { fit: "cover" })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const channels = info.channels;
    const buckets = new Map<
      number,
      { count: number; r: number; g: number; b: number; s: number; l: number }
    >();

    for (let i = 0; i < data.length; i += channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const { h, s, l } = rgbToHsl(r, g, b);

      if (l < 0.06 || l > 0.94) continue; // skip near-black / near-white pixels

      const hueBucket = Math.round(h / 15) * 15;
      const existing = buckets.get(hueBucket);
      if (existing) {
        existing.count += 1;
        existing.r += r;
        existing.g += g;
        existing.b += b;
      } else {
        buckets.set(hueBucket, { count: 1, r, g, b, s, l });
      }
    }

    const sorted = [...buckets.values()]
      .filter((b) => b.s > 0.12)
      .sort((a, b) => b.count * (0.5 + b.s) - a.count * (0.5 + a.s));

    if (sorted.length === 0) {
      paletteCache.set(imageUrl, null);
      return null;
    }

    const toRgbString = (bucket: (typeof sorted)[number]) =>
      `${Math.round(bucket.r / bucket.count)}, ${Math.round(bucket.g / bucket.count)}, ${Math.round(bucket.b / bucket.count)}`;

    const primaryBucket = sorted[0];
    const secondaryBucket =
      sorted.find((b) => b !== primaryBucket) ?? primaryBucket;

    const totalCount = sorted.reduce((sum, b) => sum + b.count, 0);
    const avgL = sorted.reduce((sum, b) => sum + b.l * b.count, 0) / totalCount;

    const palette: HeroPalette = {
      primary: toRgbString(primaryBucket),
      secondary: toRgbString(secondaryBucket),
      glow: toRgbString(primaryBucket),
      isDark: avgL < 0.45,
    };

    if (paletteCache.size >= MAX_CACHE_ENTRIES) {
      const firstKey = paletteCache.keys().next().value;
      if (firstKey) paletteCache.delete(firstKey);
    }
    paletteCache.set(imageUrl, palette);
    return palette;
  } catch (err) {
    console.error("Palette extraction failed:", err);
    paletteCache.set(imageUrl, null);
    return null;
  }
}
