"use client";

import { useState } from "react";
import Link from "next/link";
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import CategoryPlaceholder from "./components/CategoryPlaceholder";
import { products } from "./data/products";
import { categories } from "./data/categories";

export default function Home() {
  const [lang, setLang] = useState("en");
  const [activeCat, setActiveCat] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const catalogProducts = activeCat === "all"
    ? products
    : products.filter((p) => p.category.toLowerCase().replace(/\s+/g, "-") === activeCat);
  const visibleProducts = showAll ? catalogProducts : catalogProducts.slice(0, 24);

  const categoryList = categories.map((c) => ({
    slug: c.slug,
    name: c.name[lang] || c.name.en,
  }));

  return (
    <>
      <TopBar lang={lang} onLangChange={setLang} />
      <Header />

      {/* ═══ HERO ═══ */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            We Source From China.<br />You Import With Confidence.
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-500">
            WonnyMed connects Latin American importers with verified factories in China and South Korea. From sourcing to shipping — we handle everything.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/rfq" className="rounded-lg bg-[#ff6a00] px-6 py-3 text-sm font-semibold text-white hover:bg-[#e85e00]">
              Request a Free Quote
            </Link>
            <button
              onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Browse Products
            </button>
          </div>
          <p className="mt-8 text-[11px] text-gray-400">
            Hong Kong Registered Company · Factory-Verified Suppliers · 4 Languages Spoken
          </p>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-xl font-bold text-gray-900">How It Works</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { n: "1", t: "Tell Us What You Need", d: "Send us a product description, reference link, or photo. We'll find the best factories in 48 hours." },
              { n: "2", t: "We Source & Verify", d: "We negotiate pricing in Mandarin, inspect samples, verify factory credentials, and prepare regulatory docs." },
              { n: "3", t: "You Receive Your Order", d: "We coordinate shipping, handle export documentation, and support you until delivery. You focus on selling." },
            ].map((step) => (
              <div key={step.n} className="text-center">
                <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#155e6b] text-sm font-bold text-white">{step.n}</div>
                <h3 className="text-sm font-bold text-gray-900">{step.t}</h3>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">{step.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs italic text-gray-400">
            Average sourcing time: 5–7 days | Average savings: 40–60% vs local distributors
          </p>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="bg-white px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-center text-xl font-bold text-gray-900">Our Services</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { title: "Quick Sourcing", price: "From $200", text: "Tell us what you need. We find 3 verified suppliers in 48h with pricing, MOQ, and certifications.", best: "First-time importers testing a product", cta: "Request Quick Sourcing →", pop: false },
              { title: "Full Sourcing & Import", price: "From $500 + commission", text: "End-to-end: sourcing, negotiation, quality inspection, export docs, shipping coordination.", best: "Businesses ready to import consistently", cta: "Request Full Sourcing →", pop: true },
              { title: "Monthly Retainer", price: "From $2,000/month", text: "Dedicated sourcing manager. Priority factory visits. Unlimited product searches. Exclusive supplier deals.", best: "Established importers with recurring orders", cta: "Contact for Retainer →", pop: false },
            ].map((s) => (
              <div key={s.title} className="relative rounded-xl border border-gray-100 p-6 transition-shadow hover:shadow-md">
                {s.pop && (
                  <span className="absolute right-3 top-3 rounded-full bg-[#ff6a00] px-2 py-0.5 text-[9px] font-bold text-white">MOST POPULAR</span>
                )}
                <h3 className="text-sm font-bold text-gray-900">{s.title}</h3>
                <p className="mt-1 text-lg font-semibold text-[#155e6b]">{s.price}</p>
                <p className="mt-3 text-xs leading-relaxed text-gray-500">{s.text}</p>
                <p className="mt-3 text-[10px] text-gray-400">Best for: {s.best}</p>
                <Link href="/rfq" className="mt-4 block text-sm font-semibold text-[#ff6a00] hover:underline">{s.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRODUCT CATALOG ═══ */}
      <section id="catalog" className="bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="mb-2 text-center text-xl font-bold text-gray-900">Product Catalog</h2>
          <p className="mb-6 text-center text-sm text-gray-500">Browse products from our verified supplier network. All pricing available upon request.</p>

          {/* Category tabs */}
          <div className="mb-6 flex flex-wrap justify-center gap-1.5">
            <button
              onClick={() => { setActiveCat("all"); setShowAll(false); }}
              className={`rounded-full px-3 py-1 text-[12px] ${activeCat === "all" ? "bg-[#155e6b] text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"}`}
            >
              All
            </button>
            {categoryList.map((c) => (
              <button
                key={c.slug}
                onClick={() => { setActiveCat(c.slug); setShowAll(false); }}
                className={`rounded-full px-3 py-1 text-[12px] ${activeCat === c.slug ? "bg-[#155e6b] text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"}`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Product grid — simplified cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {visibleProducts.map((p) => (
              <Link key={p.slug} href={`/product/${p.slug}`} className="group block rounded-lg border border-gray-100 bg-white transition-shadow hover:shadow-sm">
                <CategoryPlaceholder category={p.category} height={130} />
                <div className="p-2.5">
                  <h3 className="mb-1 line-clamp-2 text-[12px] font-medium leading-snug text-gray-800 group-hover:text-[#155e6b]">
                    {p.name[lang] || p.name.en}
                  </h3>
                  <p className="mb-2 text-[10px] text-gray-400">{p.category}</p>
                  <span className="block w-full rounded bg-[#155e6b] py-1.5 text-center text-[11px] text-white hover:bg-[#0f4a52]">
                    Request Quote
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {!showAll && catalogProducts.length > 24 && (
            <div className="mt-6 text-center">
              <button onClick={() => setShowAll(true)} className="text-sm font-semibold text-[#155e6b] hover:underline">
                View Full Catalog ({catalogProducts.length} products) →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ═══ INDUSTRIES WE SERVE ═══ */}
      <section className="bg-white px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-xl font-bold text-gray-900">Industries We Serve</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {[
              { n: "Healthcare & Medical", d: "Devices, consumables, diagnostic equipment" },
              { n: "Beauty & Cosmetics", d: "K-beauty, skincare, salon equipment" },
              { n: "Consumer Electronics", d: "Monitors, sensors, smart devices" },
              { n: "Dental & Orthodontics", d: "Chairs, implants, imaging systems" },
              { n: "Industrial Equipment", d: "CNC parts, compressors, clean rooms" },
              { n: "Rehabilitation & Mobility", d: "Wheelchairs, physiotherapy, TENS" },
            ].map((ind) => (
              <div key={ind.n} className="rounded-lg bg-gray-50 p-4 text-center">
                <p className="text-sm font-semibold text-gray-800">{ind.n}</p>
                <p className="mt-1 text-xs text-gray-500">{ind.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRUST NUMBERS ═══ */}
      <section className="bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { num: "200+", label: "Verified Factories" },
              { num: "15+", label: "Product Categories" },
              { num: "4", label: "Languages Spoken" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-[#155e6b]">{s.num}</p>
                <p className="mt-1 text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-gray-400">
            Sourcing operations in Shanghai, Guangzhou, Suzhou, and Seoul. Factory visits and quality inspection available on all orders.
          </p>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className="bg-[#155e6b] px-6 py-10 text-center">
        <h2 className="text-xl font-bold text-white">Ready to import from China?</h2>
        <p className="mt-2 text-sm text-white/70">Tell us what you need. First consultation is free.</p>
        <Link href="/rfq" className="mt-4 inline-block rounded-lg bg-[#ff6a00] px-8 py-3 text-sm font-semibold text-white hover:bg-[#e85e00]">
          Get a Free Quote
        </Link>
      </section>

      <Footer />
      <ChatWidget />
    </>
  );
}
