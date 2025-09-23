"use client";

import { useState } from "react";
import { ChatLayout } from "@/components/chat-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy, Send } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [question, setQuestion] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const generateLink = () => {
    if (!question.trim()) {
      return;
    }

    const params = new URLSearchParams({
      q: question,
    });

    const link = `${window.location.origin}/share?${params.toString()}`;
    setGeneratedLink(link);
  };

  const copyToClipboard = async () => {
    if (!generatedLink) return;

    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return (
    <ChatLayout>
      <div className="flex flex-col h-full">
        {/* Messages area */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-2xl space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">
                Let Me AI That For You
              </h1>
              <p className="text-muted-foreground">
                Create a shareable link that demonstrates how to ask AI
                questions
              </p>
            </div>

            {/* Question input */}
            <div className="space-y-4">
              <Textarea
                placeholder="Ask me anything..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="min-h-[100px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    generateLink();
                  }
                }}
              />

              <div className="flex gap-2">
                <Button
                  onClick={generateLink}
                  disabled={!question.trim()}
                  className="flex-1"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Generate Link
                </Button>
              </div>
            </div>

            {/* Generated link display */}
            {generatedLink && (
              <div className="p-4 rounded-xl shadow-md border border-muted">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-base font-semibold text-primary">
                    Generated Link
                  </span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={copyToClipboard}
                        className={
                          "border-2 " +
                          (copied
                            ? "bg-green-100 dark:bg-green-900 text-white"
                            : "")
                        }
                        aria-label="Copy link"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {copied ? "Copied!" : "Copy link"}
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={generatedLink}
                    readOnly
                    className="flex-1 text-sm font-mono break-all text-muted-foreground select-all border-2 border-input bg-background px-3 py-2 rounded-md"
                  />
                  <Link
                    href={generatedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm font-medium whitespace-nowrap border-2 border-blue-600 px-3 py-2 rounded-md hover:bg-blue-50 hover:underline"
                  >
                    Open
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Model info */}
        <div className="border-t p-4">
          <div className="text-center text-sm text-muted-foreground">
            &copy; 2025 Let Me AI That For You • Shift+Enter for new line
          </div>
        </div>
      </div>
    </ChatLayout>
  );
}
