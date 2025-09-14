import { ICustomRequest, IReqUser } from "../../interfaces";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { QuizService } from "./quiz.service";

const createQuiz = catchAsync(async (req:ICustomRequest,res)=>{
    const result = await QuizService.createQuiz(req.body || {}, req.user as IReqUser)
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Quiz created successfully",
        data: result   
    })
})

const getMyQuizzes = catchAsync(async (req:ICustomRequest,res)=>{
    const result = await QuizService.getMyQuizzes(req.user as IReqUser)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Quizzes retrieved successfully",
        data: result
    })
})

export const QuizController = {
    createQuiz,
    getMyQuizzes
}