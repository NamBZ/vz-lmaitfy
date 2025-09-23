"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import {
  getCurrentLanguage,
  setCurrentLanguage,
  type Language,
} from "@/lib/i18n";

const languages = {
  en: "English",
  vi: "Tiếng Việt",
};

export function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<Language>("en");

  useEffect(() => {
    setCurrentLang(getCurrentLanguage());
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    setCurrentLanguage(lang);
    // Reload page to apply new language
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{languages[currentLang]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleLanguageChange(code as Language)}
            className={currentLang === code ? "bg-accent" : ""}
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
