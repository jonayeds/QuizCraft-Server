import { model, Schema } from "mongoose";
import { ITopic } from "./topic.interface";

const topicSchema = new Schema<ITopic>({
    title:{
        type:String,
        required:true,
        unique:true,
        trim:true
    }
},{
    timestamps:true
}
)

export const Topic  = model<ITopic>("Topic", topicSchema)

