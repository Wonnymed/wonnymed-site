import "../../styles/globals.css";

import {
  SITE_URL,
  SUPPORTED_LOCALES,
  METADATA_BY_LOCALE,
  buildAlternates,
  buildCanonical,
  resolveLocale
} from "../lib/metadata";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";

const ICONS = {
  icon: [
    {url: "/assets/logo/w-logo.png", type: "image/png"}
  ],
  shortcut: [
    {url: "/assets/logo/w-logo.png", type: "image/png"}
  ],
  apple: [
    {url: "/assets/logo/w-logo.png", type: "image/png"}
  ]
};

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: "Wonnymed",
      url: SITE_URL,
      logo: `${SITE_URL}/assets/logo/wonnymed-logo-512.png`,
      sameAs: ["https://www.instagram.com/wonnymed"],
      address: {
        "@type": "PostalAddress",
        addressCountry: "HK"
      },
      areaServed: [
        "BR",
        "HK",
        "CN",
        "KR",
        "AE",
        "SA",
        "KW",
        "QA",
        "OM",
        "BH",
        "LATAM",
        "GCC"
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1 5615966097",
        contactType: "customer support",
        areaServed: [
          "BR",
          "HK",
          "CN",
          "KR",
          "AE",
          "SA",
          "KW",
          "QA",
          "OM",
          "BH",
          "LATAM",
          "GCC"
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: "Wonnymed",
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/search?q=RFQ+{search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    }
  ]
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({locale}));
}

export async function generateMetadata({params}) {
  const locale = resolveLocale(params?.locale);
  const {title, description, ogLocale} = METADATA_BY_LOCALE[locale];
  const canonical = buildCanonical(locale);
  const alternateLocales = SUPPORTED_LOCALES.filter((current) => current !== locale).map(
    (current) => METADATA_BY_LOCALE[current].ogLocale
  );
  const imageUrl = `${SITE_URL}/api/og/${locale}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: buildAlternates()
    },
    icons: ICONS,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Wonnymed",
      type: "website",
      locale: ogLocale,
      alternateLocale: alternateLocales,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    },
    themeColor: "#29566f"
  };
}

export default async function RootLayout({children, params}) {
  const locale = resolveLocale(params?.locale);
  const dir = locale === "ar" ? "rtl" : "ltr";
  const messages = await getMessages();

  return (
    <html lang={locale} dir={dir}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Noto+Sans+KR:wght@400;700&family=Noto+Sans+SC:wght@400;700&family=Noto+Sans+TC:wght@400;700&family=Noto+Sans+Arabic:wght@400;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Noto+Sans+KR:wght@400;700&family=Noto+Sans+SC:wght@400;700&family=Noto+Sans+TC:wght@400;700&family=Noto+Sans+Arabic:wght@400;700&display=swap"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(STRUCTURED_DATA, null, 2)
          }}
        />
        <NextIntlClientProvider key={locale} locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
