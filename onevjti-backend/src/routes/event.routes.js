
import { Router } from "express";
import { createEvent, deleteEvent, getAllEvents, getEventById, updateEvent, getEventsByCommittee } from "../controllers/event.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post(
    "/",
    verifyJWT,
    upload.single("poster"), 
    createEvent
);

router.route("/").get(getAllEvents);
router.route("/:eventId").get(getEventById);
router.patch("/:eventId",verifyJWT,upload.single("poster"),updateEvent);
router.route("/:eventId").delete(verifyJWT,deleteEvent);
router.get("/committee/:committeeId", getEventsByCommittee);
export default router;