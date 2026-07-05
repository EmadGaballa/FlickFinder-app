import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./utils/config.js";
import { errorHandler } from "./middleware/errorHandler.js";
import routes from "./routes/index.js";

const app = express();

// Middleware
app.use(cors({
  origin: config.clientUrl,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", routes);

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Error handler
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`🚀 Server running on http://localhost:${config.port}`);
});

export default app;