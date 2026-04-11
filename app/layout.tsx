import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "../styles/globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm",
});

export const metadata: Metadata = {
  title: "WonnyMed — Global B2B Sourcing Platform",
  description:
    "Source medical devices, hospital equipment, and healthcare supplies directly from 200+ verified Chinese manufacturers. Quality inspection, trade assurance, and competitive pricing for global buyers.",
  keywords: [
    "medical devices",
    "B2B sourcing",
    "China manufacturers",
    "hospital equipment",
    "healthcare supplies",
    "medical sourcing platform",
    "verified suppliers",
    "trade assurance",
  ],
  icons: {
    icon: "/assets/logo/w-logo.png",
    shortcut: "/assets/logo/w-logo.png",
    apple: "/assets/logo/w-logo.png",
  },
  openGraph: {
    title: "WonnyMed — Global B2B Sourcing Platform",
    description:
      "Source medical devices and healthcare supplies from 200+ verified Chinese manufacturers with quality inspection and trade assurance.",
    url: "https://www.wonnymed.com",
    siteName: "WonnyMed",
    images: [
      {
        url: "/assets/logo/w-logo.png",
        width: 1200,
        height: 630,
        alt: "WonnyMed — Global B2B Sourcing Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WonnyMed — Global B2B Sourcing Platform",
    description:
      "Source medical devices from 200+ verified Chinese manufacturers.",
    images: ["/assets/logo/w-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "WonnyMed Ltd.",
  url: "https://www.wonnymed.com",
  logo: "https://www.wonnymed.com/assets/logo/w-logo.png",
  description:
    "Global B2B sourcing platform for medical devices and healthcare supplies from verified Chinese manufacturers.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hong Kong",
    addressRegion: "Hong Kong SAR",
    addressCountry: "HK",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "Chinese", "Portuguese", "Spanish"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={`${dmSans.className} bg-white text-slate-800`}>
        {children}
      </body>
    </html>
  );
}
