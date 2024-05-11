import { useEffect, useState } from "react";
import FlashcardItem from "./FlashcardItem";

interface FlashcardProps {
  question: string;
  answer: string;
}

interface FlashcardsProps {
  text: string;
}

const Flashcards = ({ text }: FlashcardsProps) => {
  const [flashcards, setFlashcards] = useState<FlashcardProps[]>([]);

  useEffect(() => {
    const flashcardList = text.split("\n").map((flashcard: string) => {
      const [question, answer] = flashcard.split("|");
      return { question, answer };
    });

    setFlashcards(flashcardList);
  }, [text]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {flashcards.map((flashcard, index) => (
        <FlashcardItem key={index} question={flashcard.question} answer={flashcard.answer} />
      ))}
    </div>
  );
}

export default Flashcards;