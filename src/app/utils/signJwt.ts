import jwt, { SignOptions } from "jsonwebtoken"
import { TUserRole } from "../modules/user/user.interface";
export type TJwtPayload = {
    email:string;
    role:TUserRole;
}

export const signJwt  = (jwtPayload:TJwtPayload, secret:string, expiresIn:SignOptions["expiresIn"] = "10d")=>{
    const token =  jwt.sign(jwtPayload,secret, {
        expiresIn
    })
    return token
}