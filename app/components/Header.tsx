"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${scrolled ? "shadow-sm" : "border-b border-gray-100"}`}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6" style={{ height: 56 }}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/w-logo.png" alt="WonnyMed" className="h-[32px] w-auto" />
          <span className="text-[19px] font-bold tracking-tight text-[#155e6b]">WonnyMed</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <button onClick={() => scrollTo("services")} className="text-[13px] text-gray-600 hover:text-[#155e6b]">Services</button>
          <button onClick={() => scrollTo("catalog")} className="text-[13px] text-gray-600 hover:text-[#155e6b]">Products</button>
          <button onClick={() => scrollTo("how-it-works")} className="text-[13px] text-gray-600 hover:text-[#155e6b]">How It Works</button>
          <Link href="/rfq" className="rounded-lg bg-[#ff6a00] px-4 py-2 text-sm font-semibold text-white hover:bg-[#e85e00]">
            Get a Quote
          </Link>
        </nav>

        {/* Mobile menu */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-1 md:hidden">
          {mobileOpen ? (
            <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-6 pb-4 md:hidden">
          <button onClick={() => scrollTo("services")} className="block w-full py-2 text-left text-[13px] text-gray-700">Services</button>
          <button onClick={() => scrollTo("catalog")} className="block w-full py-2 text-left text-[13px] text-gray-700">Products</button>
          <button onClick={() => scrollTo("how-it-works")} className="block w-full py-2 text-left text-[13px] text-gray-700">How It Works</button>
          <Link href="/rfq" onClick={() => setMobileOpen(false)} className="mt-2 block w-full rounded-lg bg-[#ff6a00] py-2.5 text-center text-sm font-semibold text-white">Get a Quote</Link>
        </div>
      )}
    </header>
  );
}
