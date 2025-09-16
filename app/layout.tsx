// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThirdwebProvider } from "thirdweb/react";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Thirdweb App",
  description: "A Next.js app with Thirdweb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThirdwebProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NavBar /> {/* ✅ reusable navbar */}
            <main>{children}</main>
          </ThemeProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
