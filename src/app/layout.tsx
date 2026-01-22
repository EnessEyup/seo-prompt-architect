import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SEO Prompt Architect Pro",
  description: "Türkçe hukuk makaleleri için AI prompt üretici",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-200 antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
