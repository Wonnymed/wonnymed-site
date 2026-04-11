import Link from "next/link";
import CategoryPlaceholder from "./CategoryPlaceholder";

interface ProductCardProps {
  slug: string;
  name: string;
  longName?: string;
  category: string;
  moq: string;
  certifications: string[];
  supplierCode: string;
  transactions?: number;
  exclusive?: boolean;
  image?: string;
}

export default function ProductCard({ slug, name, longName, category, moq, certifications, supplierCode, transactions, exclusive }: ProductCardProps) {
  return (
    <Link
      href={`/product/${slug}`}
      className="group block cursor-pointer border border-gray-100 rounded-lg bg-white transition-all duration-150 hover:border-gray-200 hover:shadow-sm"
    >
      {/* Image area with badge */}
      <div className="relative overflow-hidden">
        <CategoryPlaceholder category={category} height={160} />
        {/* Exclusive / Verified badge */}
        {exclusive ? (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 bg-[#155e6b] text-white px-1.5 py-0.5 rounded-[3px] text-[9px] font-semibold uppercase tracking-wider">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="white"><path d="M12 2L6 7v5c0 5.55 2.56 10.74 6 13 3.44-2.26 6-7.45 6-13V7l-6-5zm-1 15l-3.5-3.5 1.41-1.41L11 14.17l5.09-5.09L17.5 10.5 11 17z" /></svg>
            Exclusive LATAM Distributor
          </span>
        ) : (
          <span className="absolute left-2 top-2 text-[9px] text-gray-500 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded-[3px]">
            Verified Supplier
          </span>
        )}
      </div>

      <div className="p-3">
        <h3 className="mb-1 line-clamp-2 text-[13px] font-medium leading-snug text-gray-800 group-hover:text-[#155e6b]">
          {longName || name}
        </h3>
        <p className="mb-1 text-[11px] text-gray-400">Min. Order: {moq}</p>
        {certifications.length > 0 && (
          <div className="mb-1 flex flex-wrap gap-[2px]">
            {certifications.slice(0, 3).map((c) => (
              <span key={c} className="text-[9px] font-medium text-gray-500 bg-gray-50 border border-gray-200 px-1.5 py-[1px] rounded-[2px]">{c}</span>
            ))}
          </div>
        )}
        <div className="mb-1.5 flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block"></span>
          <span className="text-[11px] text-gray-400">Verified #{supplierCode}</span>
          {transactions && <span className="text-[9px] text-[#ccc]">&middot; {transactions} deals</span>}
        </div>
        <div className="flex gap-1.5">
          <span className="block w-1/2 text-[11px] py-1.5 rounded-md text-center text-gray-600 border border-gray-200 bg-white hover:border-[#155e6b] hover:text-[#155e6b] transition-colors duration-150">
            Contact Supplier
          </span>
          <span className="block w-1/2 text-[11px] py-1.5 rounded-md text-center bg-[#ff6a00] text-white hover:bg-[#e85e00] transition-colors duration-150">
            Request Quote
          </span>
        </div>
      </div>
    </Link>
  );
}
