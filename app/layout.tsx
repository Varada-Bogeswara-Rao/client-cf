// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThirdwebProvider } from "thirdweb/react";
import NavBar from "./components/NavBar";

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
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider>
          <NavBar /> {/* ✅ reusable navbar */}
          <main>{children}</main>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
