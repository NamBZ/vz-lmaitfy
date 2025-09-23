"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChatLayout } from "@/components/chat-layout";
import { FakeCursor } from "@/components/fake-cursor";
import { Typewriter } from "@/components/typewriter";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Send } from "lucide-react";
import {
  getCurrentLanguage,
  getTranslation,
  type Language,
  type TranslationKey,
} from "@/lib/i18n";

export default function SharePage() {
  const searchParams = useSearchParams();
  const [showCursor, setShowCursor] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const sendButtonRef = useRef<HTMLButtonElement>(null);

  // Translation helper
  const t = (key: TranslationKey) => {
    return getTranslation(language, key);
  };

  // Get query parameters
  const q = searchParams.get("q") || "";
  const theme = searchParams.get("theme") || "auto";
  const speed = parseFloat(searchParams.get("s") || "1.0");

  // Initialize language from localStorage
  useEffect(() => {
    setLanguage(getCurrentLanguage());
  }, []);

  useEffect(() => {
    // Validate question
    if (!q.trim()) {
      // Redirect back to home with error
      window.location.href = "/?error=missing-question";
      return;
    }

    // Apply theme if provided
    if (theme !== "auto") {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
    }

    // Start animation sequence after a short delay
    const startAnimation = async () => {
      // Step 1: Show cursor
      setTimeout(() => {
        setShowCursor(true);
      }, 500);

      // Step 2: Move cursor to textarea
      setTimeout(() => {
        if (textareaRef.current) {
          const rect = textareaRef.current.getBoundingClientRect();

          // Position cursor at the text start position (where text naturally appears)
          // Based on textarea CSS: px-3 py-2 (12px horizontal, 8px vertical padding)
          const x = rect.left + 12; // px-3 padding from left
          const y = rect.top + 24; // py-2 padding + some offset to position on text baseline

          const moveTo = (
            window as typeof window & {
              fakeCursorMoveTo?: (
                x: number,
                y: number,
                options?: { duration?: number }
              ) => void;
            }
          ).fakeCursorMoveTo;
          if (moveTo) {
            moveTo(x, y, { duration: 1000 });
          }
        }
      }, 1000);

      // Step 3: Simulate click on textarea
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          // Add pressed effect
          textareaRef.current.classList.add("scale-98");
          setTimeout(() => {
            textareaRef.current?.classList.remove("scale-98");
          }, 120);
        }
      }, 2000);

      // Step 4: Start typewriter effect
      setTimeout(() => {
        setShowTypewriter(true);
        setIsTyping(true);
      }, 2200);
    };

    startAnimation();
  }, [q, theme]);

  const handleTypewriterComplete = () => {
    setIsTyping(false);

    // Step 5: Move cursor to send button
    setTimeout(() => {
      if (sendButtonRef.current) {
        const rect = sendButtonRef.current.getBoundingClientRect();
        // Center the cursor on the send button
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const moveTo = (
          window as typeof window & {
            fakeCursorMoveTo?: (
              x: number,
              y: number,
              options?: { duration?: number }
            ) => void;
          }
        ).fakeCursorMoveTo;
        if (moveTo) {
          moveTo(x, y, { duration: 800 });
        }
      }
    }, 500);

    // Step 6: Simulate click on send button
    setTimeout(() => {
      if (sendButtonRef.current) {
        // Add pressed effect
        sendButtonRef.current.classList.add("scale-95");
        setTimeout(() => {
          sendButtonRef.current?.classList.remove("scale-95");
          setAnimationComplete(true);
        }, 120);
      }
    }, 1300);

    // Step 7: Show tooltip
    setTimeout(() => {
      setShowTooltip(true);
      // Enable editing after animation is complete
      setIsEditable(true);
      setCurrentText(q);
      // Set textarea value and make it editable
      if (textareaRef.current) {
        textareaRef.current.value = q;
        textareaRef.current.readOnly = false;
      }
    }, 1500);
  };

  const handleSendClick = () => {
    // Get current text from textarea if editable, otherwise use original query
    const textToSend =
      isEditable && textareaRef.current ? textareaRef.current.value : q;

    // Redirect to ChatGPT with current text
    const encodedQuestion = encodeURIComponent(textToSend);
    window.location.href = `https://chatgpt.com/?q=${encodedQuestion}`;
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentText(e.target.value);
    // Auto-resize textarea
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const handleTypewriterUpdate = (currentText: string) => {
    if (textareaRef.current) {
      // Don't set textarea value to avoid double text
      // Just auto-resize textarea based on content length
      const lineCount = currentText.split("\n").length;
      const minHeight = 52; // min-h-[52px]
      const lineHeight = 20; // approximate line height
      const newHeight = Math.max(minHeight, lineCount * lineHeight + 16); // +16 for padding

      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  return (
    <ChatLayout>
      <AnimatePresence>
        {showCursor && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <FakeCursor visible={showCursor} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="flex flex-col h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Messages area with placeholder messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Placeholder messages to look like ChatGPT */}
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.h2
                className="text-2xl font-bold mb-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {t("chatgpt")}
              </motion.h2>
              <motion.p
                className="text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                {t("howCanIHelp")}
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Composer area */}
        <motion.div
          className="border-t p-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="max-w-2xl mx-auto">
            <motion.div
              className="flex items-end gap-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex-1 relative">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Textarea
                    ref={textareaRef}
                    id="composer-textarea"
                    placeholder={showTypewriter ? "" : t("messageChatGPT")}
                    className={`min-h-[52px] max-h-32 resize-none pr-12 transition-all ${
                      isTyping
                        ? "ring-2 ring-blue-500/20 border-blue-500/50"
                        : ""
                    }`}
                    readOnly={!isEditable}
                    onChange={handleTextareaChange}
                    value={isEditable ? currentText : ""}
                  />
                </motion.div>
                {showTypewriter && !isEditable && (
                  <motion.div
                    className="absolute inset-0 p-3 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Typewriter
                      text={q}
                      speed={speed}
                      onComplete={handleTypewriterComplete}
                      onUpdate={handleTypewriterUpdate}
                    />
                  </motion.div>
                )}
              </div>

              <Tooltip open={showTooltip && animationComplete}>
                <TooltipTrigger asChild className="bg-primary">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                    whileHover={{ scale: animationComplete ? 1.05 : 1 }}
                    whileTap={{ scale: animationComplete ? 0.95 : 1 }}
                  >
                    <Button
                      ref={sendButtonRef}
                      id="composer-send"
                      size="icon"
                      onClick={handleSendClick}
                      className={`transition-all ${
                        !animationComplete
                          ? "opacity-60 cursor-not-allowed"
                          : "hover:shadow-lg"
                      }`}
                      disabled={!animationComplete}
                    >
                      <motion.div
                        animate={isTyping ? { rotate: 360 } : { rotate: 0 }}
                        transition={{
                          duration: 2,
                          repeat: isTyping ? Infinity : 0,
                          ease: "linear",
                        }}
                      >
                        <Send className="w-4 h-4" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-xl rounded-lg px-4 py-2 text-sm font-medium"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span>{t("clickHere")}</span>
                  </div>
                </TooltipContent>
              </Tooltip>
            </motion.div>

            <motion.div
              className="text-xs text-muted-foreground mt-2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.0 }}
            >
              {t("shiftEnterNewLine")}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </ChatLayout>
  );
}
