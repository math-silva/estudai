import { useState } from "react";

interface FrontOfCardProps {
  question: string;
  handleFlip: () => void;
  isFlipped: boolean;
}

interface BackOfCardProps {
  answer: string;
}

interface FlashcardItemProps {
  question: string;
  answer: string;
}

const FrontOfCard = ({ question, handleFlip, isFlipped }: FrontOfCardProps) => {
  return (
    <div 
      className={`px-4 py-8 absolute inset-0 w-full h-full flex justify-center items-center text-center bg-gradient-to-tr from-blue-700 to-blue-500 transition-all duration-100 delay-200 z-20 ${isFlipped ? 'opacity-0' : 'opacity-100'}`}
      onClick={handleFlip}  
    >
      {question}
    </div>
  );
}

const BackOfCard = ({ answer }: BackOfCardProps) => {
  return (
    <div className="px-4 py-8 absolute inset-0 w-full h-full flex justify-center items-center text-center bg-gradient-to-tr from-green-600 to-green-400 transition-all z-10 card-back">
      {answer}
    </div>
  );
}

const FlashcardItem = ({ question, answer }: FlashcardItemProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  }

  return (
    <div className={`relative w-72 h-32 rounded-2xl text-white overflow-hidden cursor-pointer transition-all duration-700 ${isFlipped ? 'card' : ''}`}>
      <FrontOfCard question={question} handleFlip={handleFlip} isFlipped={isFlipped} />
      <BackOfCard answer={answer} />
    </div>
  );
}

export default FlashcardItem;