"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Markdown from "react-markdown";
import Link from "next/link";
import Image from "next/image";
import { api } from "../lib/axios";

import Form from "../components/forms/Form";
import Logo from "../components/title/Logo";

interface formDataProps {
  educationLevel: string;
  subject: string;
  content: string;
}

const SummaryPage = () => {
  const [summaryCount, setSummaryCount] = useState<number>(0);
  const [showCount, setShowCount] = useState(false);
  const [summary, setSummary] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [data, setData] = useState<formDataProps | undefined>();

  const router = useRouter();

  useEffect(() => {
    router.refresh();

    api.get('/analytics/total').then(response => {
      const count = parseInt(response.data.totalUsage.summaryCount) || 0;
      setSummaryCount(count);
      setShowCount(true);
    }).catch((error: Error) => {
      console.error(error);
    });
  }, []);

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
    
    api.post('/gemini/', { prompt: prompt }).then(response => {
      setSummary(response.data.generatedContent);
      setIsGenerated(true);
      api.post('/analytics/', { 
        type: 'summaryCount', 
        count: 1, 
        tokenInfo: response.data.tokenInfo
      });
      setSummaryCount(prevSummaryCount => prevSummaryCount + 1);
    }).catch((error: Error) => {
      console.error(error);
    });
  };

  return (
    <>
      <main className="p-4 md:p-8 lg:py-12 lg:px-24">
        <div className="flex flex-col items-center gap-8">
          <Logo />
          {
            isGenerated ? (
              <div className="py-6 px-8 w-auto bg-white rounded-lg border-1 border-gray-200 shadow-lg">
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
      <div className="flex justify-center text-center text-white py-8">
        O EstudAI já gerou 
        <div className="mx-1.5 text-yellow-400 underline">
          {showCount ? summaryCount : (
            <Image
              src={"/dot_loading.svg"}
              alt="Loading"
              width={20}
              height={20}
              className="mt-1.5"
            />
          )}
        </div> 
        resumos!
      </div>
    </>
  );
}

export default SummaryPage;