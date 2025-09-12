import { model, Schema } from "mongoose";
import { IQuestion } from "./question.interface";

const questionSchema = new Schema<IQuestion>({
    questionText: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    correctAnswerIndex: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, {
    timestamps:true
})

export const Question = model<IQuestion>("Question", questionSchema)

