"use client";

import { useState } from "react";
import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ChatWidget from "../components/ChatWidget";
import { categories } from "../data/categories";

const COUNTRIES = [
  { code: "BR", name: "Brazil", flag: "BR", agency: "ANVISA", full: "Agência Nacional de Vigilância Sanitária", timeline: "30-365 days", docs: ["Product registration (Registro) or notification (Cadastro) by risk class", "Good Manufacturing Practices (GMP) certificate", "Brazilian Representative (BRH) for foreign manufacturers", "Technical documentation translated to Portuguese", "Import license (LI) per shipment", "Risk class: I (low), II (medium), III (high), IV (maximum)"] },
  { code: "US", name: "United States", flag: "US", agency: "FDA", full: "Food and Drug Administration", timeline: "90 days (510k) to 12+ months (PMA)", docs: ["510(k) Premarket Notification or PMA depending on class", "Establishment Registration and Device Listing", "Quality System Regulation (21 CFR Part 820)", "US Agent for foreign manufacturers", "Unique Device Identification (UDI) labeling", "Class I: general controls, Class II: 510(k), Class III: PMA"] },
  { code: "EU", name: "European Union", flag: "EU", agency: "CE Mark (MDR)", full: "Medical Device Regulation (EU) 2017/745", timeline: "6-18 months", docs: ["CE marking conformity assessment via Notified Body", "EU MDR 2017/745 compliance", "Technical documentation per Annex II and III", "Quality Management System (ISO 13485)", "EU Authorized Representative for non-EU manufacturers", "Clinical evaluation per Article 61", "UDI registration in EUDAMED"] },
  { code: "CO", name: "Colombia", flag: "CO", agency: "INVIMA", full: "Instituto Nacional de Vigilancia de Medicamentos y Alimentos", timeline: "30-180 days", docs: ["Sanitary Registration (Registro Sanitario)", "Risk classification: Class I, IIa, IIb, III", "Certificate of Free Sale from country of origin", "GMP certificate from manufacturer", "Legal representative in Colombia", "Technical documentation in Spanish"] },
  { code: "AR", name: "Argentina", flag: "AR", agency: "ANMAT", full: "Administración Nacional de Medicamentos, Alimentos y Tecnología Médica", timeline: "60-365 days", docs: ["Product registration through Disposition 2318/2002", "Risk classification per Annex II", "Certificate of Free Sale", "GMP certificate", "Legal representative (Director Técnico) in Argentina", "Documentation translated to Spanish"] },
  { code: "MX", name: "Mexico", flag: "MX", agency: "COFEPRIS", full: "Comisión Federal para la Protección contra Riesgos Sanitarios", timeline: "30-180 days", docs: ["Sanitary Registration (Registro Sanitario)", "Risk classification: Class I, II, III", "Certificate of Free Sale", "GMP certificate (NOM-241-SSA1)", "Legal representative in Mexico", "Import permit per shipment"] },
  { code: "CL", name: "Chile", flag: "CL", agency: "ISP", full: "Instituto de Salud Pública de Chile", timeline: "30-120 days", docs: ["Sanitary Registration via ISP", "Certificate of Free Sale", "GMP certificate", "Authorized distributor in Chile", "Technical documentation in Spanish", "Labeling in Spanish"] },
  { code: "AE", name: "UAE", flag: "AE", agency: "MOH / MOHAP", full: "Ministry of Health and Prevention", timeline: "30-90 days", docs: ["Product registration via Emirates Authority for Standardization & Metrology", "Certificate of Free Sale", "ISO 13485 certification", "CE marking or FDA clearance (accepted)", "Authorized distributor in UAE", "Arabic labeling requirements"] },
  { code: "SA", name: "Saudi Arabia", flag: "SA", agency: "SFDA", full: "Saudi Food and Drug Authority", timeline: "60-180 days", docs: ["MDMA (Medical Device Market Authorization) via SFDA", "Certificate of Free Sale from country of origin", "ISO 13485 and/or CE marking", "GMP certificate", "Saudi Authorized Representative", "Arabic labeling and documentation", "SFDA establishment license for local distributor"] },
];

