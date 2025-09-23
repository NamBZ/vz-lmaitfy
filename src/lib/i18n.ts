export const translations = {
  en: {
    title: "Let Me AI That For You",
    description: "A fun way to show people how to use AI assistants",
    placeholder: "Ask me anything...",
    generateLink: "Generate Link",
    copyLink: "Copy link",
    copied: "Copied!",
    linkGenerated: "Generated Link:",
    modelInfo: "&copy; Let Me AI That For You • Shift+Enter for new line",
    clickHere: "Click here",
    howCanIHelp: "How can I help you today?",
    shiftEnterNewLine: "Shift+Enter for new line",
    messageChatGPT: "Message ChatGPT...",
    missingQuestion: "Missing question parameter",
  },
  vi: {
    title: "Để Tôi AI Điều Đó Cho Bạn",
    description: "Cách thú vị để chỉ cho mọi người cách sử dụng trợ lý AI",
    placeholder: "Hỏi tôi bất cứ điều gì...",
    generateLink: "Tạo Liên Kết",
    copyLink: "Sao chép liên kết",
    copied: "Đã sao chép!",
    linkGenerated: "Liên Kết Đã Tạo:",
    modelInfo: "&copy; Let Me AI That For You • Shift+Enter để xuống dòng",
    clickHere: "Nhấn vào đây",
    howCanIHelp: "Tôi có thể giúp gì cho bạn hôm nay?",
    shiftEnterNewLine: "Shift+Enter để xuống dòng",
    messageChatGPT: "Nhắn tin với ChatGPT...",
    missingQuestion: "Thiếu tham số câu hỏi",
  },
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;

export function getTranslation(lang: Language, key: TranslationKey): string {
  return translations[lang][key] || translations.en[key];
}
