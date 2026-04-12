import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "PluginBox",
  description: "Telegram Plugin Hub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="antialiased bg-black text-white overflow-hidden">
        <main className="h-screen w-full flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
