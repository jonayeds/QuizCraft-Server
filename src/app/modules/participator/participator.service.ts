import { IReqUser } from "../../interfaces"
import { AppError } from "../../utils/appError"
import { Question } from "../question/question.model"
import { IQuiz } from "../quiz/quiz.interface"
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

const submitAnswares  = async(quizId:string, user:IReqUser, answers:{questionId:string, answer:number}[])=>{
    const isParticipatorExist = await Participator.findOne({player:user._id, quiz:quizId}).populate("quiz")
    if(!isParticipatorExist){
        throw new AppError(403, "You haven't participated in this quiz")
    }         
    if(isParticipatorExist.isCompleted){
        throw new AppError(400, "You have already submitted this quiz")
    }

    const allQuestions = await Question.find({
        quiz: quizId,
    })

    let rightAnswersCount = 0;
    answers.forEach(ans =>{
        const question = allQuestions.find(q => q._id.toString() === ans.questionId)
        if(!question){
            throw new AppError(400, "Invalid question ID")
        }
        if(question.correctAnswerIndex === ans.answer){
            rightAnswersCount += 1;
        }
    })

    const totalScore = (isParticipatorExist.quiz as unknown as IQuiz).totalScore
    const score = (rightAnswersCount / allQuestions.length) * totalScore;    
    const result = await Participator.findByIdAndUpdate(isParticipatorExist._id,{
        score,
        isCompleted:true
    }, {new:true})   

    return result

      
}

export const ParticipatorService= {
    createParticipator,
    getQuizParticipators,
    submitAnswares  
}