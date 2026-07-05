import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import * as authController from "./auth.controller.js";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me", authenticate, authController.me);
router.post("/change-password", authenticate, authController.changePassword);

export default router;