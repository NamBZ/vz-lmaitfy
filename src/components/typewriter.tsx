"use client";

import { useEffect, useState, useRef } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  onUpdate?: (currentText: string) => void;
  className?: string;
}

export function Typewriter({
  text,
  speed = 1.0,
  onComplete,
  onUpdate,
  className = "",
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isCompleteRef = useRef(false);

  useEffect(() => {
    // Reset when text changes
    setDisplayText("");
    isCompleteRef.current = false;

    if (!text) return;

    let currentIndex = 0;
    // Calculate typing speed (lower is faster)
    const typingSpeed = Math.max(20, 60 / speed); // 20-60ms range

    intervalRef.current = setInterval(() => {
      currentIndex++;

      if (currentIndex <= text.length) {
        const newText = text.substring(0, currentIndex);
        setDisplayText(newText);
        onUpdate?.(newText);

        if (currentIndex === text.length && !isCompleteRef.current) {
          isCompleteRef.current = true;
          setTimeout(() => {
            onComplete?.();
          }, 100);
        }
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    }, typingSpeed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, speed, onComplete, onUpdate]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

// Hook version for easier integration
export function useTypewriter(text: string, speed: number = 1.0) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setDisplayText("");
    setIsComplete(false);

    if (!text) return;

    let currentIndex = 0;
    const typingSpeed = Math.max(20, 60 / speed);

    intervalRef.current = setInterval(() => {
      currentIndex++;

      if (currentIndex <= text.length) {
        setDisplayText(text.substring(0, currentIndex));

        if (currentIndex === text.length) {
          setIsComplete(true);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        }
      }
    }, typingSpeed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, speed]);

  return { displayText, isComplete };
}
