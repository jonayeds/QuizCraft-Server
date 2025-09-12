import { Types } from "mongoose";

export interface IQuiz {
    creator:Types.ObjectId;
    participant:Types.ObjectId;
    totalScore:number;
    quizStatus: "pending" | "accepted" | "rejected";
}