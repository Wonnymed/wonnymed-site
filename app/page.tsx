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
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-slate-50 px-6 py-20 md:py-28">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #155e6b 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl" style={{ lineHeight: 1.1 }}>
            We Source From China.<br />You Import With Confidence.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-gray-500">
            WonnyMed connects Latin American importers with verified factories in China and South Korea. From sourcing to shipping — we handle everything.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/rfq" className="rounded-xl bg-[#ff6a00] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-200/50 transition-all hover:shadow-xl hover:bg-[#e85e00]">
              Request a Free Quote
            </Link>
            <button onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })} className="rounded-xl border-2 border-gray-200 bg-white px-8 py-3.5 text-sm font-semibold text-gray-700 transition-all hover:border-gray-300">
              Browse Products
            </button>
          </div>
          <div className="mt-10 flex items-center justify-center gap-4 text-[11px] text-gray-400">
            <span className="flex items-center gap-1.5"><svg className="h-3.5 w-3.5 text-[#155e6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>Hong Kong Registered</span>
            <span className="text-gray-300">&middot;</span>
            <span className="flex items-center gap-1.5"><svg className="h-3.5 w-3.5 text-[#155e6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Factory-Verified</span>
            <span className="text-gray-300">&middot;</span>
            <span className="flex items-center gap-1.5"><svg className="h-3.5 w-3.5 text-[#155e6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582" /></svg>4 Languages</span>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="bg-gradient-to-b from-slate-50 to-white px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-gray-900">How It Works</h2>
          <div className="relative grid grid-cols-1 gap-10 md:grid-cols-3">
            {/* Connecting line */}
            <div className="absolute top-6 left-[16.5%] right-[16.5%] hidden h-px border-t-2 border-dashed border-gray-200 md:block" />
            {[
              { n: "1", t: "Tell Us What You Need", d: "Send us a product description, reference link, or photo. We'll find the best factories in 48 hours." },
              { n: "2", t: "We Source & Verify", d: "We negotiate pricing in Mandarin, inspect samples, verify factory credentials, and prepare regulatory docs." },
              { n: "3", t: "You Receive Your Order", d: "We coordinate shipping, handle export documentation, and support you until delivery." },
            ].map((step) => (
              <div key={step.n} className="relative text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#155e6b] text-base font-bold text-white shadow-md ring-4 ring-white">{step.n}</div>
                <h3 className="text-base font-bold text-gray-900">{step.t}</h3>
                <p className="mx-auto mt-2 max-w-[280px] text-sm leading-relaxed text-gray-500">{step.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-xs italic text-gray-400">Average sourcing time: 5–7 days | Average savings: 40–60% vs local distributors</p>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="bg-white px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-gray-900">Our Services</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { title: "Quick Sourcing", price: "$200", text: "Tell us what you need. We find 3 verified suppliers in 48h with pricing, MOQ, and certifications.", best: "First-time importers testing a product", cta: "Request Quick Sourcing →", pop: false, icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" },
              { title: "Full Sourcing & Import", price: "$500", text: "End-to-end: sourcing, negotiation, quality inspection, export docs, shipping coordination.", best: "Businesses ready to import consistently", cta: "Request Full Sourcing →", pop: true, icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" },
              { title: "Monthly Retainer", price: "$2,000", text: "Dedicated sourcing manager. Priority factory visits. Unlimited product searches. Exclusive deals.", best: "Established importers with recurring orders", cta: "Contact for Retainer →", pop: false, icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" },
            ].map((s) => (
              <div key={s.title} className={`relative rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl ${s.pop ? "border-2 border-[#ff6a00] shadow-lg shadow-orange-100/50 scale-[1.02]" : "border-gray-100 hover:border-gray-200"}`}>
                {s.pop && <span className="absolute right-4 top-4 rounded-full bg-[#ff6a00] px-2.5 py-0.5 text-[9px] font-bold uppercase text-white">Most Popular</span>}
                <svg className="mb-4 h-8 w-8 text-[#155e6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={s.icon} /></svg>
                <h3 className="text-base font-bold text-gray-900">{s.title}</h3>
                <p className="mt-1 text-2xl font-bold text-gray-900">From {s.price}<span className="text-sm font-normal text-gray-400">/project</span></p>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">{s.text}</p>
                <div className="mt-3 inline-block rounded-lg bg-slate-50 px-3 py-1.5 text-xs text-gray-500">Best for: {s.best}</div>
                <Link href="/rfq" className="mt-4 block text-sm font-semibold text-[#ff6a00] hover:underline">{s.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRODUCT CATALOG ═══ */}
      <section id="catalog" className="bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">Product Catalog</h2>
          <p className="mb-8 text-center text-sm text-gray-500">Browse products from our verified supplier network. All pricing available upon request.</p>
          {/* Category tabs */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            <button onClick={() => { setActiveCat("all"); setShowAll(false); }} className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${activeCat === "all" ? "bg-[#155e6b] text-white" : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300"}`}>All</button>
            {categoryList.map((c) => (
              <button key={c.slug} onClick={() => { setActiveCat(c.slug); setShowAll(false); }} className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${activeCat === c.slug ? "bg-[#155e6b] text-white" : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300"}`}>{c.name}</button>
            ))}
          </div>
          {/* Grid — 3 columns, max 9 */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProducts.slice(0, showAll ? visibleProducts.length : 9).map((p) => (
              <Link key={p.slug} href={`/product/${p.slug}`} className="group rounded-xl border border-gray-100 bg-white transition-all hover:border-gray-200 hover:shadow-md">
                <CategoryPlaceholder category={p.category} height={140} />
                <div className="p-4">
                  <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-gray-400">{p.category}</p>
                  <h3 className="mb-3 line-clamp-2 text-[13px] font-semibold leading-snug text-gray-800 group-hover:text-[#155e6b]">{p.name[lang] || p.name.en}</h3>
                  <span className="block w-full rounded-lg bg-[#155e6b] py-2 text-center text-[11px] font-semibold text-white transition-colors hover:bg-[#0f4a52]">Request Quote</span>
                </div>
              </Link>
            ))}
          </div>
          {!showAll && catalogProducts.length > 9 && (
            <div className="mt-8 text-center">
              <button onClick={() => setShowAll(true)} className="text-sm font-semibold text-[#155e6b] hover:underline">View All Products ({catalogProducts.length}) →</button>
            </div>
          )}
        </div>
      </section>

      {/* ═══ INDUSTRIES WE SERVE ═══ */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-gray-900">Industries We Serve</h2>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
            {[
              { n: "Healthcare & Medical", d: "Devices, consumables, diagnostic equipment", icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" },
              { n: "Beauty & Cosmetics", d: "K-beauty, skincare, salon equipment", icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" },
              { n: "Consumer Electronics", d: "Monitors, sensors, smart devices", icon: "M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-6 18.75h6" },
              { n: "Dental & Orthodontics", d: "Chairs, implants, imaging systems", icon: "M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" },
              { n: "Industrial Equipment", d: "CNC parts, compressors, clean rooms", icon: "M11.42 15.17l-5.656-5.657 1.414-1.414 4.242 4.243 8.485-8.485 1.414 1.414-9.9 9.9z" },
              { n: "Rehabilitation", d: "Wheelchairs, physiotherapy, TENS", icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" },
            ].map((ind) => (
              <div key={ind.n} className="rounded-xl border border-gray-100 bg-white p-6 text-center transition-all hover:border-gray-200 hover:shadow-md">
                <svg className="mx-auto mb-3 h-7 w-7 text-[#155e6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={ind.icon} /></svg>
                <p className="text-sm font-semibold text-gray-800">{ind.n}</p>
                <p className="mt-1 text-xs text-gray-500">{ind.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRUST NUMBERS ═══ */}
      <section className="bg-[#155e6b] px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { num: "200+", label: "Verified Factories" },
              { num: "15+", label: "Product Categories" },
              { num: "4", label: "Languages Spoken" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-bold text-white">{s.num}</p>
                <p className="mt-1 text-sm font-medium text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-white/40">Sourcing operations in Shanghai, Guangzhou, Suzhou, and Seoul.</p>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-[#155e6b] to-[#0f4a52] px-8 py-12 text-center shadow-xl">
          <h2 className="text-2xl font-bold text-white">Ready to import from China?</h2>
          <p className="mt-2 text-sm text-white/70">Tell us what you need. First consultation is free.</p>
          <Link href="/rfq" className="mt-6 inline-block rounded-xl bg-[#ff6a00] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:bg-[#e85e00] hover:shadow-xl">Get a Free Quote</Link>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </>
  );
}
