export const translations = {
  en: {
    title: "Let Me AI That For You",
    description:
      "Create a shareable link that demonstrates how to ask AI questions",
    placeholder: "Ask me anything...",
    generateLink: "Generate Link",
    copyLink: "Copy link",
    copied: "Copied!",
    linkGenerated: "Generated Link:",
    modelInfo: "© 2025 Let Me AI That For You • Shift+Enter for new line",
    clickHere: "Click here to continue",
    howCanIHelp: "How can I help you today?",
    shiftEnterNewLine: "Shift+Enter for new line",
    messageChatGPT: "Message ChatGPT...",
    missingQuestion: "Missing question parameter",
    chatgpt: "ChatGPT",
    generating: "Generating...",
    enterToGenerate: "Press Enter to generate",
    openInChatGPT: "Open in ChatGPT",
    previewAnimation: "Preview Animation",
    copyLinkToClipboard: "Copy link to clipboard",
    copiedToClipboard: "Copied to clipboard!",
  },
  vi: {
    title: "Để Tôi AI Điều Đó Cho Bạn",
    description: "Tạo liên kết chia sẻ để minh họa cách đặt câu hỏi cho AI",
    placeholder: "Hỏi tôi bất cứ điều gì...",
    generateLink: "Tạo Liên Kết",
    copyLink: "Sao chép liên kết",
    copied: "Đã sao chép!",
    linkGenerated: "Liên Kết Đã Tạo:",
    modelInfo: "© 2025 Let Me AI That For You • Shift+Enter để xuống dòng",
    clickHere: "Nhấp vào đây để tiếp tục",
    howCanIHelp: "Tôi có thể giúp gì cho bạn hôm nay?",
    shiftEnterNewLine: "Shift+Enter để xuống dòng",
    messageChatGPT: "Nhắn tin với ChatGPT...",
    missingQuestion: "Thiếu tham số câu hỏi",
    chatgpt: "ChatGPT",
    generating: "Đang tạo...",
    enterToGenerate: "Nhấn Enter để tạo",
    openInChatGPT: "Mở trong ChatGPT",
    previewAnimation: "Xem trước Animation",
    copyLinkToClipboard: "Sao chép liên kết vào clipboard",
    copiedToClipboard: "Đã sao chép vào clipboard!",
  },
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;

export function getTranslation(lang: Language, key: TranslationKey): string {
  return translations[lang][key] || translations.en[key];
}

export function getCurrentLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("language");
  return (saved as Language) || "en";
}

export function setCurrentLanguage(lang: Language): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("language", lang);
}
