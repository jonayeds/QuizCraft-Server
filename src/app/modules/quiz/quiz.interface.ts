import { Types } from "mongoose";

export interface IQuiz {
    creator:Types.ObjectId;
    totalScore:number;
    joiningCode:string;
}