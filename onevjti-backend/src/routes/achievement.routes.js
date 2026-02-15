import { Router } from "express";

import {
  addAchievement,
  getAchievement,
  getSingleAchievement,
  updateAchievement,
  deleteAchievement,
} from "../controllers/achievement.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/:committeeId", getAchievement);

router.post("/:committeeId", verifyJWT, addAchievement);

router.get("/single/:achievementId", getSingleAchievement);

router.patch("/:achievementId", verifyJWT, updateAchievement);

router.delete("/:achievementId", verifyJWT, deleteAchievement);

export default router;
