import { Types } from "mongoose";

export interface IParticipator {
    player: Types.ObjectId;
    score: number;
    isCompleted: boolean;
    quiz: Types.ObjectId;
}