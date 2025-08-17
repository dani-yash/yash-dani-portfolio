import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import BaseLayout from "@/components/baseLayout";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

// TODO: update siteUrl below once your final domain is known
const siteUrl = "https://yashdani.vercel.app";

export const metadata = {
  title: "Yash Dani — Software Engineer",
  description:
    "Software Engineer (CS @ York). Full-stack, ML & Test Automation. React, Node, Java, Spring Boot, Python, Selenium. Projects: Mentor–Mentee Matching, HammerStrike, Fake-News Analysis.",
  openGraph: {
    title: "Yash Dani — Software Engineer",
    description: "Projects, experience and skills across full-stack, ML and QA automation.",
    url: siteUrl,
    siteName: "Yash Dani Portfolio",
    images: [
      {
        // place a 1200×630 image at public/images/og-image.jpg
        url: `${siteUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Yash Dani Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Dani — Software Engineer",
    description: "Full-stack, ML & Test Automation.",
    images: [`${siteUrl}/images/og-image.jpg`],
  },
  icons: {
    icon: "/favicon_io/favicon.ico?v=2",
    apple: "/favicon_io/apple-touch-icon.png?v=2",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yash Dani",
  url: "https://yashdani.vercel.app",
  jobTitle: "Software Engineer",
  sameAs: [
    "https://github.com/dani-yash",
    // add LinkedIn here later if you want
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png?v=2" />
        <link rel="manifest" href="/favicon_io/site.webmanifest?v=2" />
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={cn(inter.className, "dark")}>
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
}
