"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import { products } from "./data/products";
import { categories } from "./data/categories";

export default function Home() {
  const [lang, setLang] = useState<string>("en");
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sort, setSort] = useState("relevance");

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

  const recommended = products.slice(0, 8);

  const sidebarProps = {
    categories: categoryList,
    selectedCategories,
    onCategoryChange: toggleCategory,
    verifiedOnly,
    onVerifiedChange: setVerifiedOnly,
    selectedCertifications: selectedCerts,
    onCertificationChange: toggleCert,
  };

  return (
    <>
      <TopBar />
      <Header categories={categoryList} lang={lang} onLangChange={setLang} onSearch={setSearch} />

      <main className="mx-auto max-w-[1400px] px-4 py-3">
        <div className="flex gap-4">
          {/* Sidebar */}
          <aside className="hidden w-[200px] flex-shrink-0 lg:block">
            <Sidebar {...sidebarProps} />
          </aside>

          <div className="flex-1 min-w-0">
            {/* Mobile filters */}
            <div className="mb-2 lg:hidden">
              <Sidebar {...sidebarProps} />
            </div>

            {/* Recommended section */}
            {!search && selectedCategories.length === 0 && (
              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-[14px] font-bold text-[#333]">Recommended For You</h2>
                  <Link href="/rfq" className="text-[12px] text-[#0d4f82] hover:underline">View all →</Link>
                </div>
                <div className="grid grid-cols-2 gap-[12px] sm:grid-cols-3 lg:grid-cols-4">
                  {recommended.map((p) => (
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
                      image={p.image}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* RFQ Banner */}
            <div className="mb-4 flex items-center justify-between border border-[#e0e0e0] bg-[#fdf8f0] px-4 py-3" style={{ borderRadius: 2 }}>
              <div>
                <p className="text-[13px] font-semibold text-[#333]">Can&apos;t find the right product?</p>
                <p className="text-[11px] text-[#888]">Submit an RFQ and let verified suppliers quote you directly.</p>
              </div>
              <Link href="/rfq" className="flex-shrink-0 bg-[#f97316] px-4 py-[6px] text-[12px] font-semibold text-white hover:bg-[#ea6c0e]" style={{ borderRadius: 2 }}>
                Request for Quotation
              </Link>
            </div>

            {/* Results bar */}
            <div className="mb-3 flex items-center justify-between border-b border-gray-200 py-2">
              <p className="text-sm text-gray-600">
                <strong>{filtered.length}</strong> products found
                {search && (
                  <button onClick={() => setSearch("")} className="ml-3 text-xs text-[#0d4f82] hover:underline">Clear search</button>
                )}
              </p>
              <div className="flex items-center">
                <span className="mr-2 text-xs text-gray-500">Sort by:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="rounded border border-gray-300 px-2 py-1 text-xs text-[#333] focus:border-[#0d4f82] focus:outline-none"
                >
                  <option value="relevance">Relevance</option>
                  <option value="moq-asc">MOQ: Low to High</option>
                  <option value="moq-desc">MOQ: High to Low</option>
                  <option value="verified">Most Verified</option>
                </select>
              </div>
            </div>

            {/* Product grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 gap-[12px] sm:grid-cols-3 lg:grid-cols-4">
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

      <Footer />
      <ChatWidget />
    </>
  );
}
