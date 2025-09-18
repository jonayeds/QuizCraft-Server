import z from "zod";

const createQuizSchema = z.object({
    totalSchore: z.number().min(1, { message: "Total score must be at least 1" }).optional(),
})

const generateQuestionsSchema = z.object({
    topic: z.string({ message: "Topic is required" }),
})

export const QuizValidations = {
    createQuizSchema,
    generateQuestionsSchema
}