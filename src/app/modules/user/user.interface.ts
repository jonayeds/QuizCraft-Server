import { Model } from "mongoose";

export interface IUser {
    name:string;
    email:string;
    username:string;
    password:string;
    profileImage:string;
    role: TUserRole;
}

export type TUserRole = "PLAYER" | "ADMIN"

export interface IUserModel extends Model<IUser>{
    isUserExists({email, username, identification}:{email?:string, username?:string, identification?:string}) : Promise<{user:IUser & {_id:string}, property:string} | null>;
    isPasswordCorrect(plainTextPassword:string, hashedPassword:string):Promise<boolean>
}