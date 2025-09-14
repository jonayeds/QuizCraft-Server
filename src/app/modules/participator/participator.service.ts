import { IReqUser } from "../../interfaces"
import { AppError } from "../../utils/appError"
import { Quiz } from "../quiz/quiz.model"
import { Participator } from "./participator.model"

const createParticipator = async(payload:{joiningCode: string}, user:IReqUser) =>{
    const isQuizExist = await Quiz.findOne({joiningCode:payload.joiningCode})    
    if(!isQuizExist){
        throw new AppError( 404,"Quiz not found")   
    } 
    const isAlreadyParticipated = await Participator.findOne({player:user._id, quiz:isQuizExist._id})   
    if(isAlreadyParticipated){
        throw new AppError(400,"You have already joined this quiz")   
    } 
    const result  = await Participator.create({player:user._id, quiz:isQuizExist._id})
    return result
}

const getQuizParticipators = async(quizId:string, user:IReqUser)=>{
    const isParticipatorExist = await Participator.findOne({player:user._id, quiz:quizId})
    if(!isParticipatorExist){
        throw new AppError(403, "You are not authorized to view this resource")
    }           
    const result = await Participator.find({quiz:quizId})
    return result    
}

export const ParticipatorService= {
    createParticipator,
    getQuizParticipators
}