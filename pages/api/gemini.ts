import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = req.body;

  console.log(prompt)
  const API_KEY = process.env.GEMINI_API_KEY;

  if (API_KEY) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    if (response && response.candidates && response.candidates.length > 0) {
      const contentText = response.candidates[0].content.parts[0].text;
      res.status(200).json({ generatedContent: contentText });
    } else {
      res.status(500).json({ error: "No response candidates found." });
    }
  } else {
    res.status(500).json({ error: "Invalid API key." });
  }
}
