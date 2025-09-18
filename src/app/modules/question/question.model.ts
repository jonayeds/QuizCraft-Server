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
    topic: {
        type: Schema.Types.ObjectId,
        ref: "Topic",
        required: true
    },
    quiz:{
        type:Schema.Types.ObjectId,
        ref:"Quiz",
        required:true
    },
    description:{
        type:String
    }
}, {
    timestamps:true
})

export const Question = model<IQuestion>("Question", questionSchema)

