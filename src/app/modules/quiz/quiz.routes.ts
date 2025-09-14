import express from "express";  
import { QuizController } from "./quiz.controller";
import { auth } from "../../middlewares/auth";
import { roles } from "../user/user.constant";

const router = express.Router();

router.post("/create-quiz", auth(roles.user), QuizController.createQuiz )
router.get("/my-quizzes", auth(roles.user), QuizController.getMyQuizzes )



export const QuizRoutes = router;