import express from "express"
import { ParticipatorController } from "./participator.controller";
import { auth } from "../../middlewares/auth";
import { roles } from "../user/user.constant";
const router = express.Router()

router.post("/join-quiz", auth(roles.user), ParticipatorController.createParticipator)

export const ParticipatorRoutes = router;