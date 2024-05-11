import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Footer from "./components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EstudAI",
  description: "Resumos, exercícios e flashcards personalizados com inteligência artificial para te ajudar a conquistar sua nota 10!",
  keywords: ["Gemini", "Alura", "Estudar", "Resumos", "Exercícios", "Flashcards", "Inteligência Artificial", "Google", "Generative AI"],
  openGraph: {
    images: '/preview.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col justify-between min-h-screen bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-400 font-roboto">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
