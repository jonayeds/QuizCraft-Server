import { z } from "zod";

const loginUserValidationSchema = z.object({
    identification:z.string(),
    password:z.string()
})
const socialLoginValidationSchema = z.object({
    email:z.string().email(),
    name:z.string().min(2).max(100),
    image:z.string().url()
})

export const AuthValidations = {
    loginUserValidationSchema,
    socialLoginValidationSchema
}