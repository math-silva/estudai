import FlashcardItem from "./FlashcardItem";

interface FlashcardProps {
  question: string;
  answer: string;
}

interface FlashcardsProps {
  flashcards: FlashcardProps[];
}

const Flashcards = ({ flashcards }: FlashcardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {flashcards.map((flashcard, index) => (
        <FlashcardItem key={index} question={flashcard.question} answer={flashcard.answer} />
      ))}
    </div>
  );
}

export default Flashcards;