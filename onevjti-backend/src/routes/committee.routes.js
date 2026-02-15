
import { Router } from "express";
import {
  createCommittee,
  getAllCommittees,
  updateCommittee,
  toggleFollow,
  getMyNotifications,
  deleteCommittee,
  getCommitteeBySlug,
  getCommitteeMembers,
} from "../controllers/committee.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/", getAllCommittees);

router.get("/slug/:slug", getCommitteeBySlug);

router.get("/:committeeId/members", getCommitteeMembers);

router.post(
  "/toggle-follow/:committeeId",
  verifyJWT,
  toggleFollow
);

router.get(
  "/notifications",
  verifyJWT,
  getMyNotifications
);

router.post(
  "/",
  verifyJWT,
  upload.single("logo"),
  createCommittee
);

router.patch(
  "/:committeeId",
  verifyJWT,
  upload.single("logo"),
  updateCommittee
);

router.delete(
  "/:committeeId",
  verifyJWT,
  deleteCommittee
);

export default router;
