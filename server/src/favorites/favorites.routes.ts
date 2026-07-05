import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import * as favoritesController from "./favorites.controller.js";

const router = Router();

// GET /favorites/ids - MUST be before /user/:username to avoid param collision
router.get("/ids", authenticate, favoritesController.getIds);

// GET /favorites - Get own favorites with ratings
router.get("/", authenticate, favoritesController.getMyFavorites);

// GET /favorites/user/:username
router.get("/user/:username", favoritesController.getUserFavorites);

// POST /favorites
router.post("/", authenticate, favoritesController.addFavorite);

// DELETE /favorites/:movieId
router.delete("/:movieId", authenticate, favoritesController.removeFavorite);

export default router;