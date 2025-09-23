"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import {
  getCurrentLanguage,
  getTranslation,
  type Language,
  type TranslationKey,
} from "@/lib/i18n";

export default function HomePage() {
  const [question, setQuestion] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [language, setLanguage] = useState<Language>("en");

  // Initialize language from localStorage
  useEffect(() => {
    setLanguage(getCurrentLanguage());
  }, []);

  // Translation helper
  const t = (key: TranslationKey) => {
    return getTranslation(language, key);
  };

  const generateLink = async () => {
    if (!question.trim()) {
      return;
    }

    setIsGenerating(true);
    setGeneratedLink(""); // Clear previous link

    // Simulate generation time
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const params = new URLSearchParams({
      q: question,
    });

    const link = `${window.location.origin}/share?${params.toString()}`;
    setGeneratedLink(link);
    setIsGenerating(false);
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
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center space-y-2"
            >
              <motion.h1
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="text-4xl font-bold tracking-tight"
              >
                {t("title")}
                <motion.span
                  initial={{ opacity: 0.6, scale: 0.8 }}
                  animate={{ opacity: [0.6, 1, 0.6], scale: [0.8, 1.2, 0.8] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  className="inline-block align-middle ml-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-sparkles text-yellow-400 h-6 w-6"
                  >
                    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                    <path d="M20 3v4"></path>
                    <path d="M22 5h-4"></path>
                    <path d="M4 17v2"></path>
                    <path d="M5 18H3"></path>
                  </svg>
                </motion.span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground"
              >
                {t("description")}
              </motion.p>
            </motion.div>

            {/* Question input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-4"
            >
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Textarea
                  placeholder={t("placeholder")}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="min-h-[100px] resize-none transition-all duration-200"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      generateLink();
                    }
                  }}
                />
              </motion.div>

              <div className="flex gap-2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                >
                  <Button
                    onClick={generateLink}
                    disabled={!question.trim() || isGenerating}
                    className="flex-1 w-full"
                  >
                    {isGenerating ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-4 h-4 mr-2 rounded-full border-2 border-transparent border-t-current"
                        />
                        {t("generating")}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {t("generateLink")}
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Animation container for loading and result */}
            <AnimatePresence mode="wait">
              {generatedLink && !isGenerating && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.8 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="p-6 rounded-xl shadow-md border border-muted bg-background"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="text-center">
                      <motion.h3
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg font-semibold text-foreground mb-2"
                      >
                        {t("linkGenerated")}
                      </motion.h3>
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay: 0.4,
                          type: "spring",
                          stiffness: 200,
                        }}
                        className="p-4 bg-muted rounded-lg border"
                      >
                        <div className="text-sm font-mono break-all text-foreground select-all">
                          {generatedLink}
                        </div>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                      className="flex gap-3 justify-center"
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              onClick={copyToClipboard}
                              className={
                                "px-6 py-2 transition-all duration-200 " +
                                (copied
                                  ? "bg-green-500 hover:bg-green-600 text-white"
                                  : "")
                              }
                            >
                              <motion.div
                                animate={copied ? { scale: [1, 1.2, 1] } : {}}
                                transition={{ duration: 0.3 }}
                              >
                                <Copy className="w-4 h-4 mr-2" />
                              </motion.div>
                              {copied ? t("copied") : t("copyLink")}
                            </Button>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent>
                          {copied
                            ? t("copiedToClipboard")
                            : t("copyLinkToClipboard")}
                        </TooltipContent>
                      </Tooltip>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button asChild variant="outline" className="px-6 py-2">
                          <Link
                            href={generatedLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {t("previewAnimation")}
                            <motion.svg
                              className="w-4 h-4 ml-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              whileHover={{ x: 2 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </motion.svg>
                          </Link>
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Model info */}
        <div className="border-t p-4">
          <div className="text-center text-sm text-muted-foreground">
            {t("modelInfo")}
          </div>
        </div>
      </div>
    </ChatLayout>
  );
}
