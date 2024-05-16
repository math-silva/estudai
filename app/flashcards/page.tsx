"use client";

import { useEffect, useState } from "react";
import { api } from "../lib/axios";

import Form from "../components/forms/Form";
import Logo from "../components/title/Logo";
import Flashcards from "../components/flashcards/Flashcards";

interface formDataProps {
  educationLevel: string;
  subject: string;
  content: string;
}

const FlashcardsPage = () => {
  const [flashcardCount, setFlashcardCount] = useState(0);
  const [showCount, setShowCount] = useState(false);
  const [flashcards, setFlashcards] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [data, setData] = useState<formDataProps | undefined>();

  useEffect(() => {
    api.get('/analytics/total').then(response => {
      const count = parseInt(response.data.totalUsage.flashcardCount) || 0;
      setFlashcardCount(count);
      setShowCount(true);
    }).catch((error: Error) => {
      console.error(error);
    });
  }, []);

  const handleFormSubmit = ({ educationLevel, subject, content }: formDataProps) => {
    const prompt = `
      Crie 12 flashcards numerados para a disciplina de ${subject} para um estudante do ${educationLevel}, abrangendo os seguintes tópicos: 
      
      ${content}

      Os flashcards devem seguir o formato:
      1-pergunta|resposta
      2-pergunta|resposta
      3-pergunta|resposta
      ...
      Utilize um separador "|" entre a pergunta e a resposta.

      Mantenha as perguntas e respostas concisas e informativas.
      
      Lembre-se de:
      Adaptar o nível de dificuldade ao ${educationLevel}.
      Fornecer respostas precisas e relevantes.
      
      Exemplo:
      Prompt: Crie 3 flashcards numerados para a disciplina de história para um estudante do ensino médio, abrangendo os seguintes tópicos: Segunda Guerra Mundial
      Resposta:
      1-Em que data terminou a Segunda Guerra Mundial?|2 de setembro de 1945
      2-Quais países formavam os Aliados na Segunda Guerra Mundial?|Reino Unido, França, União Soviética e Estados Unidos
      3-Quais países formavam o Eixo na Segunda Guerra Mundial?|Alemanha, Itália e Japão
      
      Observação: A resposta deve conter apenas os flashcards numerados, sem repetir o prompt. A resposta não deve ser uma lista com marcadores."
    `;
    setData({
      educationLevel,
      subject,
      content,
    })

    api.post('/gemini/', { prompt: prompt }).then(response => {
      setFlashcards(response.data.generatedContent);
      const createdFlashcards = response.data.generatedContent.split('\n').length;
      setIsGenerated(true);
      api.post('/analytics/', {
        type: 'flashcardCount',
        count: createdFlashcards,
        tokenInfo: response.data.tokenInfo
      });
      setFlashcardCount(prevFlashcardCount => prevFlashcardCount + createdFlashcards);
    }).catch((error: Error) => {
      console.error(error);
    }); 
  };

  return (
    <>
      <main className="p-8 lg:py-12 lg:px-24">
        <div className="flex flex-col items-center gap-8">
          <Logo />
          {
            isGenerated ? (
              <div className="flex flex-col justify-center items-center">
                <Flashcards text={flashcards} />
                <button
                  className="mt-6 -mb-6 text-white hover:underline"
                  onClick={() => setIsGenerated(false)}
                >
                  Gerar mais flashcards
                </button>
              </div>
            ) : (
              <Form name={"flashcards"} onSubmit={handleFormSubmit} />
            )
          }
        </div>
      </main>
      {showCount && (
        <p className="text-center text-white py-4">
          O EstudAI já gerou <span className="text-yellow-400 underline">{flashcardCount}</span> flashcards!
        </p>
      )}
    </>
  );
}

export default FlashcardsPage;