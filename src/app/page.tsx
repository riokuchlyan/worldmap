'use client';

import WordCloud from "./components/WordCloud";
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";

export default function Home() {
  const { scrollY } = useScroll();
  
  // Hide content when scrolling through word cloud section
  const headerOpacity = useTransform(scrollY, [0, 500, 1000], [1, 0, 0]);
  const footerOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <>
      <motion.div 
        style={{ opacity: headerOpacity }}
        className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"
      >
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <h1 className="text-8xl font-bold">WOR(L)D MAP</h1>
          <h2 className="text-xl font-bold text-center w-full">News redefined.</h2>
        </main>
        <motion.footer 
          style={{ opacity: footerOpacity }}
          className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"
        >
          <p>Scroll to view the world in a new lens.</p>
        </motion.footer>
      </motion.div>
      <WordCloud />
    </>
  );
}
