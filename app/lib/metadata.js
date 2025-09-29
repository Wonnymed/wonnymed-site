export const SITE_URL = "https://wonnymed.com";

export const DEFAULT_LOCALE = "en";

export const SUPPORTED_LOCALES = [
  "pt",
  "en",
  "es",
  "ko",
  "zh-hans",
  "zh-hant",
  "ar"
];

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
    title: "Wonnymed | Supply clínico con compliance",
    description:
      "Abastecimiento clínico con diligencia ANVISA/UDI y cotizaciones en 24–48h.",
    ogLocale: "es_ES",
    ogTitle: "Supply clínico con compliance",
  },
  ko: {
    title: "Wonnymed | 컴플라이언스를 갖춘 임상 공급",
    description:
      "ANVISA/UDI 검증과 24–48시간 견적을 제공하는 임상 공급.",
    ogLocale: "ko_KR",
    ogTitle: "컴플라이언스 기반 임상 공급",
  },
  "zh-hans": {
    title: "Wonnymed | 合规与高效的临床供应",
    description:
      "提供 ANVISA/UDI 尽调与 24–48 小时报价的临床供应服务。",
    ogLocale: "zh_CN",
    ogTitle: "合规与高效的临床供应",
  },
  "zh-hant": {
    title: "Wonnymed | 合規且迅速的臨床供應",
    description:
      "臨床供應服務，附 ANVISA/UDI 審查與 24–48 小時報價。",
    ogLocale: "zh_HK",
    ogTitle: "合規且迅速的臨床供應",
  },
  ar: {
    title: "Wonnymed | توريد سريري مع امتثال وسرعة",
    description:
      "توريد سريري مع تدقيق ANVISA/UDI وعروض أسعار خلال 24–48 ساعة.",
    ogLocale: "ar_SA",
    ogTitle: "توريد سريري مع امتثال وسرعة",
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
