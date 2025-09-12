import express from "express";  
import { QuizController } from "./quize.controller";
import { auth } from "../../middlewares/auth";
import { roles } from "../user/user.constant";

const router = express.Router();

router.post("/create-quiz", auth(roles.user), QuizController.createQuiz )



export const QuizRoutes = router;