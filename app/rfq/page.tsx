"use client";

import { useState } from "react";
import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ChatWidget from "../components/ChatWidget";
import { categories } from "../data/categories";
import { products } from "../data/products";

const WA = "15615966097";

export default function RFQPage() {
  const [lang, setLang] = useState("en");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", whatsapp: "", country: "", product: "", quantity: "", message: "" });
  const categoryList = categories.map((c) => ({ slug: c.slug, name: c.name[lang] || c.name.en }));

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(`RFQ — WonnyMed\n\nName: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nWhatsApp: ${form.whatsapp}\nCountry: ${form.country}\nProduct: ${form.product}\nQty: ${form.quantity}\n\n${form.message}`);
    window.open(`https://wa.me/${WA}?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  const inputCls = "w-full border border-[#d9d9d9] px-3 py-2 text-[12px] text-[#333] placeholder:text-[#bbb] focus:border-[#155e6b] focus:outline-none";

  return (
    <>
      <TopBar lang={lang} onLangChange={setLang} />
      <Header />
      <main className="mx-auto max-w-[1000px] px-4 py-4">
        <nav className="mb-3 text-[11px] text-[#999]">
          <a href="/" className="hover:text-[#155e6b]">Home</a>
          <span className="mx-1.5">/</span>
          <span className="text-[#333]">Request for Quotation</span>
        </nav>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <h1 className="mb-1 text-[18px] font-bold text-[#333]">Request for Quotation</h1>
            <p className="mb-5 text-[12px] text-[#888]">Tell us what you need. Our sourcing team will match you with verified suppliers and respond within 24 hours.</p>

            {submitted ? (
              <div className="border border-[#b7eb8f] bg-[#f6ffed] p-6 text-center" style={{ borderRadius: 2 }}>
                <svg className="mx-auto mb-2 h-8 w-8 text-[#52c41a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-[14px] font-semibold text-[#333]">Request Submitted</p>
                <p className="mt-1 text-[12px] text-[#888]">Our team will contact you within 24 hours.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", company: "", whatsapp: "", country: "", product: "", quantity: "", message: "" }); }} className="mt-3 border border-[#155e6b] px-4 py-1.5 text-[12px] font-medium text-[#155e6b] hover:bg-[#155e6b] hover:text-white" style={{ borderRadius: 2 }}>Submit Another Request</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-0.5 block text-[11px] font-medium text-[#555]">Full Name *</label>
                    <input required value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} style={{ borderRadius: 2 }} />
                  </div>
                  <div>
                    <label className="mb-0.5 block text-[11px] font-medium text-[#555]">Business Email *</label>
                    <input required type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputCls} style={{ borderRadius: 2 }} />
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-0.5 block text-[11px] font-medium text-[#555]">Company Name *</label>
                    <input required value={form.company} onChange={(e) => set("company", e.target.value)} className={inputCls} style={{ borderRadius: 2 }} />
                  </div>
                  <div>
                    <label className="mb-0.5 block text-[11px] font-medium text-[#555]">WhatsApp Number</label>
                    <input value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} placeholder="+55 11 99999-9999" className={inputCls} style={{ borderRadius: 2 }} />
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-0.5 block text-[11px] font-medium text-[#555]">Destination Country *</label>
                    <select required value={form.country} onChange={(e) => set("country", e.target.value)} className={inputCls} style={{ borderRadius: 2 }}>
                      <option value="">Select...</option>
                      {["Brazil", "United States", "Colombia", "Mexico", "Argentina", "Chile", "European Union", "UAE", "Saudi Arabia", "Other"].map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-0.5 block text-[11px] font-medium text-[#555]">Quantity Required</label>
                    <input value={form.quantity} onChange={(e) => set("quantity", e.target.value)} placeholder="e.g. 100 units" className={inputCls} style={{ borderRadius: 2 }} />
                  </div>
                </div>
                <div>
                  <label className="mb-0.5 block text-[11px] font-medium text-[#555]">Product of Interest *</label>
                  <select required value={form.product} onChange={(e) => set("product", e.target.value)} className={inputCls} style={{ borderRadius: 2 }}>
                    <option value="">Select product...</option>
                    {products.map((p) => <option key={p.slug} value={p.name.en}>{p.name.en}</option>)}
                    <option value="Other">Other / Custom Request</option>
                  </select>
                </div>
                <div>
                  <label className="mb-0.5 block text-[11px] font-medium text-[#555]">Additional Details</label>
                  <textarea rows={3} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Specifications, certifications needed, delivery timeline..." className={inputCls} style={{ borderRadius: 2 }} />
                </div>
                <button type="submit" className="w-full bg-[#f97316] py-2 text-[13px] font-semibold text-white hover:bg-[#ea6c0e]" style={{ borderRadius: 2 }}>Submit RFQ</button>
                <p className="text-center text-[10px] text-[#bbb]">Your request will be sent via WhatsApp for fastest response.</p>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div className="border border-[#e8e8e8] bg-[#f5f7fa] p-4" style={{ borderRadius: 2 }}>
              <h3 className="mb-3 text-[12px] font-bold uppercase tracking-wider text-[#155e6b]">Why WonnyMed</h3>
              <ul className="space-y-2.5">
                {[
                  ["200+ Verified Suppliers", "Factory audit and quality verification for every supplier."],
                  ["24h Response Time", "Our sourcing team responds within one business day."],
                  ["Quality Inspection", "Pre-shipment inspection available for every order."],
                  ["Regulatory Support", "ANVISA, FDA, CE, INVIMA registration assistance."],
                  ["Secure Transactions", "Trade assurance and escrow payment protection."],
                  ["Door-to-Door Logistics", "Complete shipping from factory to your warehouse."],
                ].map(([title, desc]) => (
                  <li key={title} className="flex gap-2">
                    <svg className="mt-0.5 h-3 w-3 flex-shrink-0 text-[#52c41a]" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" /></svg>
                    <div>
                      <p className="text-[11px] font-semibold text-[#333]">{title}</p>
                      <p className="text-[10px] text-[#888]">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-3 border border-[#e8e8e8] bg-white p-4 text-center" style={{ borderRadius: 2 }}>
              <p className="mb-2 text-[11px] font-medium text-[#333]">Prefer to talk directly?</p>
              <a href={`https://wa.me/${WA}?text=${encodeURIComponent("Hi, I'd like to request a quotation from WonnyMed.")}`} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#25d366] px-4 py-[5px] text-[11px] font-semibold text-white hover:bg-[#1da851]" style={{ borderRadius: 2 }}>
                Contact via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
