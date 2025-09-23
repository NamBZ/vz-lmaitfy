"use client";

import { ReactNode } from "react";
import { HeaderBar } from "@/components/header-bar";

interface ChatLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export function ChatLayout({ children, showSidebar = false }: ChatLayoutProps) {
  return (
    <div className="flex h-screen">
      {/* Sidebar - only show on larger screens when enabled */}
      {showSidebar && (
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r">
          <div className="flex-1 p-4">
            <div className="text-sm font-medium mb-4">
              Let Me AI That For You
            </div>
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">Recent</div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <HeaderBar />
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
