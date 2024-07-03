"use client";
import { SpeakerIcon } from "lucide-react";
import React from "react";

const SpeakIcon = ({ data }: any) => {
  // Function to initialize SpeechSynthesis
  function speakText(text: string) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    // Speak the text
    synth.speak(utterance);
  }

  return (
    <div>
      <SpeakerIcon onClick={() => speakText("jjj")} />
    </div>
  );
};

export default SpeakIcon;
