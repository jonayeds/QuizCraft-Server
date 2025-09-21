import { IReqUser } from "../../interfaces";
import { AppError } from "../../utils/appError";
import { AiAssistant } from "../../utils/generateQuestions";

import { Participator } from "../participator/participator.model";
import { Question } from "../question/question.model";
import { Topic } from "../topic/topic.model";
import { User } from "../user/user.model";
import { IQuiz } from "./quiz.interface";
import { Quiz } from "./quiz.model";

const createQuiz = async (payload: Partial<IQuiz>, user: IReqUser) => {
  const isUserExists = await User.findOne({ email: user.email });
  if (!isUserExists) throw new AppError(404, "User not found");

  const quizData: Partial<IQuiz> = {
    totalScore: payload?.totalScore || 100,
    creator: isUserExists._id,
  };

  while (true) {
    const joiningCode = Math.random().toString(36).substring(2, 8);
    const existingQuiz = await Quiz.findOne({ joiningCode });
    if (!existingQuiz) {
        quizData.joiningCode = joiningCode;
      break;
    }
  }
  

const result = await Quiz.create({ ...quizData, creator: isUserExists._id });
  return result;
};

const getMyQuizzes = async(user:IReqUser)=>{
    const result = await Participator.aggregate([
      {
        $match: { player: user._id}
      },
      {
        $lookup:{
            from:"quizzes", 
            localField:"quiz",
            foreignField:"_id",
            as:"quiz"
        }
      },
      {
        $unwind:"$quiz"
      },
    ])
    return result 
}

const getMyCreatedQuizzes = async(user:IReqUser)=>{
  const result = await Quiz.find({creator:user._id})
  return result
}

const generateQuestions = async(quizeId:string, user:IReqUser, payload:{topic:string, number:number}) => {
  const quiz = await Quiz.findOne({
    _id: quizeId,
    creator: user._id 
  });
  if(!quiz) {
    throw new AppError(404, "Quiz not found");
  } 
  const topic = await Topic.findById(payload.topic)
  if(!topic){
    throw new AppError(404, "Topic not found"); 
  }
  const questionsCount = await Question.countDocuments({quiz:quiz._id})
  if(questionsCount > 0){
    throw new AppError(400, "Questions have already been generated for this quiz");
  } 

  if(!payload?.number){
    payload.number = 10
  }

  const count = payload.number+2
  
  const questions = await AiAssistant.generateQuestions(topic.title, count)
  const limitedQuestions = questions?.slice(0, payload.number)  

  const questionsData = limitedQuestions.map(q=> ({
    questionText: q.question,
    options: q.options,
    correctAnswerIndex: q.correctAnswer,
    topic: topic._id,
    quiz: quiz._id,
    description: q.description
  }))
  const result = await Question.insertMany(questionsData)
  return result; 
}

const getASingleQuiz = async(quizId:string, user:IReqUser) =>{
  const quiz = await Quiz.findOne({_id:quizId, creator:user._id})
  if(!quiz) throw new AppError(404, "Quiz not found")
    const isQuestionsGenerated = await Question.findOne({quiz:quiz._id})
  let isGenerated = false
  if(isQuestionsGenerated){
    isGenerated = true
  }else{
    isGenerated = false
  }
  const quizData: IQuiz &{questionsGenerated?:boolean} = {...quiz.toObject(), questionsGenerated:isGenerated}

  return quizData
}

export const QuizService = {
  createQuiz,
  getMyQuizzes,
  getMyCreatedQuizzes,
  generateQuestions,
  getASingleQuiz
};
