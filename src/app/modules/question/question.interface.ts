import { Types } from "mongoose";

export interface IQuestion { 
    questionText: string;
    options: string[];
    correctAnswerIndex: number;
    topic: Types.ObjectId;
    quiz: Types.ObjectId
    description?:string
}