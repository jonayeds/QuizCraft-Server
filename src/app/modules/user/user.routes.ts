import { Router } from "express";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";
import { auth } from "../../middlewares/auth";
import { roles } from "./user.constant";

const router = Router()

router.post("/register",validateRequest(UserValidations.registerUserValidationSchema), UserControllers.registerUser)
router.get("/get-me", auth(roles.admin, roles.user), UserControllers.getMe)
export const UserRoutes = router