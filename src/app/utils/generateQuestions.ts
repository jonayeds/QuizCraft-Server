import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const generateQuestions = async (topic: string) => {
    const response = await groq.chat.completions.create({
        model:"llama-3.1-8b-instant",
        messages:[
            {role:"system", content:"You are an assistant who generates quiz questions based on the topic. Always respond with valid JSON format."}, 
            {role:"user", content:`Generate 5 quiz questions for the following topic: ${topic}. Format your response as a JSON object with this exact structure:
            {
              "questions": [
                {
                  "question": "Question text here",
                  "options": ["Option A", "Option B", "Option C", "Option D"],
                  "correctAnswer": 0,
                  "description": "Explanation of why this is correct"
                }
              ]
            }
            Make sure the correctAnswer is the index number (0-3) of the correct option in the options array.`}
        ],
        response_format: { type: "json_object" }
    })
    if(response?.choices[0]?.message?.content){
        return JSON.parse(response.choices[0].message.content);
    }
}   

export const AiAssistant = {
    generateQuestions
}