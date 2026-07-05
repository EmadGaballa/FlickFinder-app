import { Router } from "express";
import authRoutes from "../auth/auth.routes.js";
import usersRoutes from "../users/users.routes.js";
import favoritesRoutes from "../favorites/favorites.routes.js";
import watchlistRoutes from "../watchlist/watchlist.routes.js";
import ratingsRoutes from "../ratings/ratings.routes.js";
import friendsRoutes from "../friends/friends.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/favorites", favoritesRoutes);
router.use("/watchlist", watchlistRoutes);
router.use("/ratings", ratingsRoutes);
router.use("/friends", friendsRoutes);

export default router;