import { Router } from "express";
import {
  addGalleryItem,
  getGalleryItems,
  deleteGalleryItem,
} from "../controllers/gallery.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getGalleryItems);

router.post(
  "/:eventId",
  verifyJWT,
  upload.single("image"),
  addGalleryItem
);

router.delete(
  "/:galleryId",
  verifyJWT,
  deleteGalleryItem
);

export default router;

