"use client";

import { useEffect, useState, useRef } from "react";

// #region agent log
const log = (data: any) => {
  fetch('http://127.0.0.1:7244/ingest/07653db5-872b-400e-be82-7b21f3f1ca8c', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, timestamp: Date.now(), sessionId: 'debug-session' }) }).catch(() => {});
};
// #endregion

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

  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (spanRef.current) {
      const el = spanRef.current;
      const computed = window.getComputedStyle(el);
      const parent = el.parentElement;
      const parentComputed = parent ? window.getComputedStyle(parent) : null;
      const h1 = parent?.closest('h1');
      const h1Computed = h1 ? window.getComputedStyle(h1) : null;
      
      // #region agent log
      log({ location: 'TypingAnimation.tsx:render', message: 'Element dimensions and styles', hypothesisId: 'B', data: { 
        elementWidth: el.offsetWidth, 
        elementLeft: el.offsetLeft,
        parentWidth: parent?.offsetWidth,
        parentLeft: parent?.offsetLeft,
        h1Width: h1?.offsetWidth,
        h1Left: h1?.offsetLeft,
        minWidth: computed.minWidth,
        textAlign: computed.textAlign,
        display: computed.display,
        marginLeft: computed.marginLeft,
        marginRight: computed.marginRight,
        parentTextAlign: parentComputed?.textAlign,
        parentDisplay: parentComputed?.display,
        h1TextAlign: h1Computed?.textAlign,
        h1Display: h1Computed?.display,
        longestPhraseLength,
        windowWidth: window.innerWidth,
        isMobile: window.innerWidth < 640
      }});
      // #endregion
    }
  }, [display, longestPhraseLength]);

  return (
    <span
      ref={spanRef}
      className="inline-block text-center"
      style={{ minWidth: `${Math.max(longestPhraseLength, 1)}ch` }}
    >
      {display || "\u00a0" /* keep line height during clear */}
    </span>
  );
}

