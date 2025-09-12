import { model, Schema } from "mongoose";
import { IQuiz } from "./quiz.interface";

const quizSchema = new Schema<IQuiz>({
    creator:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },  
    participant:{   
        type:Schema.Types.ObjectId, 
        ref:"User",
    },
    totalScore:{
        type:Number,
        required:true,
        default:100
        },
    quizStatus:{
        type:String,
        enum:["pending", "accepted", "rejected"],
        default:"pending"
    }
},{
    timestamps:true 
})

export const Quiz = model<IQuiz>("Quiz", quizSchema)   