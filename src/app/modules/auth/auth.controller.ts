import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async(req,res)=>{
    const result = await AuthServices.loginUser(req.body)
    res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        secure:true,
    })
    sendResponse(res,{
        statusCode:200,
        message:"Login Successfull",
        data:result,
        success:true
    })
})

const socialLogin = catchAsync(async(req,res)=>{
    const result = await AuthServices.socialLogin(req.body)
    res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        secure:true,
    })
    sendResponse(res,{
        statusCode:200,
        message:"Login Successfull",
        data:result,
        success:true
    })
})

export const AuthControllers = {
    loginUser,
    socialLogin
}