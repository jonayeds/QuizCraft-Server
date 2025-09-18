import { IReqUser } from "../../interfaces";
import { AppError } from "../../utils/appError";
import { Participator } from "../participator/participator.model";
import { Quiz } from "../quiz/quiz.model";
import { Question } from "./question.model";

const getQuizQuestions= async(quizId:string, user:IReqUser)=>{
    const isParticipatorExists = await Participator.findOne({player:user._id, quiz:quizId})
    const quiz = await Quiz.findById(quizId)
    if(!isParticipatorExists && (quiz?.creator.toString() !== user._id.toString()) ){
        throw new AppError(403, "You are not Participating or creator of this quiz");
    }

    const result = await Question.find({ quiz: quizId });
    return result;
}

export const QuestionService = {
    getQuizQuestions
}