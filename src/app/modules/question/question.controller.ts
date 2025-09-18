import { ICustomRequest } from "../../interfaces";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { QuestionService } from "./question.service";

const getQuizQuestions  = catchAsync(async(req: ICustomRequest,res)=>{
    const { quizId } = req.params;
    const result = await QuestionService.getQuizQuestions(quizId, req.user!);   
    sendResponse(res,{
        statusCode:200,
        success:true,
        message:"Questions retrieved successfully",
        data: result    
    })

})

export const QuestionController = {
    getQuizQuestions
}