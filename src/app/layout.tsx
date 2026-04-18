import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthSessionProvider } from "@/components/providers/session-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Paroisse Sainte Philadelphie de Godomey Kangloe",
  description:
    "Application de gestion paroissiale : fidèles, présences chorale et paroisse.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full scroll-smooth`}>
      <body className="min-h-full font-sans antialiased">
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
