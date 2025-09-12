import { IReqUser } from "../../interfaces";
import { AppError } from "../../utils/appError";
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

export const QuizService = {
  createQuiz,
};
