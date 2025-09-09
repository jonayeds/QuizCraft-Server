import { model, Schema } from "mongoose";
import { IUser, IUserModel } from "./user.interface";
import { UserRoles } from "./user.constant";
import bcrypt from "bcrypt"
import config from "../../config";

const userSchema = new Schema<IUser, IUserModel>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:UserRoles,
        default:"PLAYER"
    },
},{
    timestamps:true
})

// pre save middleware 
userSchema.pre("save",async function() {
    this.password = await bcrypt.hash(this.password, Number(config.salt_rounds))
})

// post save middleware
userSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
  });


// statics
userSchema.static("isUserExists", async function({email, username, identification} ){
    let user;
    if(email){
        user = await User.findOne({email})
        if(user) return {user, property:"Email"}
    }
    if(username){
        user = await User.findOne({username})
        if(user) return {user, property:"Phone Number"}
    }
    if(identification){
        user = await User.findOne({email:identification})
        if(user) return {user, property:"Email"}
        user = await User.findOne({username:identification})
        if(user) return {user, property:"Username"}
    }
    return null
})

userSchema.static("isPasswordCorrect", async function(plainTextPassword, hashedPassword){
    const isCorrect = await bcrypt.compare(plainTextPassword, hashedPassword)
    return isCorrect
})
  

export const User = model<IUser, IUserModel>("User", userSchema) 