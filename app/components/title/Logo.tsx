import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="flex flex-col justify-center md:justify-start">
      <h1 className="flex text-5xl lg:text-6xl font-bold mb-1 text-gray-900">
          Estud<span className="bg-gradient-to-tr from-pink-500 to-yellow-500">AI</span>
      </h1>
      <p className="flex justify-end text-xs gap-1">
        Powered by Gemini
        <Image 
          src={"/gemini_sparkle.svg"} 
          alt={"Gemini Sparkle"}
          width="0"
          height="0"
          className="w-[10px] h-auto"
        />
      </p>
    </Link>
  );
}

export default Logo;