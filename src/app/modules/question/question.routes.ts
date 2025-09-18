import express from "express"
import { QuestionController } from "./question.controller";
import { auth } from "../../middlewares/auth";
import { roles } from "../user/user.constant";
const router = express.Router() 


router.get("/get-quiz-questions/:quizId",auth(roles.user),  QuestionController.getQuizQuestions )

export const QuestionRoutes = router;