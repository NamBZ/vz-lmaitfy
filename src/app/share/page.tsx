"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
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

export default function SharePage() {
  const searchParams = useSearchParams();
  const [showCursor, setShowCursor] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const sendButtonRef = useRef<HTMLButtonElement>(null);

  // Get query parameters
  const q = searchParams.get("q") || "";
  const theme = searchParams.get("theme") || "auto";
  const speed = parseFloat(searchParams.get("s") || "1.0");

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
      }, 2200);
    };

    startAnimation();
  }, [q, theme]);

  const handleTypewriterComplete = () => {
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
      <FakeCursor visible={showCursor} />

      <div className="flex flex-col h-full">
        {/* Messages area with placeholder messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Placeholder messages to look like ChatGPT */}
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold mb-2">ChatGPT</h2>
              <p className="text-muted-foreground">How can I help you today?</p>
            </div>
          </div>
        </div>

        {/* Composer area */}
        <div className="border-t p-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-end gap-2">
              <div className="flex-1 relative">
                <Textarea
                  ref={textareaRef}
                  id="composer-textarea"
                  placeholder={showTypewriter ? "" : "Message ChatGPT..."}
                  className="min-h-[52px] max-h-32 resize-none pr-12 transition-all"
                  readOnly={!isEditable}
                  onChange={handleTextareaChange}
                  value={isEditable ? currentText : ""}
                />
                {showTypewriter && !isEditable && (
                  <div className="absolute inset-0 p-3 pointer-events-none">
                    <Typewriter
                      text={q}
                      speed={speed}
                      onComplete={handleTypewriterComplete}
                      onUpdate={handleTypewriterUpdate}
                    />
                  </div>
                )}
              </div>

              <Tooltip open={showTooltip && animationComplete}>
                <TooltipTrigger asChild>
                  <Button
                    ref={sendButtonRef}
                    id="composer-send"
                    size="icon"
                    onClick={handleSendClick}
                    className="transition-transform"
                    disabled={!animationComplete}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-background border border-border shadow-lg">
                  <p>Click here</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="text-xs text-muted-foreground mt-2 text-center">
              Shift+Enter for new line
            </div>
          </div>
        </div>
      </div>
    </ChatLayout>
  );
}
