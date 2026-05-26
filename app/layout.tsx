import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Clarity from "@/components/Clarity";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TexnikesDouleies.gr | Τεχνικές Θέσεις Εργασίας στην Ελλάδα",
    template: "%s | TexnikesDouleies.gr"
  },
  description: "Η εξειδικευμένη πλατφόρμα εύρεσης εργασίας για τεχνικά επαγγέλματα στην Ελλάδα. Βρείτε θέσεις για ηλεκτρολόγους, υδραυλικούς, ψυκτικούς και άλλες ειδικότητες.",
  keywords: ["εργασία", "τεχνικοί", "ηλεκτρολόγοι", "υδραυλικοί", "ψυκτικοί", "αγγελίες εργασίας", "τεχνικά επαγγέλματα", "Ελλάδα"],
  authors: [{ name: "TexnikesDouleies.gr" }],
  creator: "TexnikesDouleies.gr",
  publisher: "TexnikesDouleies.gr",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "TexnikesDouleies.gr | Τεχνικές Θέσεις Εργασίας στην Ελλάδα",
    description: "Η εξειδικευμένη πλατφόρμα εύρεσης εργασίας για τεχνικά επαγγέλματα στην Ελλάδα. Βρείτε θέσεις για ηλεκτρολόγους, υδραυλικούς, ψυκτικούς και άλλες ειδικότητες.",
    url: "https://texnikesdouleies.gr",
    siteName: "TexnikesDouleies.gr",
    locale: "el_GR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TexnikesDouleies.gr | Τεχνικές Θέσεις Εργασίας στην Ελλάδα",
    description: "Βρείτε τεχνική εργασία στην Ελλάδα εύκολα και γρήγορα.",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
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
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        {process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID && (
          <Clarity projectId={process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID} />
        )}
      </body>
    </html>
  );
}
