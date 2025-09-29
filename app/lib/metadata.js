export const SITE_URL = "https://wonnymed.com";

export const DEFAULT_LOCALE = "pt";

export const SUPPORTED_LOCALES = ["pt", "en", "es", "zh", "ar", "ko"];

export const METADATA_BY_LOCALE = {
  pt: {
    title: "Wonnymed | Supply clínico com compliance",
    description: "Supply clínico com compliance ANVISA/UDI e cotações em 24–48h.",
    ogLocale: "pt_BR",
    ogTitle: "Supply clínico com compliance",
  },
  en: {
    title: "Wonnymed | Clinical supply with compliance",
    description: "Clinical supply with ANVISA/UDI diligence and 24–48h quotes.",
    ogLocale: "en_US",
    ogTitle: "Clinical supply with compliance",
  },
  es: {
    title: "Wonnymed | Abastecimiento clínico compliant",
    description: "Suministro clínico con compliance ANVISA/UDI y cotizaciones en 24–48h.",
    ogLocale: "es_ES",
    ogTitle: "Abastecimiento clínico compliant",
  },
  zh: {
    title: "Wonnymed｜合规快速的临床供应",
    description: "合规的临床供应，ANVISA/UDI 文档齐全，24–48 小时报价。",
    ogLocale: "zh_CN",
    ogTitle: "合规快速的临床供应",
  },
  ar: {
    title: "ونيميد | توريد سريري متوافق سريعًا",
    description: "توريد سريري متوافق مع ANVISA/UDI وعروض خلال ٤٨–٢٤ ساعة.",
    ogLocale: "ar",
    ogTitle: "توريد سريري متوافق سريعًا",
  },
  ko: {
    title: "Wonnymed | 컴플라이언스 임상 공급",
    description: "ANVISA/UDI 컴플라이언스와 24–48시간 견적의 임상 공급.",
    ogLocale: "ko_KR",
    ogTitle: "컴플라이언스 임상 공급",
  },
};

export function resolveLocale(maybeLocale) {
  if (typeof maybeLocale === "string" && SUPPORTED_LOCALES.includes(maybeLocale)) {
    return maybeLocale;
  }
  return DEFAULT_LOCALE;
}

export function buildCanonical(locale) {
  return locale === DEFAULT_LOCALE ? SITE_URL : `${SITE_URL}/${locale}`;
}

export function buildAlternates() {
  const languages = SUPPORTED_LOCALES.reduce((acc, locale) => {
    acc[locale] = buildCanonical(locale);
    return acc;
  }, {});
  languages["x-default"] = SITE_URL;
  return languages;
}
