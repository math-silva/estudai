import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <Link href="https://github.com/math-silva/estudai" target="_blank" className="cursor-pointer text-white flex justify-center mb-2 gap-1 group">
      <Image
        src={"/github.svg"}
        alt="Github icon"
        width="0"
        height="0"
        className="w-[20px] h-auto"
      />
      <span className="group-hover:underline">math-silva</span> 
    </Link>
  );
}

export default Footer;