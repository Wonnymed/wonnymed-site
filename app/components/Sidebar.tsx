"use client";

import { useState } from "react";

interface Category { slug: string; name: string; }

interface SidebarProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryChange: (slug: string) => void;
  verifiedOnly: boolean;
  onVerifiedChange: (value: boolean) => void;
  selectedCertifications: string[];
  onCertificationChange: (cert: string) => void;
}

const CERTS = ["CE", "FDA", "ISO 13485", "ISO 9001"];

export default function Sidebar({ categories, selectedCategories, onCategoryChange, verifiedOnly, onVerifiedChange, selectedCertifications, onCertificationChange }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const content = (
    <div>
      {/* Categories */}
      <div className="mb-4">
        <h4 className="mb-2 text-[12px] font-bold uppercase text-[#333]">Categories</h4>
        <ul>
          {categories.map((c) => (
            <li key={c.slug}>
              <button
                onClick={() => onCategoryChange(c.slug)}
                className={`block w-full py-[5px] text-left text-[12px] hover:text-[#155e6b] ${selectedCategories.includes(c.slug) ? "font-semibold text-[#155e6b]" : "text-[#555]"}`}
              >
                {c.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Verified */}
      <div className="mb-4 border-t border-[#eee] pt-3">
        <label className="flex cursor-pointer items-center gap-2">
          <input type="checkbox" checked={verifiedOnly} onChange={() => onVerifiedChange(!verifiedOnly)} className="h-3.5 w-3.5 border-[#d9d9d9] text-[#155e6b]" />
          <span className="text-[12px] text-[#333]">Verified Suppliers Only</span>
        </label>
      </div>

      {/* Certifications */}
      <div className="mb-4 border-t border-[#eee] pt-3">
        <h4 className="mb-2 text-[12px] font-bold uppercase text-[#333]">Certifications</h4>
        <ul>
          {CERTS.map((c) => (
            <li key={c}>
              <label className="flex cursor-pointer items-center gap-2 py-[3px]">
                <input type="checkbox" checked={selectedCertifications.includes(c)} onChange={() => onCertificationChange(c)} className="h-3.5 w-3.5 border-[#d9d9d9] text-[#155e6b]" />
                <span className="text-[12px] text-[#555]">{c}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Trust */}
      <div className="border-t border-[#eee] pt-3">
        <h4 className="mb-2 text-[12px] font-bold uppercase text-[#333]">Buyer Protection</h4>
        <ul className="space-y-1.5 text-[11px] text-[#666]">
          <li className="flex items-center gap-1.5">
            <svg className="h-3 w-3 text-[#155e6b]" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.932 9.563 12.348a.749.749 0 00.374 0c5.499-1.416 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" /></svg>
            Trade Assurance
          </li>
          <li className="flex items-center gap-1.5">
            <svg className="h-3 w-3 text-[#155e6b]" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" /></svg>
            Quality Inspection
          </li>
          <li className="flex items-center gap-1.5">
            <svg className="h-3 w-3 text-[#155e6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
            Secure Payment
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile */}
      <button onClick={() => setMobileOpen(!mobileOpen)} className="mb-2 flex w-full items-center justify-between border border-[#d9d9d9] bg-white px-3 py-2 text-[12px] text-[#333] lg:hidden">
        <span>Filters</span>
        <svg className={`h-3 w-3 transition-transform ${mobileOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
      </button>
      {mobileOpen && <div className="mb-3 border border-[#d9d9d9] bg-white p-3 lg:hidden">{content}</div>}
      {/* Desktop */}
      <div className="hidden lg:block">{content}</div>
    </>
  );
}
