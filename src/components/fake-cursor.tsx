"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FakeCursorProps {
  visible?: boolean;
  className?: string;
}

interface Position {
  x: number;
  y: number;
}

export function FakeCursor({
  visible = false,
  className = "",
}: FakeCursorProps) {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  const moveTo = (
    x: number,
    y: number,
    options?: { duration?: number; easing?: string }
  ) => {
    setIsMoving(true);

    console.log("Fake cursor moving to:", {
      x,
      y,
      "x-offset": x - 4,
      "y-offset": y - 4,
    });

    // Use framer-motion animation
    setPosition({ x, y });

    setTimeout(() => {
      setIsMoving(false);
    }, options?.duration || 1000);
  };

  // Expose moveTo function to parent components via ref
  useEffect(() => {
    // Store the moveTo function on the window object for easy access
    (
      window as typeof window & { fakeCursorMoveTo?: typeof moveTo }
    ).fakeCursorMoveTo = moveTo;
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className={`fixed pointer-events-none z-50 ${className}`}
      style={{
        left: position.x - 4, // Offset to position cursor tip correctly
        top: position.y - 4,
      }}
      animate={{
        left: position.x - 4,
        top: position.y - 4,
      }}
      transition={{
        duration: 1,
        ease: "easeInOut",
      }}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <path
          d="M6 6L6 34L14 26L20 32L24 28L18 22L30 22L6 6Z"
          fill="white"
          stroke="black"
          strokeWidth="2"
        />
      </svg>

      {/* Ripple effect when clicking */}
      {isMoving && (
        <motion.div
          className="absolute top-0 left-0 w-12 h-12 border-2 border-blue-500 rounded-full"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.div>
  );
}
