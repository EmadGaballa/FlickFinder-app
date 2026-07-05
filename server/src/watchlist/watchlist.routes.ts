import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import * as watchlistController from "./watchlist.controller.js";

const router = Router();

// GET /watchlist/ids - lightweight
router.get("/ids", authenticate, watchlistController.getIds);

// GET /watchlist
router.get("/", authenticate, watchlistController.getMyWatchlist);

// GET /watchlist/user/:username
router.get("/user/:username", watchlistController.getUserWatchlist);

// POST /watchlist
router.post("/", authenticate, watchlistController.addToWatchlist);

// DELETE /watchlist/:movieId
router.delete("/:movieId", authenticate, watchlistController.removeFromWatchlist);

export default router;