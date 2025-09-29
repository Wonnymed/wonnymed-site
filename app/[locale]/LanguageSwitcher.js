"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const SUPPORTED_LOCALES = [
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
  { code: "es", label: "Español" },
  { code: "ko", label: "한국어" },
  { code: "zh-hans", label: "简体中文" },
  { code: "zh-hant", label: "繁體中文" },
  { code: "ar", label: "العربية" }
];

const SUPPORTED_CODES = SUPPORTED_LOCALES.map((option) => option.code);

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();

  function onChange(event) {
    const next = event.target.value;
    const segments = pathname.split("/");
    if (SUPPORTED_CODES.includes(segments[1])) {
      segments[1] = next;
    } else {
      segments.splice(1, 0, next);
    }
    const nextPath = segments.join("/") || "/";
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000`;
    router.replace(nextPath);
  }

  return (
    <select
      value={locale}
      onChange={onChange}
      aria-label={t("language")}
      className="rounded-full border border-neutral-200 bg-white/80 px-3 py-2 text-sm shadow-sm focus:border-[color:var(--wm-primary-700)] focus:outline-none focus:ring-2 focus:ring-[color:var(--wm-accent-200)]"
    >
      {SUPPORTED_LOCALES.map((option) => (
        <option key={option.code} value={option.code}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
