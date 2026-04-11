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
        <h4 className="mb-2 pb-1.5 border-b border-gray-100 text-xs uppercase tracking-wide font-semibold text-gray-500">Categories</h4>
        <ul>
          {categories.map((c) => (
            <li key={c.slug}>
              <button
                onClick={() => onCategoryChange(c.slug)}
                className={`block w-full py-1.5 pl-2 text-left text-[13px] hover:text-[#155e6b] ${selectedCategories.includes(c.slug) ? "font-semibold text-[#155e6b] border-l-2 border-[#155e6b] pl-1.5" : "text-gray-700"}`}
              >
                {c.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Verified */}
      <div className="mb-4 border-t border-gray-100 pt-3">
        <label className="flex cursor-pointer items-center gap-2">
          <input type="checkbox" checked={verifiedOnly} onChange={() => onVerifiedChange(!verifiedOnly)} className="h-3.5 w-3.5 border-[#d9d9d9] text-[#155e6b]" />
          <span className="text-[13px] text-gray-700">Verified Suppliers Only</span>
        </label>
      </div>

      {/* Certifications */}
      <div className="mb-4 border-t border-gray-100 pt-3">
        <h4 className="mb-2 pb-1.5 border-b border-gray-100 text-xs uppercase tracking-wide font-semibold text-gray-500">Certifications</h4>
        <ul>
          {CERTS.map((c) => (
            <li key={c}>
              <label className="flex cursor-pointer items-center gap-2 py-[3px]">
                <input type="checkbox" checked={selectedCertifications.includes(c)} onChange={() => onCertificationChange(c)} className="h-3.5 w-3.5 border-[#d9d9d9] text-[#155e6b]" />
                <span className="text-xs text-gray-600">{c}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Buyer Protection */}
      <div className="border-t border-gray-100 pt-3">
        <h4 className="mb-2 pb-1.5 border-b border-gray-100 text-xs uppercase tracking-wide font-semibold text-gray-500">Buyer Protection</h4>
        <ul className="space-y-1.5 text-xs text-gray-600">
          <li className="flex items-center">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block mr-1.5 flex-shrink-0"></span>
            Trade Assurance
          </li>
          <li className="flex items-center">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block mr-1.5 flex-shrink-0"></span>
            Quality Inspection
          </li>
          <li className="flex items-center">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block mr-1.5 flex-shrink-0"></span>
            Secure Payment
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile */}
      <button onClick={() => setMobileOpen(!mobileOpen)} className="mb-2 flex w-full items-center justify-between border border-gray-200 bg-white px-3 py-2 text-[12px] text-gray-700 lg:hidden">
        <span>Filters</span>
        <svg className={`h-3 w-3 transition-transform ${mobileOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
      </button>
      {mobileOpen && <div className="mb-3 border border-gray-200 bg-white p-3 lg:hidden">{content}</div>}
      {/* Desktop */}
      <div className="hidden lg:block">{content}</div>
    </>
  );
}
