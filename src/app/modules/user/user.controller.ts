import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const registerUser = catchAsync(async (req, res)=>{
    const result = await UserServices.registerUser(req.body)
    res.cookie("accessToken", result.accessToken, {
        httpOnly:true,
        secure:true
    })
    sendResponse(res,{
        statusCode:200,
        success:true,
        message:"Registration Successfull",
        data:result
    })
})


const getMe = catchAsync(async (req, res)=>{
    const result = req.user
    sendResponse(res,{
        statusCode:200,
        success:true,
        message:"Successfully fetched my profile",
        data:result
    })
})

export const UserControllers = {
    registerUser,
    getMe
}