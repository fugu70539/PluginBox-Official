import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "PluginBox",
  description: "Telegram Plugin Hub",
};

// Это отключит масштабирование (зум)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
      {/* Класс overscroll-none — еще одна страховка от скролла */}
      <body className="antialiased overscroll-none">{children}</body>
    </html>
  );
}
