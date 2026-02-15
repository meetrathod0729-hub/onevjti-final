import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { exportEventRegistrations, getEventRegistrations, registerForEvent, checkRegistrationStatus } from "../controllers/eventRegistration.controller.js";

const router = Router()

router.use(verifyJWT)

router.route("/:eventId").post(registerForEvent)
router.route("/:eventId/registrations").get(getEventRegistrations)
router.route("/:eventId/registrations/export").get(exportEventRegistrations)
router.get("/:eventId/status", checkRegistrationStatus);
router.post("/", verifyJWT, registerForEvent);
export default router