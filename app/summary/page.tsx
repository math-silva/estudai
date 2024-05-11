"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Markdown from "react-markdown";
import Link from "next/link";

import Form from "../components/forms/Form";
import Logo from "../components/title/Logo";

interface formDataProps {
  educationLevel: string;
  subject: string;
  content: string;
}

const SummaryPage = () => {
  const [summary, setSummary] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [data, setData] = useState<formDataProps | undefined>();

  const handleFormSubmit = ({ educationLevel, subject, content }: formDataProps) => {
    const prompt = `
      Gere um resumo conciso e informativo sobre ${subject} para um estudante de ${educationLevel}. 
  
      O resumo deve cobrir os seguintes tópicos:
  
      ${content}
  
      Inclua links de referência relevantes para complementar o aprendizado, se necessário.

      O Título deve ser "Resumo de ${subject} - ${educationLevel}".
    `;
    setData({
      educationLevel,
      subject,
      content,
    });
    
    try {
      fetch("/api/gemini/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })
        .then((response) => response.json())
        .then((data) => {
          setSummary(data.generatedContent);
          setIsGenerated(true);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="p-8 lg:py-12 lg:px-24">
      <div className="flex flex-col items-center gap-8">
        <Logo />
        {
          isGenerated ? (
            <div className="py-6 px-8 w-full bg-white rounded-lg border-1 border-gray-200 shadow-lg">
              <Markdown className="prose lg:prose-lg" children={summary} />
              <div className="mt-2 pt-6 border-t-2 border-gray-300 flex flex-col items-start">
                <button
                  onClick={() => setIsGenerated(false)}
                  className="text-blue-500 hover:text-blue-700 mb-2 hover:underline"
                >
                  Gerar novo resumo
                </button>
                <Link href={"/"} className="text-blue-500 hover:text-blue-700 hover:underline">
                  Voltar ao início
                </Link>
              
              </div>
            </div>
          ) : (
            <Form name={"resumo"} onSubmit={handleFormSubmit} />
          )
        }
      </div>
    </main>
  );
}

export default SummaryPage;