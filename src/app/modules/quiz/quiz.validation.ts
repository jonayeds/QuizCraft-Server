import z from "zod";

const createQuizSchema = z.object({
    totalSchore: z.number().min(1, { message: "Total score must be at least 1" }).optional(),
})

const generateQuestionsSchema = z.object({
    topic: z.string({ message: "Topic is required" }),
    number: z.number({ required_error: "Number of questions is required" }).min(1, { message: "Number of questions must be at least 1" }).max(20, { message: "Number of questions must be at most 20" }).optional()   
})

export const QuizValidations = {
    createQuizSchema,
    generateQuestionsSchema
}