"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ComposerProps {
  onSend?: (message: string) => void;
  disabled?: boolean;
  value?: string;
  setValue?: (value: string) => void;
  placeholder?: string;
}

export function Composer({
  onSend,
  disabled = false,
  value = "",
  setValue,
  placeholder = "Message ChatGPT...",
}: ComposerProps) {
  const [internalValue, setInternalValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentValue = setValue ? value : internalValue;
  const setCurrentValue = setValue || setInternalValue;

  const handleSubmit = () => {
    if (!currentValue.trim() || disabled) return;

    onSend?.(currentValue);
    setCurrentValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [currentValue]);

  return (
    <div className="border-t p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="min-h-[52px] max-h-32 resize-none"
              disabled={disabled}
            />
          </div>

          <Button
            onClick={handleSubmit}
            size="icon"
            disabled={!currentValue.trim() || disabled}
            className="transition-transform hover:scale-105"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <div className="text-xs text-muted-foreground mt-2 text-center">
          Shift+Enter for new line
        </div>
      </div>
    </div>
  );
}
