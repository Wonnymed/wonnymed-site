import ComplianceContent from "./ComplianceContent";

export const metadata = {
  title: "Compliance regulatório | Wonnymed",
  description:
    "Como validamos ANVISA, UDI, ISO 13485 e IFU/MSDS antes de cada cotação para garantir rastreabilidade clínica.",
};

const SUPPORTED_LANGUAGES = ["pt", "en", "es", "zh", "ar", "ko"];
const DEFAULT_LANG = "pt";

export default function CompliancePage({ searchParams }) {
  const requested = typeof searchParams?.lang === "string" ? searchParams.lang.toLowerCase() : "";
  const isSupported = SUPPORTED_LANGUAGES.includes(requested);
  const initialLang = isSupported ? requested : DEFAULT_LANG;

  return <ComplianceContent initialLang={initialLang} fromQuery={isSupported} />;
}
