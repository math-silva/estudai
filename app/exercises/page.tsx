"use client";

import { useState } from "react";
import Markdown from "react-markdown";
import Link from "next/link";
import { api } from "../lib/axios";

import Form from "../components/forms/Form";
import Logo from "../components/title/Logo";

interface formDataProps {
  educationLevel: string;
  subject: string;
  content: string;
}

const ExercisesPage = () => {
  const [exercises, setExercises] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [data, setData] = useState<formDataProps | undefined>();

  const handleFormSubmit = async ({ educationLevel, subject, content }: formDataProps) => {
    const prompt = `
      Crie uma lista de exercícios de ${subject} para um estudante de ${educationLevel}. 

      Os exercícios devem abranger os seguintes tópicos:

      ${content}

      Inclua instruções claras para cada exercício e, se aplicável, sugira links de referência para ajudar na resolução.

      O Título deve ser "Lista de exercícios de ${subject} - ${educationLevel}".

      A lista deve ser numerada.
    `;

    api.post('/api/gemini/', { prompt: prompt }).then(response => {
      setExercises(response.data.generatedContent);
      setIsGenerated(true);
    }).catch((error: Error) => {
      console.error(error);
    });
  };

  return (
    <main className="p-8 lg:py-12 lg:px-24">
      <div className="flex flex-col items-center gap-8">
        <Logo />
        {
          isGenerated ? (
            <div className="py-6 px-8 w-full bg-white rounded-lg border-1 border-gray-200 shadow-lg">
              <Markdown className="prose lg:prose-lg" children={exercises} />
              <div className="mt-2 pt-6 border-t-2 border-gray-300 flex flex-col items-start">
                <button
                  onClick={() => setIsGenerated(false)}
                  className="text-blue-500 hover:text-blue-700 mb-2 hover:underline"
                >
                  Gerar nova lista de exercícios
                </button>
                <Link href={"/"} className="text-blue-500 hover:text-blue-700 hover:underline">
                  Voltar ao início
                </Link>
              
              </div>
            </div>
          ) : (
            <Form name={"lista de exercícios"} onSubmit={handleFormSubmit} />
          )
        }
      </div>
    </main>
  );
}

export default ExercisesPage;