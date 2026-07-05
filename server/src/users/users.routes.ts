import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import * as usersController from "./users.controller.js";

const router = Router();

// GET /users/search?query=... - MUST be before /:username to avoid param collision
router.get("/search", usersController.searchUsers);

// GET /users/:username - Public profile with live stats
router.get("/:username", usersController.getProfile);

// PATCH /users/profile - Update own profile
router.patch("/profile", authenticate, usersController.updateProfile);

export default router;