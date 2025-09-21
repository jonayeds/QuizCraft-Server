import express from "express";
import { ParticipatorController } from "./participator.controller";
import { auth } from "../../middlewares/auth";
import { roles } from "../user/user.constant";
import { validateRequest } from "../../middlewares/validateRequest";
import { ParticipatorValidation } from "./participator.validation";
const router = express.Router();

router.post(
  "/join-quiz",
  auth(roles.user),
  validateRequest(ParticipatorValidation.createParticipatorSchema),
  ParticipatorController.createParticipator
);
router.get(
  "/:quizId",
  auth(roles.user),
  ParticipatorController.getQuizParticipators
);
router.get(
  "/my-participation/:quizId",
  auth(roles.user),
  ParticipatorController.getMyQuizParticipation
);
router.patch(
  "/submit/:quizId",
  auth(roles.user),
  validateRequest(ParticipatorValidation.submitAnswarsSchema),
  ParticipatorController.submitAnswares
);

export const ParticipatorRoutes = router;
