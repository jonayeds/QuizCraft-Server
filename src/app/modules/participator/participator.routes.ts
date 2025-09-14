import express from "express"
import { ParticipatorController } from "./participator.controller";
import { auth } from "../../middlewares/auth";
import { roles } from "../user/user.constant";
import { validateRequest } from "../../middlewares/validateRequest";
import { ParticipatorValidation } from "./participator.validation";
const router = express.Router()

router.post("/join-quiz", auth(roles.user), validateRequest(ParticipatorValidation.createParticipatorSchema) ,ParticipatorController.createParticipator)
router.get("/:quizId", auth(roles.user),ParticipatorController.getQuizParticipators)

export const ParticipatorRoutes = router;