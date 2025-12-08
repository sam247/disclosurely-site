"use client";

import { useEffect, useState } from "react";

type Props = {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
};

export default function TypingAnimation({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: Props) {
  const [display, setDisplay] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex] || "";
    if (!currentPhrase) return;

    const handler = setTimeout(() => {
      if (isDeleting) {
        setDisplay(currentPhrase.slice(0, display.length - 1));
        if (display.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      } else {
        setDisplay(currentPhrase.slice(0, display.length + 1));
        if (display.length === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(handler);
  }, [display, isDeleting, phrases, phraseIndex, typingSpeed, deletingSpeed, pauseDuration]);

  return <span>{display}</span>;
}

