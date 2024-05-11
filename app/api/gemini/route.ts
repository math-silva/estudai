import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const API_KEY = process.env.GEMINI_API_KEY;

  if (API_KEY) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text()

    return Response.json({ generatedContent: text });
  } 
}
