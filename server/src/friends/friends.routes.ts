import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import * as friendsController from "./friends.controller.js";

const router = Router();

// POST /friends/request/:username
router.post("/request/:username", authenticate, friendsController.sendRequest);

// POST /friends/accept/:username
router.post("/accept/:username", authenticate, friendsController.acceptRequest);

// POST /friends/reject/:username
router.post("/reject/:username", authenticate, friendsController.rejectRequest);

// DELETE /friends/request/:username - Cancel outgoing request
router.delete("/request/:username", authenticate, friendsController.cancelRequest);

// DELETE /friends/remove/:username
router.delete("/remove/:username", authenticate, friendsController.removeFriend);

// GET /friends
router.get("/", authenticate, friendsController.getFriends);

// GET /friends/requests
router.get("/requests", authenticate, friendsController.getRequests);

export default router;