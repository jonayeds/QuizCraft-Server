import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { AuthValidations } from "./auth.validation";
import { AuthControllers } from "./auth.controller";



const router = Router()

router.post("/login", validateRequest(AuthValidations.loginUserValidationSchema), AuthControllers.loginUser)
router.post("/social-login", validateRequest(AuthValidations.socialLoginValidationSchema), AuthControllers.socialLogin)

export const AuthRoutes = router