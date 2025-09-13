import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { QuizRoutes } from "../modules/quiz/quiz.routes";
import { ParticipatorRoutes } from "../modules/participator/participator.routes";



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

]


moduleRoutes.forEach(route=> router.use(route.path, route.routes))

export default router