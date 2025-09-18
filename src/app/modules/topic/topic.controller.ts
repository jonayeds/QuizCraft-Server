
import { ICustomRequest } from "../../interfaces";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TopicService } from "./topic.service";

const createTopic = catchAsync(async(req :ICustomRequest , res )=>{
    const result = await TopicService.createTopic(req.body)
    sendResponse(res,{
        statusCode:201,
        success:true,
        message:"Topic created successfully",
        data: result
    })
})

export const TopicController = {
    createTopic
}