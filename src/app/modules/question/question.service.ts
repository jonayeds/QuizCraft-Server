import { IReqUser } from "../../interfaces";
import { AppError } from "../../utils/appError";
import { Participator } from "../participator/participator.model";
import { IQuiz } from "../quiz/quiz.interface";
import { Quiz } from "../quiz/quiz.model";
import { Question } from "./question.model";

const getQuizQuestions= async(quizId:string, user:IReqUser)=>{
    const isParticipatorExists = await Participator.findOne({player:user._id, quiz:quizId})
    const quize = await Quiz.findById(quizId)
    if(!isParticipatorExists && (quize?.creator.toString() !== user._id.toString()) ){
        throw new AppError(403, "You are not Participating or creator of this quiz");
    }

    const result = await Question.find({ quiz: quizId, creator: user._id });
    return result;
}

export const QuestionService = {
    getQuizQuestions
}