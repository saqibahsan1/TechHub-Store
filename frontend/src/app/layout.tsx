import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TechHub Store | Premium Computer Accessories",
  description: "Upgrade your gaming and productivity setup with premium RAM, mechanical keyboards, gaming mouse, and accessories at unbeatable prices.",
  keywords: "RAM, mechanical keyboards, gaming mouse, computer accessories, gaming peripherals, SSD, USB hubs, laptop accessories",
  authors: [{ name: "TechHub Store" }],
  openGraph: {
    title: "TechHub Store | Premium Computer Accessories",
    description: "Upgrade your gaming and productivity setup with premium RAM, mechanical keyboards, gaming mouse, and accessories at unbeatable prices.",
    url: "https://techhub-store.vercel.app",
    siteName: "TechHub Store",
    images: [
      {
        url: "https://techhub-store.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://techhub-store.vercel.app" />
        <meta name="robots" content="index, follow" />
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-YOUR_GA_ID`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YOUR_GA_ID');
          `}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}