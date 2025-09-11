import { z } from "zod";

const registerUserValidationSchema = z.object({
    name: z.string().max(25, { message: "Name cannot be longer than 25 characters" }),
    email: z.string().email({ message: "Invalid email" }),
    username: z.string().regex(/^[a-z0-9_.-]+$/, { message: "Username can only include lowercase letters, numbers, '_', '-', and '.'" }),
    password: z.string({ message: "Password is required" }),
    profileImage:z.string().url({message:"Profile image must be a valid URL"}).optional()  
})


export const UserValidations = {
    registerUserValidationSchema,
}