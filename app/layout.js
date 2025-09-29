// === app/layout.js (refined, full) ===
import "../styles/globals.css";

const SITE_URL = "https://wonnymed.com";
const SUPPORTED_LOCALES = ["pt", "en", "es", "zh", "ar", "ko"];

const METADATA_BY_LOCALE = {
  pt: {
    title: "Wonnymed | Supply clínico com compliance",
    description: "Supply clínico com compliance ANVISA/UDI e cotações em 24–48h.",
  },
  en: {
    title: "Wonnymed | Clinical supply with compliance",
    description: "Clinical supply with ANVISA/UDI diligence and 24–48h quotes.",
  },
  es: {
    title: "Wonnymed | Abastecimiento clínico compliant",
    description: "Suministro clínico con compliance ANVISA/UDI y cotizaciones en 24–48h.",
  },
  zh: {
    title: "Wonnymed｜合规快速的临床供应",
    description: "合规的临床供应，ANVISA/UDI 文档齐全，24–48 小时报价。",
  },
  ar: {
    title: "ونيميد | توريد سريري متوافق سريعًا",
    description: "توريد سريري متوافق مع ANVISA/UDI وعروض خلال ٤٨–٢٤ ساعة.",
  },
  ko: {
    title: "Wonnymed | 컴플라이언스 임상 공급",
    description: "ANVISA/UDI 컴플라이언스와 24–48시간 견적의 임상 공급.",
  },
};

const ICONS = {
  icon: [
    { url: "/assets/logo/wonnymed-logo.png", type: "image/png" },
  ],
  shortcut: [
    { url: "/assets/logo/wonnymed-logo.png", type: "image/png" },
  ],
  apple: [
    { url: "/assets/logo/wonnymed-logo.png", type: "image/png" },
  ],
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
        addressCountry: "HK",
      },
      // Áreas atendidas (países + regiões)
      areaServed: [
        "BR", // Brazil
        "HK", // Hong Kong
        "CN", // China
        "KR", // Korea
        // GCC countries
        "AE", "SA", "KW", "QA", "OM", "BH",
        // Regional labels (aceitos como sinalização semântica)
        "LATAM", "GCC"
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1 5615966097",
        contactType: "customer support",
        areaServed: [
          "BR","HK","CN","KR",
          "AE","SA","KW","QA","OM","BH",
          "LATAM","GCC"
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: "Wonnymed",
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/search?q=RFQ+{search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

function getLocaleFromParams(params) {
  const maybeLocale = params?.locale;
  if (typeof maybeLocale === "string" && SUPPORTED_LOCALES.includes(maybeLocale)) {
    return maybeLocale;
  }
  return "pt";
}

function buildCanonical(locale) {
  return locale === "pt" ? SITE_URL : `${SITE_URL}/${locale}`;
}

function buildAlternates() {
  const languages = SUPPORTED_LOCALES.reduce((acc, locale) => {
    acc[locale] = buildCanonical(locale);
    return acc;
  }, {});
  languages["x-default"] = SITE_URL;
  return languages;
}

export async function generateMetadata({ params }) {
  const locale = getLocaleFromParams(params);
  const { title, description } = METADATA_BY_LOCALE[locale];
  const canonical = buildCanonical(locale);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: buildAlternates(),
    },
    icons: ICONS,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Wonnymed",
      type: "website",
      locale: locale === "zh" ? "zh-Hans" : locale === "pt" ? "pt-BR" : locale,
    },
    // (Opcional) tema da barra em mobile/Windows
    themeColor: "#29566f",
  };
}

export default function RootLayout({ children, params }) {
  const locale = getLocaleFromParams(params);
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(STRUCTURED_DATA, null, 2),
          }}
        />
        {children}
      </body>
    </html>
  );
}
