import { Request } from "express";
import { IUser } from "../modules/user/user.interface";

import { TUserRole } from "../modules/user/user.interface";

export interface IReqUser {
    email:string;
    role:TUserRole;
}

export interface ICustomRequest extends Request{
    user?: IReqUser | null
}

export type TErrorSource = {
    path: string | number;
    message:string;
}[]

export interface IGenericErrorResponse {
    statusCode:number;
    message:string;
    errorSources:TErrorSource
}
