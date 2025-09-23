"use client";

import { useState, useEffect } from "react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LanguageSwitcher } from "@/components/language-switcher";
import {
  getCurrentLanguage,
  getTranslation,
  type Language,
  type TranslationKey,
} from "@/lib/i18n";
import Link from "next/link";

export function HeaderBar() {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    setLanguage(getCurrentLanguage());
  }, []);

  const t = (key: TranslationKey) => {
    return getTranslation(language, key);
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-2">
        <Link
          href={process.env.NEXT_PUBLIC_SITE_URL || "/"}
          className="text-xl font-bold hover:underline"
        >
          {t("title")}
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </div>
  );
}
