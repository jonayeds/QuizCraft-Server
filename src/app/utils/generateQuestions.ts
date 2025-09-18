import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

interface IGeneratedQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  description: string;
}

const generateQuestions = async (topic: string, number:number): Promise<IGeneratedQuestion[]> => {
  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content:
          "You are an assistant who generates quiz questions based on the topic. Always respond with valid JSON format.",
      },
      {
        role: "user",
        content: `Generate ${number} quiz questions for the following topic: ${topic}. Format your response as a JSON object with this exact structure:
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
            Make sure:
            - The questions array contains exactly ${number} items
            - Each correctAnswer is the index number (0-3) of the correct option
            - All questions are complete and well-formed
            - Count the questions before responding to ensure you have exactly ${number}`,
      },
    ],
    response_format: { type: "json_object" },
  });
  if (response?.choices[0]?.message?.content) {
    return JSON.parse(response.choices[0].message.content).questions;
  } else {
    return [];
  }
};

export const AiAssistant = {
  generateQuestions,
};
