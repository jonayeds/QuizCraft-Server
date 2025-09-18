import express from "express";  
import { QuizController } from "./quiz.controller";
import { auth } from "../../middlewares/auth";
import { roles } from "../user/user.constant";

const router = express.Router();

router.post("/create-quiz", auth(roles.user), QuizController.createQuiz )
router.get("/my-quizzes", auth(roles.user), QuizController.getMyQuizzes )
router.get("/my-created-quizzes", auth(roles.user), QuizController.getMyCreatedQuizzes )
router.post("/generate-questions/:quizId", auth(roles.user), QuizController.generateQuestions )


export const QuizRoutes = router;