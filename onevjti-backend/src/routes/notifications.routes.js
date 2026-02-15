import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
  createNotification,
  getMyNotifications,
  updateNotification,
  deleteNotification
} from "../controllers/notification.controller.js";

const router = Router();

router.use(verifyJWT);

router.get("/", getMyNotifications);

router.post("/", createNotification);

router.patch("/:notificationId", updateNotification);

router.delete("/:notificationId", deleteNotification);

export default router;
