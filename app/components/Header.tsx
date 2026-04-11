"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const PULSE_CSS = `@keyframes rfqPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }`;

interface Category { slug: string; name: string; }

interface SearchResult {
  slug: string;
  name: string;
  category: string;
  cert: string;
}

interface HeaderProps {
  categories: Category[];
  lang: string;
  onLangChange: (lang: string) => void;
  onSearch: (query: string) => void;
  activeCategory?: string;
  onCategorySelect?: (slug: string) => void;
  searchQuery?: string;
  searchResults?: SearchResult[];
  onResultClick?: (slug: string) => void;
}

const LANGS = [
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
  { code: "es", label: "ES" },
];

export default function Header({ categories, lang, onLangChange, onSearch, activeCategory, onCategorySelect, searchQuery, searchResults, onResultClick }: HeaderProps) {
  const [localQuery, setLocalQuery] = useState("");
  const [catDropdown, setCatDropdown] = useState(false);
  const [selectedCat, setSelectedCat] = useState("All Categories");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const query = searchQuery !== undefined ? searchQuery : localQuery;

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) setCatDropdown(false);
    };
    document.addEventListener("mousedown", close);
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => { document.removeEventListener("mousedown", close); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    return () => {
      if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
    };
  }, []);

  const handleInputChange = (value: string) => {
    if (searchQuery !== undefined) {
      onSearch(value);
    } else {
      setLocalQuery(value);
      onSearch(value);
    }
    setShowDropdown(value.length >= 2);
  };

  const handleClear = () => {
    if (searchQuery !== undefined) {
      onSearch("");
    } else {
      setLocalQuery("");
      onSearch("");
    }
    setShowDropdown(false);
  };

  const handleResultClick = (slug: string) => {
    setShowDropdown(false);
    onResultClick?.(slug);
  };

  const handleBlur = () => {
    blurTimeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 150);
  };

  const handleFocus = () => {
    if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
    if (query.length >= 2 && searchResults && searchResults.length > 0) {
      setShowDropdown(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowDropdown(false);
    } else if (e.key === "Enter") {
      setShowDropdown(false);
    }
  };

  const dropdownVisible = showDropdown && searchResults && searchResults.length > 0 && query.length >= 2;

  return (
    <header className={`sticky top-0 z-50 border-b border-[#e5e5e5] bg-white transition-shadow duration-200 ${scrolled ? "shadow-md" : ""}`}>
      <style dangerouslySetInnerHTML={{ __html: PULSE_CSS }} />
      <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-6 py-2.5" style={{ height: 56 }}>
        {/* Logo */}
        <Link href="/" className="mr-2 flex flex-shrink-0 items-center gap-2.5">
          <img src="/w-logo.png" alt="WonnyMed" className="h-[36px] w-auto" />
          <span className="text-[20px] font-bold tracking-tight" style={{ color: "#155e6b" }}>
            WonnyMed
          </span>
        </Link>

        {/* Search bar with category dropdown */}
        <div className="hidden flex-1 md:flex">
          <div className="relative flex w-full max-w-[600px]">
            {/* Category dropdown */}
            <div ref={catRef} className="relative">
              <button
                onClick={() => setCatDropdown(!catDropdown)}
                className="flex h-[38px] items-center gap-1 border border-r-0 border-[#d9d9d9] bg-[#f5f5f5] px-2.5 text-[11px] text-[#333] hover:bg-[#eee]"
                style={{ borderRadius: "2px 0 0 2px" }}
              >
                <span className="max-w-[100px] truncate">{selectedCat}</span>
                <svg className="h-3 w-3 text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </button>
              {catDropdown && (
                <div className="absolute left-0 top-full z-50 mt-px w-48 border border-[#d9d9d9] bg-white shadow-md">
                  <button onClick={() => { setSelectedCat("All Categories"); setCatDropdown(false); onSearch(""); }} className="block w-full px-3 py-1.5 text-left text-[12px] text-[#333] hover:bg-[#f5f5f5]">All Categories</button>
                  {categories.map((c) => (
                    <button key={c.slug} onClick={() => { setSelectedCat(c.name); setCatDropdown(false); }} className="block w-full px-3 py-1.5 text-left text-[12px] text-[#333] hover:bg-[#f5f5f5]">{c.name}</button>
                  ))}
                </div>
              )}
            </div>
            {/* Input with clear button */}
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                onFocus={handleFocus}
                placeholder="Search products, suppliers, categories..."
                className="h-[38px] w-full border border-[#d9d9d9] px-3 pr-8 text-[13px] text-[#333] placeholder:text-[#999] focus:border-[#155e6b] focus:outline-none"
              />
              {query && (
                <button
                  onClick={handleClear}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                  type="button"
                  aria-label="Clear search"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            {/* Search button */}
            <button onClick={() => setShowDropdown(false)} className="flex h-[38px] items-center gap-1 bg-[#ff6a00] px-5 text-[13px] font-semibold text-white hover:bg-[#e85e00]" style={{ borderRadius: "0 2px 2px 0" }}>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
              Search
            </button>

            {/* Search results dropdown */}
            {dropdownVisible && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-[60]">
                {searchResults!.slice(0, 6).map((result) => (
                  <button
                    key={result.slug}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleResultClick(result.slug)}
                    className="block w-full text-left px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
                  >
                    <p className="text-[12px] text-gray-700 truncate">{result.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-gray-400">{result.category}</span>
                      {result.cert && (
                        <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{result.cert}</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-3">
          {/* RFQ */}
          <Link href="/rfq" className="hidden rounded-md bg-[#ff6a00] px-4 py-[7px] text-[12px] font-semibold text-white hover:bg-[#e85e00] md:inline-block" style={{ animation: "rfqPulse 600ms ease 2s 1" }}>
            Request Quote
          </Link>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-1 md:hidden" aria-label="Menu">
            {mobileOpen ? (
              <svg className="h-5 w-5 text-[#333]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="h-5 w-5 text-[#333]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-[#e5e5e5] bg-white px-4 pb-3 md:hidden">
          <div className="flex py-2">
            <input type="text" value={query} onChange={(e) => handleInputChange(e.target.value)} onKeyDown={handleKeyDown} placeholder="Search..." className="h-[34px] w-full border border-[#d9d9d9] px-3 text-[13px] focus:outline-none" style={{ borderRadius: "2px 0 0 2px" }} />
            <button onClick={() => setShowDropdown(false)} className="h-[34px] bg-[#ff6a00] px-4 text-white" style={{ borderRadius: "0 2px 2px 0" }}>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
            </button>
          </div>
          <div className="space-y-0.5 border-t border-[#eee] pt-2">
            {categories.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`} onClick={() => setMobileOpen(false)} className="block py-1.5 text-[12px] text-[#333] hover:text-[#155e6b]">{c.name}</Link>
            ))}
          </div>
          <Link href="/rfq" onClick={() => setMobileOpen(false)} className="mt-2 block w-full bg-[#f97316] py-2 text-center text-[12px] font-semibold text-white">Request Quote</Link>
        </div>
      )}

      {/* Category nav bar */}
      <div className="border-t border-[#eee] bg-white">
        <div className="mx-auto max-w-[1400px] px-6">
          <nav className="flex gap-0 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {categories.map((c) => (
              <button
                key={c.slug}
                onClick={() => onCategorySelect?.(c.slug)}
                className={`flex-shrink-0 px-5 py-2.5 text-[13px] font-medium hover:text-[#155e6b] ${
                  activeCategory === c.slug
                    ? "font-semibold text-[#155e6b] border-b-2 border-[#155e6b]"
                    : "border-b-2 border-transparent text-[#555]"
                }`}
              >
                {c.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
