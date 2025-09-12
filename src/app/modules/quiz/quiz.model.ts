import { model, Schema } from "mongoose";
import { IQuiz } from "./quiz.interface";

const quizSchema = new Schema<IQuiz>({
    creator:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },  
    joiningCode:{
        type:String,
        required:true,
        unique:true
    },
    totalScore:{
        type:Number,
        required:true,
        default:100
        },
},{
    timestamps:true 
})

export const Quiz = model<IQuiz>("Quiz", quizSchema)   