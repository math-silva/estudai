import Image from "next/image";

import OptionBox from "./components/buttons/OptionBox";

export default function Home() {
  return (
    <main className="px-8 p-16 lg:p-24">
      <div className="flex justify-center">
        <div className="flex flex-col justify-center md:justify-start mb-8">
          <h1 className="flex text-6xl md:text-7xl lg:text-8xl font-bold mb-2 text-gray-900">
            Estud<span className="bg-gradient-to-tr from-pink-500 to-yellow-500">AI</span>
          </h1>
          <p className="flex justify-end text-sm md:text-base lg:text-lg gap-1">
            Powered by Gemini
            <Image 
              src={"/gemini_sparkle.svg"} 
              alt={"Gemini Sparkle"}
              width="0"
              height="0"
              className="w-[20px] h-auto"
            />
          </p>
        </div>
      </div>
      <div className="lg:mx-30 flex text-3xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 md:mb-10 lg:mb-12 pb-4 md:pb-6 border-b-4">
        Olá, <br />
        Vou te ajudar a estudar!
      </div>
      <div className="text-xl md:text-2xl lg:text-3xl mb-6 lg:mb-8 text-white font-semibold">
        Do que você precisa? 
      </div>
      <div className="flex flex-wrap justify-center gap-6 lg:gap-16">
        <OptionBox title={"Resumo"} icon={"resumo.svg"} link={"/summary"}/>
        <OptionBox title={"Lista de Exercícios"} icon={"lista.svg"} link={"/exercises"}/>
        <OptionBox title={"Flashcards"} icon={"flashcard.svg"} link={"/flashcards"}/>
      </div>
    </main>
  );
}
