import type { Metadata } from "next";
import { Inter, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500", "600"] });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", weight: ["400", "500", "600", "700"] });
const dmMono = DM_Mono({ subsets: ["latin"], variable: "--font-dm-mono", weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://allinonecalculator.fun"),
  title: "Free Online Calculators — Finance, Health, Math & More | All In One Calculator",
  description: "Free online calculators for mortgage, BMI, loan, percentage, calories and more. Fast, accurate, no sign-up needed.",
  openGraph: {
    title: "All In One Calculator | Free Online Calculators",
    description: "Free online calculators for mortgage, BMI, loan, percentage, calories and more. Fast, accurate, no sign-up needed.",
    url: "https://allinonecalculator.fun",
    siteName: "All In One Calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All In One Calculator | Free Online Calculators",
    description: "Free online calculators for mortgage, BMI, loan, percentage, calories and more.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    google: "yLe-WpfZpxLpXPtqRUqEXG5KPIiGVR67G38sqNcPvug",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
