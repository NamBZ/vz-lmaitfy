import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Let Me AI That For You",
  description: "A fun way to show people how to use AI assistants",
  openGraph: {
    title: "Let Me AI That For You",
    description: "A fun way to show people how to use AI assistants",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="system" storageKey="lmaitfy-ui-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
