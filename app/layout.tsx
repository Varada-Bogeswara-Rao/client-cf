// app/layout.tsx
import type { Metadata } from "next";


import "./globals.css";
import { Toaster } from "sonner";
import { ThirdwebProvider } from "thirdweb/react";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "next-themes";



export const metadata: Metadata = {
  title: 'Spark',
  description: 'Decentralized Crowdfunding Platform',
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body >
        <ThirdwebProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            <main>{children}</main>
            <Toaster />
          </ThemeProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
