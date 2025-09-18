import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { QuizRoutes } from "../modules/quiz/quiz.routes";
import { ParticipatorRoutes } from "../modules/participator/participator.routes";
import { QuestionRoutes } from "../modules/question/question.routes";
import { TopicRoutes } from "../modules/topic/topic.routes";



const router = Router()

const moduleRoutes = [
    {
        path:"/user",
        routes:UserRoutes
    },
    {
        path:"/auth",
        routes:AuthRoutes
    },
    {
        path:"/quiz",
        routes:QuizRoutes
    }, 
    {
        path:"/participator",
        routes:ParticipatorRoutes
    },
    {
        path:"/question",
        routes:QuestionRoutes
    },
    {
        path:"/topic",
        routes:TopicRoutes
    },

]


moduleRoutes.forEach(route=> router.use(route.path, route.routes))

export default router