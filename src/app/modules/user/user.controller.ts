import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const registerUser = catchAsync(async (req, res)=>{
    const result = await UserServices.registerUser(req.body)
    res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        secure: true,
    })
    sendResponse(res,{
        statusCode:200,
        success:true,
        message:"Registration Successfull",
        data:result
    })
})


const getMe = catchAsync(async (req, res)=>{
    const user = req.user
    if (!user) {
        return sendResponse(res, {
            statusCode: 401,
            success: false,
            message: "User not found",
            data: null
        })
    }

    user.password = ""
    sendResponse(res,{
        statusCode:200,
        success:true,
        message:"Successfully fetched my profile",
        data:user
    })
})

export const UserControllers = {
    registerUser,
    getMe
}