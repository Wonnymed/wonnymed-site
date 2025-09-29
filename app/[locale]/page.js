"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import { useLocale, useTranslations } from "next-intl";

import { LanguageSwitcher } from "./LanguageSwitcher";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
const RECAPTCHA_ACTION = "rfq_submit";
const WHATSAPP_URL =
  "https://wa.me/15615966097?text=RFQ%20Wonnymed&utm_source=site&utm_medium=whatsapp&utm_campaign=rfq";

const ORIGIN_BADGE_STYLES = {
  med: "border-[color:var(--wm-accent-200)] bg-[color:var(--wm-accent-50)] text-[color:var(--wm-primary-700)]",
  beauty: "border-rose-200 bg-rose-50 text-rose-700"
};

const ORIGIN_BADGE_FALLBACK =
  "border-neutral-200 bg-white/80 text-[color:var(--wm-primary-700)]";

function deriveLineSlug(value = "") {
  const normalized = value.toString().toLowerCase();
  if (normalized.includes("sutur")) return "suture";
  if (normalized.includes("ppu") || normalized.includes("drill")) return "ppu";
  if (normalized.includes("derm")) return "dermato";
  return "hemostatic";
}

function normalizePhone(value = "") {
  const raw = value.toString();
  const digits = raw.replace(/[^0-9+]/g, "");
  if (!digits) return "";
  if (digits.startsWith("+")) {
    return `+${digits.slice(1).replace(/[^0-9]/g, "").slice(0, 20)}`;
  }
  return digits.replace(/[^0-9]/g, "").slice(0, 20);
}

