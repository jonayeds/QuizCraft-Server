import dotenv from "dotenv"
import path from "path"


dotenv.config({path:path.join(process.cwd(), ".env")})


export default{
    port: process.env.PORT,
    databse_uri:process.env.DATABASE_URI,
    salt_rounds: Number(process.env.SALT_ROUNDS) || 10,
    access_secret:process.env.JWT_ACCESS_SECRET,
    groq_api_key:process.env.GROQ_API_KEY,
    default_password:process.env.DEFAULD_PASSWORD   
}
