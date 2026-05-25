import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "greek"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "greek"],
});

export const metadata: Metadata = {
  title: "TexnikesDouleies.gr | Τεχνικές Θέσεις Εργασίας στην Ελλάδα",
  description: "Η εξειδικευμένη πλατφόρμα εύρεσης εργασίας για τεχνικά επαγγέλματα στην Ελλάδα. Βρείτε θέσεις για ηλεκτρολόγους, υδραυλικούς, ψυκτικούς και άλλες ειδικότητες.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="el"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
