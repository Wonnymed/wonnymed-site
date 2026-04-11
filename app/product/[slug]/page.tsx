"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import TopBar from "@/app/components/TopBar";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ChatWidget from "@/app/components/ChatWidget";
import ProductCard from "@/app/components/ProductCard";
import CategoryPlaceholder from "@/app/components/CategoryPlaceholder";
import { products } from "@/app/data/products";
import { categories } from "@/app/data/categories";

const REGULATORY_LABELS: Record<string, string> = {
  BR: "Brazil (ANVISA)",
  US: "USA (FDA)",
  EU: "EU (CE Mark)",
  CO: "Colombia (INVIMA)",
};

const COUNTRIES = [
  "Brazil", "United States", "Colombia", "Mexico", "Argentina", "Chile",
  "Peru", "Ecuador", "Germany", "Spain", "Portugal", "United Kingdom",
  "France", "Italy", "India", "South Africa", "Nigeria", "Other",
];

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [lang, setLang] = useState("en");
  const [activeRegTab, setActiveRegTab] = useState("BR");

  const product = products.find((p) => p.slug === slug);

  const headerCategories = categories.map((c) => ({
    slug: c.slug,
    name: c.name[lang] || c.name.en,
    icon: c.icon,
  }));

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col" style={{ background: "#f5f7fa" }}>
        <TopBar lang={lang} onLangChange={setLang} />
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="mb-2 text-[15px] font-bold" style={{ color: "#333" }}>
              Product Not Found
            </h1>
            <p className="mb-4 text-[12px]" style={{ color: "#999" }}>
              The product you are looking for does not exist or has been removed.
            </p>
            <Link
              href="/"
              className="inline-block px-5 py-2 text-[12px] font-semibold text-white"
              style={{ background: "#155e6b", borderRadius: 2 }}
            >
              Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const productName = product.name[lang] || product.name.en;
  const productLongName = product.longName[lang] || product.longName.en;

  const categoryObj = categories.find(
    (c) =>
      (c.name.en || "").toLowerCase().replace(/\s+/g, "-") ===
      product.category.toLowerCase().replace(/\s+/g, "-")
  );
  const categorySlug =
    categoryObj?.slug ||
    product.category.toLowerCase().replace(/\s+/g, "-");
  const categoryName = categoryObj
    ? categoryObj.name[lang] || categoryObj.name.en
    : product.category;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  const specsEntries = Object.entries(product.specs);
  const regulatoryKeys = Object.keys(product.regulatory);

  return (
    <div className="flex min-h-screen flex-col" style={{ background: "#f5f7fa" }}>
      <TopBar lang={lang} onLangChange={setLang} />
      <Header />

      <main className="mx-auto w-full max-w-[1200px] flex-1 px-3 py-3">
        {/* Breadcrumb */}
        <nav className="mb-3 flex items-center gap-1 text-[11px]" style={{ color: "#999" }}>
          <Link href="/" className="hover:underline" style={{ color: "#155e6b" }}>
            Home
          </Link>
          <span>&gt;</span>
          <Link href={`/category/${categorySlug}`} className="hover:underline" style={{ color: "#155e6b" }}>
            {categoryName}
          </Link>
          <span>&gt;</span>
          <span style={{ color: "#666" }}>{productName}</span>
        </nav>

        {/* ─── TOP SECTION: Image + Info ─── */}
        <div className="mb-3 flex gap-3" style={{ flexWrap: "wrap" }}>
          {/* Left: Image */}
          <div
            className="overflow-hidden border border-[#e8e8e8]"
            style={{ width: "40%", minWidth: 260, borderRadius: 2 }}
          >
            <CategoryPlaceholder category={product.category} height={280} />
          </div>

          {/* Right: Product Info */}
          <div className="flex-1" style={{ minWidth: 320 }}>
            <h1 className="mb-2 text-[16px] font-semibold leading-tight" style={{ color: "#333" }}>
              {productLongName}
            </h1>

            {/* Category badge */}
            <span
              className="mb-2 inline-block border px-2 py-[2px] text-[10px] font-medium"
              style={{ color: "#155e6b", borderColor: "#155e6b", borderRadius: 2 }}
            >
              {categoryName}
            </span>

            {/* Cert badges */}
            <div className="mb-2 flex flex-wrap gap-1">
              {product.certs.map((cert) => (
                <span
                  key={cert}
                  className="inline-block border px-2 py-[1px] text-[10px] font-semibold"
                  style={{
                    background: cert === "CE" ? "#fff7ed" : cert.includes("FDA") ? "#eff6ff" : cert.includes("ISO") ? "#f0fdf4" : "#faf5ff",
                    borderColor: cert === "CE" ? "#f97316" : cert.includes("FDA") ? "#3b82f6" : cert.includes("ISO") ? "#22c55e" : "#a855f7",
                    color: cert === "CE" ? "#c2410c" : cert.includes("FDA") ? "#1d4ed8" : cert.includes("ISO") ? "#15803d" : "#7e22ce",
                    borderRadius: 2,
                  }}
                >
                  {cert}
                </span>
              ))}
            </div>

            {/* Verified supplier badge */}
            <div
              className="mb-3 inline-flex items-center gap-1.5 border px-2 py-1 text-[11px] font-medium"
              style={{ background: "#f0fdf4", borderColor: "#bbf7d0", color: "#15803d", borderRadius: 2 }}
            >
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#22c55e" }}>
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
              Verified Supplier #{product.supplierId}
            </div>

            {/* Price + MOQ */}
            <div className="mb-2 border-t border-b py-2" style={{ borderColor: "#e8e8e8" }}>
              <div className="mb-1 text-[18px] font-bold" style={{ color: "#c2410c" }}>
                {product.priceRange}
              </div>
              <div className="flex items-center gap-4 text-[11px]" style={{ color: "#666" }}>
                <span><strong style={{ color: "#333" }}>MOQ:</strong> {product.moq}</span>
                <span><strong style={{ color: "#333" }}>Transactions:</strong> {product.transactions}+ orders</span>
              </div>
            </div>

            {/* Contact Supplier button */}
            <button
              className="mb-2 w-full py-2.5 text-[13px] font-bold text-white"
              style={{ background: "#155e6b", borderRadius: 2 }}
            >
              Contact Supplier
            </button>
            <p className="text-center text-[11px]" style={{ color: "#999" }}>
              Or{" "}
              <a href="#rfq-form" className="underline" style={{ color: "#f97316" }}>
                submit an RFQ
              </a>{" "}
              for this product
            </p>
          </div>
        </div>

        {/* ─── SPECIFICATIONS TABLE ─── */}
        <div className="mb-3 border border-[#e8e8e8] bg-white" style={{ borderRadius: 2 }}>
          <div className="border-b px-4 py-2.5" style={{ borderColor: "#e8e8e8" }}>
            <h2 className="text-[13px] font-bold" style={{ color: "#333" }}>
              Product Specifications
            </h2>
          </div>
          <table className="w-full">
            <tbody>
              {specsEntries.map(([key, value], idx) => (
                <tr key={key} style={{ background: idx % 2 === 0 ? "#fff" : "#f9fafb" }}>
                  <td className="px-4 py-2 text-[12px] font-medium" style={{ color: "#555", width: "35%" }}>
                    {key}
                  </td>
                  <td className="px-4 py-2 text-[12px]" style={{ color: "#333" }}>
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ─── REGULATORY REQUIREMENTS ─── */}
        <div className="mb-3 border border-[#e8e8e8] bg-white" style={{ borderRadius: 2 }}>
          <div className="border-b px-4 py-2.5" style={{ borderColor: "#e8e8e8" }}>
            <h2 className="text-[13px] font-bold" style={{ color: "#333" }}>
              Regulatory Requirements by Market
            </h2>
          </div>
          <div className="p-4">
            {/* Tabs */}
            <div className="mb-3 flex gap-0 border-b" style={{ borderColor: "#e8e8e8" }}>
              {regulatoryKeys.map((code) => (
                <button
                  key={code}
                  onClick={() => setActiveRegTab(code)}
                  className="px-3 py-1.5 text-[11px] font-medium"
                  style={{
                    color: activeRegTab === code ? "#155e6b" : "#999",
                    borderBottom: activeRegTab === code ? "2px solid #155e6b" : "2px solid transparent",
                    background: activeRegTab === code ? "#f0f7ff" : "transparent",
                    marginBottom: -1,
                  }}
                >
                  {REGULATORY_LABELS[code] || code}
                </button>
              ))}
            </div>

            {/* Active content */}
            <div className="p-3" style={{ background: "#f9fafb", borderRadius: 2 }}>
              <p className="text-[12px] leading-relaxed" style={{ color: "#555" }}>
                {product.regulatory[activeRegTab] || "No information available for this market."}
              </p>
            </div>
          </div>
        </div>

        {/* ─── WHAT WE HANDLE vs WHAT YOU HANDLE ─── */}
        <div className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-2">
          {/* WonnyMed Handles */}
          <div className="border border-[#e8e8e8] bg-white" style={{ borderRadius: 2 }}>
            <div className="px-4 py-2" style={{ background: "#15803d" }}>
              <h3 className="text-[12px] font-bold text-white">What WonnyMed Handles</h3>
            </div>
            <ul className="p-4">
              {[
                "Supplier verification & factory audit",
                "Price negotiation with manufacturer",
                "Quality inspection (pre-shipment)",
                "Export documentation & packing",
                "International logistics coordination",
              ].map((item) => (
                <li key={item} className="mb-2 flex items-start gap-2 text-[11px] last:mb-0" style={{ color: "#333" }}>
                  <svg className="mt-0.5 h-3 w-3 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#22c55e" }}>
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* You Handle */}
          <div className="border border-[#e8e8e8] bg-white" style={{ borderRadius: 2 }}>
            <div className="px-4 py-2" style={{ background: "#155e6b" }}>
              <h3 className="text-[12px] font-bold text-white">What You Handle</h3>
            </div>
            <ul className="p-4">
              {[
                "Import license & local registration",
                "Customs clearance in destination country",
                "Local regulatory submission (ANVISA/FDA/CE)",
                "Payment to WonnyMed (Trade Assurance)",
                "Local distribution & storage",
              ].map((item) => (
                <li key={item} className="mb-2 flex items-start gap-2 text-[11px] last:mb-0" style={{ color: "#333" }}>
                  <svg className="mt-0.5 h-3 w-3 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#155e6b" }}>
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ─── IMPORT PROCESS STEPS ─── */}
        <div className="mb-3 border border-[#e8e8e8] bg-white" style={{ borderRadius: 2 }}>
          <div className="border-b px-4 py-2.5" style={{ borderColor: "#e8e8e8" }}>
            <h2 className="text-[13px] font-bold" style={{ color: "#333" }}>
              Import Process
            </h2>
          </div>
          <div className="overflow-x-auto p-4">
            <div className="flex items-start" style={{ minWidth: 700 }}>
              {[
                { num: 1, title: "Submit RFQ", desc: "You tell us what you need" },
                { num: 2, title: "Supplier Matching", desc: "We match you with verified factories" },
                { num: 3, title: "Sample & Quote", desc: "Review samples, negotiate terms" },
                { num: 4, title: "Production & Inspection", desc: "We inspect before shipment" },
                { num: 5, title: "Shipping & Delivery", desc: "Door-to-door logistics" },
              ].map((step, idx) => (
                <div key={step.num} className="flex flex-1 items-start">
                  <div className="flex flex-col items-center text-center" style={{ width: "100%" }}>
                    <div
                      className="mb-1.5 flex h-8 w-8 items-center justify-center text-[13px] font-bold text-white"
                      style={{ background: "#155e6b", borderRadius: "50%" }}
                    >
                      {step.num}
                    </div>
                    <div className="text-[11px] font-semibold" style={{ color: "#333" }}>
                      {step.title}
                    </div>
                    <div className="mt-0.5 text-[10px] leading-tight" style={{ color: "#999", maxWidth: 120 }}>
                      {step.desc}
                    </div>
                  </div>
                  {idx < 4 && (
                    <div className="mt-4 flex-shrink-0 px-1" style={{ color: "#ccc" }}>
                      <svg className="h-3 w-5" fill="none" viewBox="0 0 20 12" stroke="currentColor" strokeWidth={1.5}>
                        <path d="M0 6h16m0 0l-4-4m4 4l-4 4" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── RFQ FORM ─── */}
        <div id="rfq-form" className="mb-3 border border-[#e8e8e8] bg-white" style={{ borderRadius: 2 }}>
          <div className="border-b px-4 py-2.5" style={{ borderColor: "#e8e8e8", background: "#155e6b" }}>
            <h2 className="text-[13px] font-bold text-white">
              Request for Quotation — {productName}
            </h2>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("RFQ submitted successfully! Our team will contact you within 24 hours.");
            }}
            className="p-4"
          >
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="mb-0.5 block text-[11px] font-medium" style={{ color: "#555" }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full border px-2.5 py-1.5 text-[12px] outline-none focus:border-[#155e6b]"
                  style={{ borderColor: "#ddd", color: "#333", borderRadius: 2 }}
                />
              </div>
              <div>
                <label className="mb-0.5 block text-[11px] font-medium" style={{ color: "#555" }}>
                  Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@company.com"
                  className="w-full border px-2.5 py-1.5 text-[12px] outline-none focus:border-[#155e6b]"
                  style={{ borderColor: "#ddd", color: "#333", borderRadius: 2 }}
                />
              </div>
              <div>
                <label className="mb-0.5 block text-[11px] font-medium" style={{ color: "#555" }}>
                  Company *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Company Name"
                  className="w-full border px-2.5 py-1.5 text-[12px] outline-none focus:border-[#155e6b]"
                  style={{ borderColor: "#ddd", color: "#333", borderRadius: 2 }}
                />
              </div>
              <div>
                <label className="mb-0.5 block text-[11px] font-medium" style={{ color: "#555" }}>
                  Country *
                </label>
                <select
                  required
                  className="w-full border px-2.5 py-1.5 text-[12px] outline-none focus:border-[#155e6b]"
                  style={{ borderColor: "#ddd", color: "#333", borderRadius: 2, background: "#fff" }}
                  defaultValue=""
                >
                  <option value="" disabled>Select country</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-0.5 block text-[11px] font-medium" style={{ color: "#555" }}>
                  Quantity *
                </label>
                <input
                  type="text"
                  required
                  placeholder={`Min. ${product.moq}`}
                  className="w-full border px-2.5 py-1.5 text-[12px] outline-none focus:border-[#155e6b]"
                  style={{ borderColor: "#ddd", color: "#333", borderRadius: 2 }}
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="mb-0.5 block text-[11px] font-medium" style={{ color: "#555" }}>
                Message
              </label>
              <textarea
                rows={3}
                placeholder="Additional requirements, delivery timeline, packaging preferences..."
                className="w-full border px-2.5 py-1.5 text-[12px] outline-none focus:border-[#155e6b]"
                style={{ borderColor: "#ddd", color: "#333", borderRadius: 2 }}
              />
            </div>
            <div className="mt-3 flex items-center gap-3">
              <button
                type="submit"
                className="px-8 py-2 text-[12px] font-bold text-white"
                style={{ background: "#f97316", borderRadius: 2 }}
              >
                Submit Request
              </button>
              <span className="text-[10px]" style={{ color: "#999" }}>
                Response within 24 hours
              </span>
            </div>
          </form>
        </div>

        {/* ─── RELATED PRODUCTS ─── */}
        {relatedProducts.length > 0 && (
          <div className="mb-3">
            <div className="mb-2 border-b pb-2" style={{ borderColor: "#e8e8e8" }}>
              <h2 className="text-[13px] font-bold" style={{ color: "#333" }}>
                Related Products
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.slug}
                  slug={p.slug}
                  name={p.name[lang] || p.name.en}
                  longName={p.longName?.en}
                  category={p.category}
                  moq={p.moq}
                  certifications={p.certs}
                  supplierCode={p.supplierId}
                  transactions={p.transactions}
                  exclusive={p.exclusive}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
