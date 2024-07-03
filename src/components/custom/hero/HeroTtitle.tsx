"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const HeroTitle = () => {
  const { theme, setTheme } = useTheme();
  const [text, setText] = useState("");
  const fullText = "Elevate Your Practice, Expand Your Horizons";
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setText(fullText.slice(0, index + 1));
      index++;

      if (index >= fullText.length) {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [fullText, theme]);
  return (
    <motion.h2
      className="text-3xl font-bold sm:text-4xl my-1 dark:text-gray-400"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        // repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      {text}
    </motion.h2>
  );
};

export default HeroTitle;
