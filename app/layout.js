// === app/layout.js (fixed, imports global CSS once) ===
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
  icon: "/icon.png",
  shortcut: "/icon.png",
  apple: "/icon.png",
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
  };
}

export default function RootLayout({ children, params }) {
  const locale = getLocaleFromParams(params);
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
