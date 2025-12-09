"use client";

import { useEffect, useState, useRef } from "react";

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
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Prevent layout shift by reserving space for the longest phrase
  const longestPhraseLength = useRef(
    phrases.reduce((max, p) => Math.max(max, p.length), 0)
  ).current;

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex] || "";
    if (!currentPhrase) return;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // If paused (after completing a phrase), wait before starting deletion
    if (isPaused && !isDeleting) {
      timeoutRef.current = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }

    // If deleting, remove one character at a time
    if (isDeleting) {
      timeoutRef.current = setTimeout(() => {
        if (display.length > 0) {
          setDisplay((prev) => prev.slice(0, -1));
        } else {
          // Finished deleting, move to next phrase
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
          setDisplay(""); // Ensure display is empty before starting new phrase
        }
      }, deletingSpeed);
    } else {
      // If typing, add one character at a time
      timeoutRef.current = setTimeout(() => {
        const currentPhrase = phrases[phraseIndex] || "";
        if (display.length < currentPhrase.length) {
          setDisplay((prev) => currentPhrase.slice(0, prev.length + 1));
        } else {
          // Finished typing, pause before deleting
          setIsPaused(true);
        }
      }, typingSpeed);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [display, isDeleting, isPaused, phrases, phraseIndex, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span
      className="inline-block"
      style={{ minWidth: `${Math.max(longestPhraseLength, 1)}ch` }}
    >
      {display || "\u00a0" /* keep line height during clear */}
    </span>
  );
}

