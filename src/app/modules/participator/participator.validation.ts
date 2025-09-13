import z from "zod";

const createParticipatorSchema = z.object({
    joiningCode: z.string().length(6, { message: "Invalid joining code" })
})

export const ParticipatorValidation = {
    createParticipatorSchema
}