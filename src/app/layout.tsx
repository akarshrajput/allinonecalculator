import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.allinonecalculator.fun"),
  title: "Free Online Calculators — Finance, Health, Math & More | All In One Calculator",
  description: "Free online calculators for mortgage, BMI, loan, percentage, calories and more. Fast, accurate, no sign-up needed.",
  openGraph: {
    title: "All In One Calculator | Free Online Calculators",
    description: "Free online calculators for mortgage, BMI, loan, percentage, calories and more. Fast, accurate, no sign-up needed.",
    url: "https://www.allinonecalculator.fun",
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
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Adsense */}

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-0X7XLF33PW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-0X7XLF33PW');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 w-full">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
