import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import * as ratingsController from "./ratings.controller.js";

const router = Router();

// POST /ratings - Create or update rating (only for favorited movies)
router.post("/", authenticate, ratingsController.upsertRating);

// DELETE /ratings/:movieId
router.delete("/:movieId", authenticate, ratingsController.removeRating);

// GET /ratings/user/:username
router.get("/user/:username", ratingsController.getUserRatings);

// GET /ratings/mine - Get own ratings as a map
router.get("/mine", authenticate, ratingsController.getMyRatings);

export default router;