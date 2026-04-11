"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import TopBar from "@/app/components/TopBar";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import ProductCard from "@/app/components/ProductCard";
import Footer from "@/app/components/Footer";
import ChatWidget from "@/app/components/ChatWidget";
import { products } from "@/app/data/products";
import { categories } from "@/app/data/categories";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [lang, setLang] = useState("en");
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);

  // Find the current category
  const category = categories.find((c) => c.slug === slug);
  const categoryDisplayName = category
    ? category.name[lang] || category.name.en
    : slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // Map category slug to the display name used in products
  const categoryEnName = category?.name.en || "";

  // Header needs categories with string name
  const headerCategories = categories.map((c) => ({
    slug: c.slug,
    name: c.name[lang] || c.name.en,
    icon: c.icon,
  }));

  // Sidebar categories
  const sidebarCategories = categories.map((c) => ({
    slug: c.slug,
    name: c.name[lang] || c.name.en,
  }));

  // Filter products for this category
  const filteredProducts = useMemo(() => {
    let result = products.filter(
      (p) => p.category.toLowerCase().replace(/\s+/g, "-") === slug ||
             p.category === categoryEnName
    );

    // Apply search filter
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          (p.name[lang] || p.name.en).toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q)
      );
    }

    // Apply sidebar category filter (cross-filter within page results)
    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.some(
          (catSlug) =>
            p.category.toLowerCase().replace(/\s+/g, "-") === catSlug ||
            categories.find((c) => c.slug === catSlug)?.name.en === p.category
        )
      );
    }

    // Verified only — all products on WonnyMed are verified, but keep the toggle functional
    if (verifiedOnly) {
      result = result.filter((p) => p.supplierId.startsWith("W-"));
    }

    // Certification filter
    if (selectedCertifications.length > 0) {
      result = result.filter((p) =>
        selectedCertifications.every((cert) =>
          p.certs.some((c) => c.toUpperCase().includes(cert.toUpperCase()))
        )
      );
    }

    return result;
  }, [slug, categoryEnName, search, lang, selectedCategories, verifiedOnly, selectedCertifications]);

  function handleCategoryChange(catSlug: string) {
    setSelectedCategories((prev) =>
      prev.includes(catSlug)
        ? prev.filter((s) => s !== catSlug)
        : [...prev, catSlug]
    );
  }

  function handleCertificationChange(cert: string) {
    setSelectedCertifications((prev) =>
      prev.includes(cert)
        ? prev.filter((c) => c !== cert)
        : [...prev, cert]
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <TopBar />
      <Header
        categories={headerCategories}
        lang={lang}
        onLangChange={setLang}
        onSearch={setSearch}
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <span className="font-medium text-slate-800">
            {categoryDisplayName}
          </span>
        </nav>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            {categoryDisplayName}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"} found
          </p>
        </div>

        {/* Sidebar + Grid Layout */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar */}
          <Sidebar
            categories={sidebarCategories}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
            verifiedOnly={verifiedOnly}
            onVerifiedChange={setVerifiedOnly}
            selectedCertifications={selectedCertifications}
            onCertificationChange={handleCertificationChange}
          />

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {filteredProducts.map((p) => (
                  <ProductCard
                    key={p.slug}
                    slug={p.slug}
                    name={p.name[lang] || p.name.en}
                    category={p.category}
                    moq={p.moq}
                    certifications={p.certs}
                    supplierCode={p.supplierId}
                    exclusive={p.exclusive}
                    image={p.image}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white py-16">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-4 h-16 w-16 text-slate-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
                <h3 className="mb-1 text-lg font-semibold text-slate-700">
                  No Products Found
                </h3>
                <p className="mb-6 max-w-sm text-center text-sm text-slate-500">
                  There are no products in this category yet. Try adjusting your
                  filters or browse other categories.
                </p>
                <Link
                  href="/"
                  className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
                >
                  Browse All Products
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
