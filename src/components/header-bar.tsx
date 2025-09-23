"use client";

import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";

export function HeaderBar() {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-2">
        <Link
          href={process.env.NEXT_PUBLIC_SITE_URL || "/"}
          className="text-xl font-bold hover:underline"
        >
          Let Me AI That For You
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        <ThemeSwitcher />
      </div>
    </div>
  );
}