export default function Page() {
  const locale = useLocale();
  const pageT = useTranslations("page");
  const a11yT = useTranslations("a11y");
  const copy = pageT.raw("self");
  const dir = locale === "ar" ? "rtl" : "ltr";
  const isRTL = dir === "rtl";
  const a11y = {
    nav: a11yT("nav"),
    whatsapp: a11yT("whatsapp")
  };

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const initialForm = useMemo(
    () => ({
      nome: "",
      empresa: "",
      tipoConta: copy.form?.types?.[0] ?? "",
      email: "",
      telefone: "",
      linha: copy.form?.lines?.[0] ?? "",
      especificacoes: "",
      quantidade: "",
      frequencia: "",
      prazo: "",
      entrega: "",
      regulatorio: ""
    }),
    [copy.form?.lines, copy.form?.types]
  );
  const [form, setForm] = useState(() => initialForm);

  useEffect(() => {
    setLoading(false);
    setSent(false);
    setErrorMsg("");
    setForm(initialForm);
  }, [initialForm, locale]);

  const nav = copy.nav || {};
  const about = copy.about || {};
  const inlineArrow = isRTL ? "←" : "→";
  const diagonalArrow = isRTL ? "↖" : "↗";

  const navLinks = useMemo(
    () => [
      { id: "about", label: nav.about },
      { id: "solutions", label: nav.solutions },
      { id: "how", label: nav.how },
      { id: "compliance", label: nav.compliance }
    ],
    [nav.about, nav.solutions, nav.how, nav.compliance]
  );
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const sectionIds = navLinks.map((link) => link.id);
    const updateFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && sectionIds.includes(hash)) {
        setActiveSection(hash);
        return;
      }

      if (!hash && sectionIds.length > 0) {
        setActiveSection((current) => current || sectionIds[0]);
      }
    };

    updateFromHash();

    window.addEventListener("hashchange", updateFromHash);

    if (typeof IntersectionObserver === "undefined") {
      return () => {
        window.removeEventListener("hashchange", updateFromHash);
      };
    }

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const nextActive = visible[0].target.id;
          setActiveSection((current) => (current === nextActive ? current : nextActive));
          return;
        }

        entries.forEach((entry) => {
          if (entry.boundingClientRect.top >= 0) {
            const nextActive = entry.target.id;
            setActiveSection((current) => (current === nextActive ? current : nextActive));
          }
        });
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75]
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("hashchange", updateFromHash);
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, [navLinks]);

  const portalHref = "mailto:contato@wonnymed.com?subject=Portal%20Wonnymed";
  const topBarMessage = copy.sticky || "";
  const heroHighlights = Array.isArray(copy.hero?.badgeList)
    ? copy.hero.badgeList.slice(0, 3)
    : [];
  const heroMetrics = Array.isArray(copy.metrics) ? copy.metrics.slice(0, 2) : [];
  const [primaryMetric, secondaryMetric] = heroMetrics;
  const heroOriginBadges = Array.isArray(copy.hero?.originBadges) ? copy.hero.originBadges : [];
  const solutionLines = Array.isArray(copy.lines)
    ? copy.lines.map((line) => {
        const rfqLineSlug = line?.rfqLineSlug || deriveLineSlug(line?.title || "");
        const focusMarkets = Array.isArray(line?.focusMarkets) ? line.focusMarkets : [];
        return {
          ...line,
          focusMarkets,
          rfqLineSlug
        };
      })
    : [];

  const findLineOptionBySlug = useCallback(
    (slug) => {
      if (!slug) return "";
      const options = Array.isArray(copy.form?.lines) ? copy.form.lines : [];
      const match = options.find((option) => deriveLineSlug(option) === slug);
      return match || "";
    },
    [copy.form?.lines]
  );

  const scrollToRfq = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    const target = document.getElementById("rfq");
    if (target && typeof target.scrollIntoView === "function") {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.hash = "rfq";
      return;
    }

    if (window.history && typeof window.history.replaceState === "function") {
      window.history.replaceState(null, "", "#rfq");
    } else {
      window.location.hash = "rfq";
    }
  }, []);

  const handleLinePrefill = useCallback(
    (slug) => (event) => {
      if (event?.preventDefault) {
        event.preventDefault();
      }

      const option = findLineOptionBySlug(slug);
      if (option) {
        setForm((current) => ({ ...current, linha: option }));
      }

      setSent(false);
      setErrorMsg("");
      scrollToRfq();
    },
    [findLineOptionBySlug, scrollToRfq]
  );

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

  function handleChange(e) {
    const { name, value } = e.target;
    setErrorMsg("");
    setForm((f) => ({ ...f, [name]: value }));
  }

  function validate() {
    const issues = [];
    const required = {
      nome: form.nome,
      empresa: form.empresa,
      email: form.email,
      linha: form.linha,
      especificacoes: form.especificacoes
    };

    Object.entries(required).forEach(([key, value]) => {
      if (!value || !value.trim()) {
        issues.push(key);
      }
    });

    if (form.email && !emailRegex.test(form.email)) {
      issues.push("email");
    }

    if (form.telefone) {
      const normalized = normalizePhone(form.telefone);
      if (!normalized) {
        issues.push("telefone");
      }
    }

    return issues;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMsg("");

    const issues = validate();
    if (issues.length > 0) {
      setErrorMsg(copy.form?.errorRequired ?? "Please review the required fields.");
      return;
    }

    setLoading(true);

    try {
      let token = "";
      if (window.grecaptcha?.ready) {
        token = await new Promise((resolve, reject) => {
          window.grecaptcha.ready(() => {
            window.grecaptcha
              .execute(RECAPTCHA_SITE_KEY, { action: RECAPTCHA_ACTION })
              .then(resolve)
              .catch(reject);
          });
        });
      }

      const payload = {
        ...form,
        locale,
        telefone: normalizePhone(form.telefone),
        token
      };

      const response = await fetch("/api/rfq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setSent(true);
      setForm(initialForm);
    } catch (err) {
      setErrorMsg(
        err?.message || copy.form?.errorRequired || "Please review the required fields."
      );
    } finally {
      setLoading(false);
    }
  }

  const hero = copy.hero || {};
  const formCopy = copy.form || {};
  const cases = Array.isArray(copy.cases) ? copy.cases : [];
  const howSteps = Array.isArray(copy.howSteps) ? copy.howSteps : [];
  const complianceList = Array.isArray(copy.complianceList) ? copy.complianceList : [];
  const verifiedCriteria = Array.isArray(copy.verifiedCriteria) ? copy.verifiedCriteria : [];
  const rfqBullets = Array.isArray(copy.rfqBullets) ? copy.rfqBullets : [];
  const footerLines = Array.isArray(copy.lines) ? copy.lines : [];

  return (
    <div className={`min-h-screen bg-white text-neutral-900 ${isRTL ? "rtl" : ""}`} dir={dir}>
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="afterInteractive"
      />
      {RECAPTCHA_SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      )}

      <header className="sticky top-0 z-40 w-full border-b border-white/60 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4">
          <BrandWordmark label={copy.brand} />

          <nav
            role="navigation"
            aria-label={a11y.nav}
            className="hidden flex-1 items-center justify-center gap-2 text-sm font-medium text-neutral-600 md:flex"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-4 py-1.5 shadow-sm">
              {navLinks.map((link) => {
                const href = `#${link.id}`;
                const isActive = activeSection === link.id;

                return (
                  <a
                    key={href}
                    href={href}
                    className={`rounded-full px-3 py-1 transition-colors hover:bg-[color:var(--wm-accent-50)] hover:text-[color:var(--wm-primary-700)] ${
                      isActive
                        ? "bg-[color:var(--wm-accent-100)] text-[color:var(--wm-primary-800)] shadow-sm"
                        : ""
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </nav>

          <div className="flex items-center gap-2" style={{ marginInlineStart: "auto" }}>
            <a
              href={portalHref}
              className="hidden rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-600 transition hover:border-[color:var(--wm-primary)] hover:text-[color:var(--wm-primary-700)] md:inline-flex"
            >
              {nav.portal}
            </a>
            <LanguageSwitcher />
            <a
              href="#rfq"
              className="hidden items-center justify-center rounded-full bg-gradient-to-r from-[color:var(--wm-primary-800)] via-[color:var(--wm-primary-700)] to-[color:var(--wm-primary)] px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:shadow-lg md:inline-flex"
            >
              {hero.ctaPrimary}
            </a>
          </div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="relative overflow-hidden pb-16 pt-20 md:pt-28">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-white/70 to-transparent" aria-hidden="true" />
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--wm-accent-200)] bg-white/80 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-[color:var(--wm-primary-700)] shadow-sm">
                  {nav.compliance}
                </div>
                {heroOriginBadges.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {heroOriginBadges.map((badge) => (
                      <span
                        key={`${badge.text}-${badge.flag}`}
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-semibold ${
                          ORIGIN_BADGE_STYLES[badge.tone] || ORIGIN_BADGE_FALLBACK
                        }`}
                      >
                        <span role="img" aria-label={badge.ariaLabel} className="text-base leading-none">
                          {badge.flag}
                        </span>
                        <span>{badge.text}</span>
                      </span>
                    ))}
                  </div>
                ) : null}

                <h1 className="mt-6 text-4xl font-bold tracking-tight text-[color:var(--wm-primary-900)] md:text-5xl">
                  {hero.titleA}
                  <span className="bg-gradient-to-r from-[color:var(--wm-primary-800)] via-[color:var(--wm-primary-700)] to-[color:var(--wm-primary)] bg-clip-text text-transparent">
                    {hero.titleB}
                  </span>
                  {hero.titleC}
                </h1>

                <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600 md:text-lg">{hero.sub}</p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="#rfq"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--wm-primary-800)] via-[color:var(--wm-primary-700)] to-[color:var(--wm-primary)] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-lg"
                  >
                    {hero.ctaPrimary}
                    <span aria-hidden="true">{inlineArrow}</span>
                  </a>
                  <a
                    href="#compliance"
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:border-[color:var(--wm-primary-700)] hover:text-[color:var(--wm-primary-800)]"
                  >
                    {hero.ctaSecondary}
                  </a>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-neutral-600">{hero.note}</p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {heroHighlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="flex items-center gap-3 rounded-2xl border border-[color:var(--wm-accent-100)] bg-white/80 p-4 shadow-sm"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--wm-accent-50)] text-[color:var(--wm-primary-700)]">
                        ✓
                      </div>
                      <span className="text-sm font-semibold text-neutral-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-[color:var(--wm-primary-200)] via-white to-transparent" aria-hidden="true" />
                <div className="overflow-hidden rounded-3xl border border-white/80 bg-white/90 shadow-xl backdrop-blur">
                  <Image
                    src="/assets/hero/hero-kit.jpg"
                    alt="Wonnymed clinical supply kit"
                    width={720}
                    height={900}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
                <div className="absolute bottom-6 left-6 rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur">
                  {primaryMetric ? (
                    <div className="text-sm font-semibold text-neutral-700">
                      {primaryMetric.k}: <span className="text-[color:var(--wm-primary-800)]">{primaryMetric.v}</span>
                    </div>
                  ) : null}
                  {secondaryMetric ? (
                    <div className="mt-1 text-xs text-neutral-500">
                      {secondaryMetric.k}: {secondaryMetric.v}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="relative bg-white py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4">
            <SectionHeading eyebrow={about.eyebrow} title={about.title} subtitle={about.subtitle} />
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-[color:var(--wm-primary-800)]">{about.missionTitle}</h3>
                <p className="mt-3 text-neutral-700 leading-relaxed">{about.mission}</p>
                <h3 className="mt-8 text-lg font-semibold">{about.valuesTitle}</h3>
                <ul className="mt-4 space-y-4 text-neutral-600">
                  {(about.values ?? []).map((value) => (
                    <li key={value.title} className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur">
                      <h4 className="text-base font-semibold text-[color:var(--wm-primary-800)]">{value.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed">{value.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  {(about.stats ?? []).map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-white/60 bg-white/80 p-5 text-start shadow-sm backdrop-blur">
                      <div className="text-3xl font-semibold text-[color:var(--wm-primary-800)]">{stat.value}</div>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-600">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <figure className="rounded-3xl border border-[color:var(--wm-primary-200)] bg-[color:var(--wm-primary-50)] p-6 text-white">
                  <blockquote className="text-lg leading-relaxed text-[color:var(--wm-primary-900)]">{about.quote}</blockquote>
                  <figcaption className="mt-4 text-xs uppercase tracking-[0.4em] text-[color:var(--wm-primary-600)]">{about.quoteBy}</figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        <section id="solutions" className="relative bg-neutral-50 py-16 md:py-24">
          <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-white to-transparent" aria-hidden="true" />
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{copy.solutionsTitle}</h2>
              <a
                href="#rfq"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--wm-primary-800)] via-[color:var(--wm-primary-700)] to-[color:var(--wm-primary)] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-lg"
              >
                {hero.ctaPrimary}
                <span aria-hidden="true">{inlineArrow}</span>
              </a>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {solutionLines.map((it, i) => (
                <div key={`${it.title}-${i}`} className="group relative overflow-hidden rounded-3xl border bg-white/80 p-6 shadow-sm backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--wm-accent-50)] text-2xl">
                      <span>{it.icon ?? "•"}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900">{it.title}</h3>
                  </div>

                  {it.badge ? (
                    <span
                      className={`mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
                        ORIGIN_BADGE_STYLES[it.badge.tone] || ORIGIN_BADGE_FALLBACK
                      }`}
                    >
                      <span role="img" aria-label={it.badge.ariaLabel} className="text-base leading-none">
                        {it.badge.flag}
                      </span>
                      <span>{it.badge.text}</span>
                    </span>
                  ) : null}

                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{it.desc}</p>

                  {it.focusMarkets?.length ? (
                    <div className="mt-4 inline-flex flex-wrap gap-2">
                      {it.focusMarkets.map((market) => (
                        <button
                          key={`${market.code || market.label}`}
                          type="button"
                          onClick={handleLinePrefill(it.rfqLineSlug)}
                          title={market.label}
                          aria-label={market.label}
                          className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-3 py-1 text-xs font-semibold text-neutral-700 transition hover:border-[color:var(--wm-primary-600)] hover:text-[color:var(--wm-primary-700)]"
                        >
                          {market.flag ? (
                            <span role="img" aria-hidden="true">
                              {market.flag}
                            </span>
                          ) : null}
                          <span>{market.label}</span>
                        </button>
                      ))}
                    </div>
                  ) : null}

                  <a
                    href="#rfq"
                    onClick={handleLinePrefill(it.rfqLineSlug)}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--wm-primary-700)] underline decoration-[color:var(--wm-primary-200)] underline-offset-4 transition hover:text-[color:var(--wm-primary-900)]"
                  >
                    {copy.askQuote}
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how" className="relative bg-white py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{copy.howTitle}</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {howSteps.map((s, i) => (
                <div key={`${s.t}-${i}`} className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur">
                  <div className="flex items-center justify-between text-sm font-semibold text-[color:var(--wm-primary-800)]">
                    <span>{s.t}</span>
                    <span className="text-xs text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{s.d}</p>
                  {i < howSteps.length - 1 ? (
                    <div className="mt-4 h-px bg-gradient-to-r from-[color:var(--wm-primary-100)] via-transparent to-transparent" aria-hidden="true" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="compliance" className="relative bg-neutral-50 py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{copy.complianceTitle}</h2>
            <p className="mt-3 text-neutral-700">{copy.complianceDesc}</p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-sm backdrop-blur">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[color:var(--wm-primary-700)]">
                  {hero.badgeTitle}
                </h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-600">
                  {heroHighlights.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--wm-accent-100)] text-xs text-[color:var(--wm-primary-700)]">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#rfq"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--wm-primary-700)] underline decoration-[color:var(--wm-primary-200)] underline-offset-4 transition hover:text-[color:var(--wm-primary-900)]"
                >
                  {copy.requestChecklist}
                  <span aria-hidden="true">→</span>
                </a>
              </div>
              <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-sm backdrop-blur">
                <h3 className="text-lg font-semibold text-neutral-900">{copy.verifiedCriteriaTitle}</h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-600">
                  {verifiedCriteria.map((item, idx) => (
                    <li key={`${item}-${idx}`} className="flex items-center gap-3">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--wm-primary-50)] text-sm font-semibold text-[color:var(--wm-primary-700)]">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-neutral-500">{copy.verifiedNote}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{copy.casesTitle}</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {cases.map((c, i) => (
                <div key={`${c.t}-${i}`} className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-sm backdrop-blur">
                  <h3 className="text-lg font-semibold text-[color:var(--wm-primary-800)]">{c.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="rfq" className="relative bg-neutral-900 py-16 text-white md:py-24">
          <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-neutral-800 via-neutral-900 to-transparent" aria-hidden="true" />
          <div className="mx-auto max-w-5xl px-4">
            <div className="rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur">
              <div className="grid gap-8 md:grid-cols-[1fr_1fr]">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{copy.rfqTitle}</h2>
                  <p className="mt-3 text-neutral-200">{copy.rfqSub}</p>
                  <ul className="mt-6 space-y-3 text-sm text-neutral-300">
                    {rfqBullets.map((x) => (
                      <li key={x} className="flex items-start gap-2">
                        <span aria-hidden="true">•</span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-xs text-neutral-400">{copy.rfqHint}</p>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {sent ? (
                    <div className="rounded-2xl border border-white/20 bg-white/10 p-6 text-neutral-100">
                      <h3 className="text-lg font-semibold">{formCopy.okTitle}</h3>
                      <p className="mt-2 text-neutral-200">{formCopy.okMsg}</p>
                      <button
                        type="button"
                        className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white transition hover:border-white"
                        onClick={() => {
                          setSent(false);
                          scrollToRfq();
                        }}
                      >
                        {formCopy.backTop}
                        <span aria-hidden="true">{inlineArrow}</span>
                      </button>
                    </div>
                  ) : (
                    <>
                      {errorMsg ? (
                        <div className="rounded-2xl border border-rose-200 bg-rose-500/10 p-4 text-sm text-rose-100">
                          {errorMsg}
                        </div>
                      ) : null}
                      <Field label={formCopy.name} name="nome" value={form.nome} onChange={handleChange} />
                      <Field label={formCopy.company} name="empresa" value={form.empresa} onChange={handleChange} />
                      <Select label={formCopy.accountType} name="tipoConta" value={form.tipoConta} onChange={handleChange} opts={formCopy.types} />
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <Field label={formCopy.email} name="email" type="email" value={form.email} onChange={handleChange} />
                        <Field label={formCopy.phone} name="telefone" value={form.telefone} onChange={handleChange} />
                      </div>
                      <Select label={formCopy.line} name="linha" value={form.linha} onChange={handleChange} opts={formCopy.lines} />
                      <Area label={formCopy.specs} name="especificacoes" value={form.especificacoes} onChange={handleChange} placeholder={formCopy.specsPH} />
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <Field label={formCopy.qty} name="quantidade" value={form.quantidade} onChange={handleChange} />
                        <Field label={formCopy.freq} name="frequencia" value={form.frequencia} onChange={handleChange} />
                        <Field label={formCopy.deadline} name="prazo" value={form.prazo} onChange={handleChange} />
                        <Field label={formCopy.delivery} name="entrega" value={form.entrega} onChange={handleChange} />
                      </div>
                      <Area label={formCopy.reg} name="regulatorio" value={form.regulatorio} onChange={handleChange} placeholder={formCopy.regPH} />
                      <button
                        disabled={loading}
                        type="submit"
                        className="mt-6 w-full rounded-full bg-gradient-to-r from-[color:var(--wm-primary-800)] via-[color:var(--wm-primary-700)] to-[color:var(--wm-primary)] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-lg disabled:opacity-60"
                      >
                        {loading ? "..." : formCopy.submit}
                      </button>
                      <p className="mt-4 text-xs text-neutral-400">{formCopy.legal}</p>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <WhatsAppButton ariaLabel={a11y.whatsapp} isRTL={isRTL} />

      <div className="fixed bottom-4 left-0 right-0 z-30">
        <div className="mx-auto max-w-3xl px-4">
          <div className="flex items-center justify-between gap-3 rounded-full border border-white/60 bg-white/90 px-5 py-3 shadow-lg backdrop-blur">
            <p className="hidden text-sm font-medium text-neutral-600 md:block">{copy.sticky}</p>
            <a
              href="#rfq"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--wm-primary-800)] via-[color:var(--wm-primary-700)] to-[color:var(--wm-primary)] px-6 py-2 text-sm font-semibold text-white shadow-md transition hover:shadow-lg"
            >
              {hero.ctaPrimary}
              <span aria-hidden="true">{diagonalArrow}</span>
            </a>
          </div>
        </div>
      </div>

      <footer className="mt-16 border-t border-white/10 bg-[color:var(--wm-primary-800)] py-16 text-white/80">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 text-sm md:grid-cols-4">
          <div>
            <BrandWordmark
              label={copy.brand}
              labelClassName="font-semibold tracking-tight text-white"
              emblemClassName="h-10 w-10"
            />
            <p className="mt-3 max-w-xs text-white/70">{copy.footer?.blurb}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-white">{copy.footer?.solutions}</h4>
            <ul className="mt-4 space-y-2 text-white/70">
              {footerLines.map((it, i) => (
                <li key={`${it.title}-${i}`}>
                  <a href="#solutions" className="transition hover:text-white">
                    {it.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-white">{copy.footer?.institutional || "Company"}</h4>
            <ul className="mt-4 space-y-2 text-white/70">
              <li>
                <a href="#about" className="transition hover:text-white">
                  {nav.about}
                </a>
              </li>
              <li>
                <a href="#compliance" className="transition hover:text-white">
                  {nav.compliance}
                </a>
              </li>
              <li>
                <a href="#how" className="transition hover:text-white">
                  {nav.how}
                </a>
              </li>
              <li>
                <a href="#rfq" className="transition hover:text-white">
                  {nav.rfq}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-white">{copy.footer?.contact}</h4>
            <ul className="mt-4 space-y-2 text-white/70">
              <li>
                <a href="https://wa.me/15615966097" target="_blank" className="underline decoration-white/40 underline-offset-4 transition hover:text-white" rel="noreferrer">
                  WhatsApp: +1 561 596 6097
                </a>
              </li>
              <li>Instagram: @wonnymed</li>
              <li>contato@wonnymed.com</li>
              <li>
                <a href="mailto:contato@wonnymed.com?subject=Portal%20Wonnymed" className="underline decoration-white/40 underline-offset-4 transition hover:text-white">
                  {nav.portal}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center text-xs text-white/50">{pageT("self.footer.rights", { year: new Date().getFullYear() })}</div>
      </footer>
    </div>
  );
}

function SectionHeading({ eyebrow, title, subtitle }) {
  if (!title && !subtitle) return null;
  return (
    <div className="space-y-4 text-start">
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--wm-accent-200)] bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--wm-primary-700)]">
          {eyebrow}
        </span>
      ) : null}
      {title ? <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2> : null}
      {subtitle ? <p className="max-w-2xl text-base leading-relaxed text-neutral-600">{subtitle}</p> : null}
    </div>
  );
}

function Field({ label, name, type = "text", value, onChange }) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="font-semibold text-neutral-200">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
      />
    </label>
  );
}

function Select({ label, name, value, onChange, opts = [] }) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="font-semibold text-neutral-200">{label}</span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
      >
        {(Array.isArray(opts) ? opts : []).map((option) => (
          <option key={option} value={option} className="text-neutral-900">
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function Area({ label, name, value, onChange, placeholder }) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="font-semibold text-neutral-200">{label}</span>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
      />
    </label>
  );
}

function WhatsAppButton({ ariaLabel, isRTL }) {
  const arrow = isRTL ? "←" : "→";
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#20ba59]"
      aria-label={ariaLabel}
    >
      <span aria-hidden="true">💬</span>
      WhatsApp
      <span aria-hidden="true">{arrow}</span>
    </a>
  );
}

function BrandWordmark({ label, labelClassName = "text-sm font-semibold tracking-tight text-[color:var(--wm-primary-800)]", emblemClassName = "h-8 w-8" }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`flex items-center justify-center rounded-xl bg-[color:var(--wm-primary-900)] text-white ${emblemClassName}`}>
        W
      </div>
      <span className={labelClassName}>{label}</span>
    </div>
  );
}
