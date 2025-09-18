import express from "express";  
import { auth } from "../../middlewares/auth";
import { roles } from "../user/user.constant";
import { TopicController } from "./topic.controller";

const router = express.Router()

router.post("/create-topic", auth(roles.admin), TopicController.createTopic ) 

export const TopicRoutes = router;