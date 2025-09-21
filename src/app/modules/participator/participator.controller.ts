import { IReqUser } from "../../interfaces";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ParticipatorService } from "./participator.service";

const createParticipator = catchAsync(async(req, res)=>{
    const result = await ParticipatorService.createParticipator(req.body, req.user as IReqUser)
    sendResponse(res, {
        statusCode:200,
        success:true,   
        message:"Participator created successfully",
        data:result
    })
})

const getQuizParticipators = catchAsync(async(req, res)=>{
    const result = await ParticipatorService.getQuizParticipators(req.params.quizId, req.user as IReqUser)
    sendResponse(res, {
        statusCode:200,
        success:true,   
        message:"Quiz participators retrieved successfully",
        data:result
    })
})

const submitAnswares = catchAsync(async(req, res)=>{
    const result = await ParticipatorService.submitAnswares(req.params.quizId, req.user as IReqUser, req.body.answers)
    sendResponse(res, {
        statusCode:200,
        success:true,   
        message:"Quiz submitted successfully",
        data:result
    })
})

const getMyQuizParticipation = catchAsync(async(req, res)=>{
    const result = await ParticipatorService.getMyQuizParticipation(req.params.quizId, req.user as IReqUser)
    sendResponse(res, {
        statusCode:200,
        success:true,   
        message:"Quiz participation retrieved successfully",
        data:result
    })
})


export const ParticipatorController = {
    createParticipator,
    getQuizParticipators,
    submitAnswares,
    getMyQuizParticipation
}