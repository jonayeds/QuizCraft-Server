import { model, Schema } from "mongoose";
import { IParticipator } from "./participator.interface";

const participatorSchema = new Schema<IParticipator>({
    player: {
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true   
    },
    score:{
        type:Number,
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    quiz:{
        type:Schema.Types.ObjectId,
        ref:"Quiz",
        required:true
    }

},{
    timestamps:true 
})

export const Participator  =  model<IParticipator>("Participator", participatorSchema )