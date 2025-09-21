import { Topic } from "./topic.model"

const createTopic  = async (payload: {title:string}) => {

    const isTopicExists = await Topic.findOne({title:payload.title})
    if(isTopicExists){
        throw new Error("Topic already exists")
    }  
    const result = await Topic.create(payload)
    return result  
}

const getAllTopics = async()=>{
    const result = await Topic.find()
    return result   
}


export const TopicService = {
    createTopic,
    getAllTopics
}