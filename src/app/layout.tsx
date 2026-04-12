import "./globals.css"; // ПРОВЕРЬ ЭТУ СТРОКУ
import type { Metadata } from "next";

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
        <script src="https://telegram.org/js/telegram-web-app.js" async />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
