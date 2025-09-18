import z from "zod";

const createParticipatorSchema = z.object({
    joiningCode: z.string().length(6, { message: "Invalid joining code" })
})

const submitAnswarsSchema = z.object({
    answers: z.array(z.object({
        questionId: z.string(),
        answer: z.number().min(0).max(3).int()  
    }))
})

export const ParticipatorValidation = {
    createParticipatorSchema,
    submitAnswarsSchema
}