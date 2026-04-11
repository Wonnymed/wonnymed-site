"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import HowItWorks from "./components/HowItWorks";
import { products } from "./data/products";
import { categories } from "./data/categories";

export default function Home() {
  const [lang, setLang] = useState<string>("en");
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sort, setSort] = useState("relevance");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce: when searchQuery changes, wait 300ms then update the search filter
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearch(searchQuery);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchQuery]);

  const handleSearchInput = useCallback((q: string) => {
    setSearchQuery(q);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setSearch("");
  }, []);

  const categoryList = categories.map((c) => ({
    slug: c.slug,
    name: c.name[lang] || c.name.en,
  }));

  const toggleCategory = useCallback((slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }, []);

  const toggleCert = useCallback((cert: string) => {
    setSelectedCerts((prev) =>
      prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert]
    );
  }, []);

  // Compute search results for the dropdown (instant, no debounce)
  const searchResults = useMemo(() => {
    if (searchQuery.length < 2) return [];
    const q = searchQuery.toLowerCase();
    const matches = products.filter(
      (p) =>
        (p.name[lang] || p.name.en).toLowerCase().includes(q) ||
        (p.longName?.en || "").toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.certs.some((c) => c.toLowerCase().includes(q))
    );
    return matches.slice(0, 6).map((p) => ({
      slug: p.slug,
      name: p.name[lang] || p.name.en,
      category: p.category,
      cert: p.certs[0] || "",
    }));
  }, [searchQuery, lang]);

  const filtered = useMemo(() => {
    let result = products;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          (p.name[lang] || p.name.en).toLowerCase().includes(q) ||
          (p.longName?.en || "").toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q)
      );
    }
    if (selectedCategories.length > 0) {
      const slugSet = new Set(selectedCategories);
      result = result.filter((p) => {
        const catSlug = p.category.toLowerCase().replace(/\s+/g, "-");
        return slugSet.has(catSlug);
      });
    }
    if (selectedCerts.length > 0) {
      result = result.filter((p) =>
        selectedCerts.some((cert) => p.certs.includes(cert))
      );
    }
    if (sort === "moq-asc" || sort === "moq-desc") {
      const parseMoq = (m: string) => parseInt(m.replace(/[^0-9]/g, "")) || 0;
      result = [...result].sort((a, b) => sort === "moq-asc" ? parseMoq(a.moq) - parseMoq(b.moq) : parseMoq(b.moq) - parseMoq(a.moq));
    } else if (sort === "verified") {
      result = [...result].sort((a, b) => (b.transactions || 0) - (a.transactions || 0));
    }
    return result;
  }, [search, selectedCategories, selectedCerts, verifiedOnly, lang, sort]);

  // Compute product counts per category (considering search filter)
  const productCounts = useMemo(() => {
    let base = products;
    if (search) {
      const q = search.toLowerCase();
      base = base.filter(
        (p) =>
          (p.name[lang] || p.name.en).toLowerCase().includes(q) ||
          (p.longName?.en || "").toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q)
      );
    }
    const counts: Record<string, number> = {};
    for (const p of base) {
      const catSlug = p.category.toLowerCase().replace(/\s+/g, "-");
      counts[catSlug] = (counts[catSlug] || 0) + 1;
    }
    return counts;
  }, [search, lang]);

  // Compute cert counts
  const certCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of products) {
      for (const cert of p.certs) {
        counts[cert] = (counts[cert] || 0) + 1;
      }
    }
    return counts;
  }, []);

  // Active category for header nav sync
  const activeCategory = selectedCategories.length === 1 ? selectedCategories[0] : undefined;

  // Handler for category nav in header
  const handleCategorySelect = useCallback((slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }, []);

  // Handler for clicking a search result: scroll to card and highlight
  const handleResultClick = useCallback((slug: string) => {
    const el = document.querySelector(`a[href="/product/${slug}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ring-2", "ring-[#155e6b]/30");
      setTimeout(() => {
        el.classList.remove("ring-2", "ring-[#155e6b]/30");
      }, 1500);
    }
  }, []);

  const sidebarProps = {
    categories: categoryList,
    selectedCategories,
    onCategoryChange: toggleCategory,
    verifiedOnly,
    onVerifiedChange: setVerifiedOnly,
    selectedCertifications: selectedCerts,
    onCertificationChange: toggleCert,
    productCounts,
    certCounts,
  };

  return (
    <>
      <TopBar />
      <Header
        categories={categoryList}
        lang={lang}
        onLangChange={setLang}
        onSearch={handleSearchInput}
        activeCategory={activeCategory}
        onCategorySelect={handleCategorySelect}
        searchQuery={searchQuery}
        searchResults={searchResults}
        onResultClick={handleResultClick}
      />

      <main className="mx-auto max-w-[1400px] px-4 py-3">
        <div className="flex gap-4">
          {/* Sidebar */}
          <aside className="hidden w-[220px] flex-shrink-0 lg:block">
            <Sidebar {...sidebarProps} />
          </aside>

          <div className="flex-1 min-w-0">
            {/* Mobile filters */}
            <div className="mb-2 lg:hidden">
              <Sidebar {...sidebarProps} />
            </div>

            {/* RFQ Banner */}
            <div className="mb-4 flex items-center justify-between rounded border border-orange-100 bg-[#fdf8f0] px-4 py-2.5">
              <div>
                <p className="text-[12px] font-semibold text-gray-700">Can&apos;t find the right product?</p>
                <p className="text-[11px] text-gray-400">Submit an RFQ and let verified suppliers quote you directly.</p>
              </div>
              <Link href="/rfq" className="flex-shrink-0 rounded bg-[#f97316] px-3.5 py-[5px] text-[11px] font-semibold text-white hover:bg-[#ea6c0e]">
                Request for Quotation
              </Link>
            </div>

            {/* Results bar */}
            <div className="mb-3 flex items-center justify-between border-b border-gray-200 py-2">
              <p className="text-[13px] text-gray-500">
                <span className="font-semibold text-gray-800">{filtered.length}</span>{" "}
                {search
                  ? <>products found for &apos;{search}&apos;</>
                  : <>products found</>
                }
                {search && (
                  <button onClick={handleClearSearch} className="ml-3 text-xs text-[#155e6b] hover:underline">Clear search</button>
                )}
              </p>
              <div className="flex items-center">
                <span className="mr-2 text-xs text-gray-500">Sort by:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="rounded border border-gray-300 px-2 py-1 text-xs text-[#333] focus:border-[#155e6b] focus:outline-none"
                >
                  <option value="relevance">Relevance</option>
                  <option value="moq-asc">MOQ: Low to High</option>
                  <option value="moq-desc">MOQ: High to Low</option>
                  <option value="verified">Most Verified</option>
                </select>
              </div>
            </div>

            {/* Filter tags */}
            {(selectedCategories.length > 0 || selectedCerts.length > 0 || search) && (
              <div className="mb-3 flex flex-wrap items-center gap-1.5">
                {search && (
                  <span
                    onClick={handleClearSearch}
                    className="bg-gray-100 text-gray-600 text-[11px] px-2 py-0.5 rounded-full inline-flex items-center gap-1 cursor-pointer hover:bg-gray-200"
                  >
                    Search: &apos;{search}&apos; <span className="text-gray-400">&#10005;</span>
                  </span>
                )}
                {selectedCategories.map((slug) => {
                  const cat = categoryList.find((c) => c.slug === slug);
                  return (
                    <span
                      key={slug}
                      onClick={() => toggleCategory(slug)}
                      className="bg-gray-100 text-gray-600 text-[11px] px-2 py-0.5 rounded-full inline-flex items-center gap-1 cursor-pointer hover:bg-gray-200"
                    >
                      {cat?.name || slug} <span className="text-gray-400">&#10005;</span>
                    </span>
                  );
                })}
                {selectedCerts.map((cert) => (
                  <span
                    key={cert}
                    onClick={() => toggleCert(cert)}
                    className="bg-gray-100 text-gray-600 text-[11px] px-2 py-0.5 rounded-full inline-flex items-center gap-1 cursor-pointer hover:bg-gray-200"
                  >
                    {cert} <span className="text-gray-400">&#10005;</span>
                  </span>
                ))}
                {(selectedCategories.length + selectedCerts.length + (search ? 1 : 0)) >= 2 && (
                  <button
                    onClick={() => { setSelectedCategories([]); setSelectedCerts([]); handleClearSearch(); }}
                    className="text-[11px] text-[#155e6b] hover:underline ml-2"
                  >
                    Clear all
                  </button>
                )}
              </div>
            )}

            {/* Product grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {filtered.map((product) => (
                  <ProductCard
                    key={product.slug}
                    slug={product.slug}
                    name={product.name[lang] || product.name.en}
                    longName={product.longName?.en}
                    category={product.category}
                    moq={product.moq}
                    certifications={product.certs}
                    supplierCode={product.supplierId}

                    transactions={product.transactions}
                    exclusive={product.exclusive}
                    image={product.image}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mb-3 h-10 w-10 text-[#ccc]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <p className="text-[14px] font-medium text-[#666]">No products found</p>
                <p className="mt-1 text-[12px] text-[#999]">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <HowItWorks />
      <Footer />
      <ChatWidget />
    </>
  );
}