export default function RegulatoryPage() {
  const [lang, setLang] = useState("en");
  const [selected, setSelected] = useState<string | null>(null);
  const categoryList = categories.map((c) => ({ slug: c.slug, name: c.name[lang] || c.name.en }));
  const country = COUNTRIES.find((c) => c.code === selected);

  return (
    <>
      <TopBar />
      <Header categories={categoryList} lang={lang} onLangChange={setLang} onSearch={() => {}} />
      <main className="mx-auto max-w-[1200px] px-4 py-4">
        <nav className="mb-3 text-[11px] text-[#999]">
          <a href="/" className="hover:text-[#155e6b]">Home</a>
          <span className="mx-1.5">/</span>
          <span className="text-[#333]">Regulatory Guide</span>
        </nav>

        <h1 className="mb-1 text-[18px] font-bold text-[#333]">Medical Device Regulatory Guide</h1>
        <p className="mb-5 max-w-2xl text-[12px] text-[#888]">Select a destination country to view import requirements, regulatory authority, estimated timelines, and required documentation for medical device registration.</p>

        {/* Country selector */}
        <div className="mb-6">
          <select
            value={selected || ""}
            onChange={(e) => setSelected(e.target.value || null)}
            className="border border-[#d9d9d9] px-3 py-2 text-[13px] text-[#333] focus:border-[#155e6b] focus:outline-none"
            style={{ borderRadius: 2, minWidth: 280 }}
          >
            <option value="">Select destination country...</option>
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>{c.name} — {c.agency}</option>
            ))}
          </select>
        </div>

        {/* Country cards grid (quick select) */}
        <div className="mb-6 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9">
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              onClick={() => setSelected(selected === c.code ? null : c.code)}
              className={`flex flex-col items-center gap-1 border p-2.5 text-center transition-colors ${selected === c.code ? "border-[#155e6b] bg-[#f0f7ff]" : "border-[#e8e8e8] bg-white hover:border-[#ccc]"}`}
              style={{ borderRadius: 2 }}
            >
              <span className="text-[11px] font-bold text-[#333]">{c.code}</span>
              <span className="text-[9px] text-[#999]">{c.agency}</span>
            </button>
          ))}
        </div>

        {/* Results */}
        {country ? (
          <div className="border border-[#e8e8e8] bg-white" style={{ borderRadius: 2 }}>
            <div className="border-b border-[#e8e8e8] bg-[#f5f7fa] px-5 py-3">
              <h2 className="text-[15px] font-bold text-[#333]">{country.name} — {country.agency}</h2>
              <p className="text-[11px] text-[#888]">{country.full}</p>
            </div>
            <div className="p-5">
              {/* Timeline */}
              <div className="mb-4 flex items-center gap-2 border border-[#e8e8e8] bg-[#fdf8f0] px-4 py-2.5" style={{ borderRadius: 2 }}>
                <svg className="h-4 w-4 text-[#f97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-[12px] text-[#333]">Estimated timeline: <strong>{country.timeline}</strong></span>
              </div>

              {/* Documents */}
              <h3 className="mb-3 text-[12px] font-bold uppercase tracking-wider text-[#155e6b]">Required Documents & Steps</h3>
              <ul className="space-y-2">
                {country.docs.map((doc, i) => (
                  <li key={i} className="flex gap-2.5 text-[12px] text-[#555]">
                    <span className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center bg-[#155e6b] text-[9px] font-bold text-white" style={{ borderRadius: 2 }}>{i + 1}</span>
                    {doc}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-5 border-t border-[#eee] pt-4">
                <p className="mb-2 text-[12px] text-[#666]">Need help with {country.agency} registration? Our regulatory team can assist.</p>
                <a href="/rfq" className="inline-block bg-[#155e6b] px-4 py-[6px] text-[12px] font-semibold text-white hover:bg-[#0f4a52]" style={{ borderRadius: 2 }}>Request Regulatory Support</a>
              </div>
            </div>
          </div>
        ) : (
          <div className="border border-dashed border-[#d9d9d9] bg-[#fafafa] p-10 text-center" style={{ borderRadius: 2 }}>
            <p className="text-[13px] text-[#999]">Select a country above to view regulatory requirements</p>
          </div>
        )}

        <p className="mt-5 text-[10px] text-[#bbb]">Disclaimer: This information is for general guidance only. Always consult qualified regulatory professionals and the relevant national authority. WonnyMed does not guarantee the accuracy of this information.</p>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
