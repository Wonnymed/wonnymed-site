import { cookies } from "next/headers";

import ComplianceContent from "./ComplianceContent";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "../lib/metadata";
import { LOCALE_COOKIE, LOCALE_QUERY_PARAM } from "../lib/locale";

export const metadata = {
  title: "Compliance regulatório | Wonnymed",
  description:
    "Como validamos ANVISA, UDI, ISO 13485 e IFU/MSDS antes de cada cotação para garantir rastreabilidade clínica.",
};

export default function CompliancePage({ searchParams }) {
  const requestedParam = searchParams?.[LOCALE_QUERY_PARAM];
  const requested = typeof requestedParam === "string" ? requestedParam.toLowerCase() : "";
  const hasQueryLocale = SUPPORTED_LOCALES.includes(requested);

  const cookieStore = cookies();
  const localeCookie = cookieStore.get(LOCALE_COOKIE)?.value ?? "";
  const cookieLocale = localeCookie.toLowerCase();
  const hasCookieLocale = SUPPORTED_LOCALES.includes(cookieLocale);

  const fallbackLocale = hasCookieLocale ? cookieLocale : DEFAULT_LOCALE;
  const initialLang = hasQueryLocale ? requested : fallbackLocale;

  return <ComplianceContent initialLang={initialLang} />;
}
