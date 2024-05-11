import Link from "next/link";
import Image from "next/image";

interface OptionBoxProps {
  title: string;
  icon: string;
  link: string;
}

const OptionBox = ({title, icon, link}: OptionBoxProps) => {
  return (
    <>
    <Link href={link} className="cursor-pointer p-4 lg:py-6 w-64 rounded-2xl flex flex-col gap-4 lg:gap-6 items-center border border-white bg-white bg-opacity-5 hover:bg-opacity-25 transition-all duration-300 ease-in-out">
      <div className="bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-400 w-8 lg:w-12 h-8 lg:h-12 p-1 lg:p-3 rounded-full flex justify-center items-center">
        <Image src={icon} alt={title} width={30} height={30} className="w-4 lg:w-8 h-4 lg:h-8"/>
      </div>
      <div className="text-lg lg:text-2xl text-white">{title}</div>
    </Link>
    </>
  );
}

export default OptionBox;