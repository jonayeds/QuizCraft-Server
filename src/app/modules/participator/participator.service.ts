import { IReqUser } from "../../interfaces"
import { AppError } from "../../utils/appError"
import { Quiz } from "../quiz/quiz.model"
import { Participator } from "./participator.model"

const createParticipator = async(payload:{joiningCode: string}, user:IReqUser) =>{
    const isQuizExist = await Quiz.findOne({joiningCode:payload.joiningCode})    
    if(!isQuizExist){
        throw new AppError( 404,"Quiz not found")   
    } 
    const result  = await Participator.create({player:user._id, quiz:isQuizExist._id})
    return result
}

export const ParticipatorService= {
    createParticipator
}