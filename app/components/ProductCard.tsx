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
      className="group block cursor-pointer border border-[#e8e8e8] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#155e6b] hover:shadow-lg"
      style={{ borderRadius: 2 }}
    >
      {/* Image area with badge */}
      <div className="relative overflow-hidden">
        <div className="transition-transform duration-200 group-hover:scale-105">
          <CategoryPlaceholder category={category} height={160} />
        </div>
        {/* Exclusive / Verified badge */}
        {exclusive ? (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-sm bg-gradient-to-r from-[#155e6b] to-[#1a7a8a] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M12 2L6 7v5c0 5.55 2.56 10.74 6 13 3.44-2.26 6-7.45 6-13V7l-6-5zm-1 15l-3.5-3.5 1.41-1.41L11 14.17l5.09-5.09L17.5 10.5 11 17z" /></svg>
            Exclusive LATAM Distributor
          </span>
        ) : (
          <span className="absolute left-2 top-2 rounded-sm border border-[#155e6b]/20 bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-[#155e6b]">
            Verified Supplier
          </span>
        )}
      </div>

      <div className="p-2">
        <h3 className="mb-1 line-clamp-2 h-[34px] text-[12px] font-semibold leading-[17px] text-[#333] group-hover:text-[#155e6b]">
          {longName || name}
        </h3>
        <p className="mb-1 text-[11px] text-[#999]">Min. Order: {moq}</p>
        {certifications.length > 0 && (
          <div className="mb-1 flex flex-wrap gap-[2px]">
            {certifications.slice(0, 3).map((c) => (
              <span key={c} className="border border-[#155e6b]/20 bg-[#155e6b]/5 px-1 py-px text-[9px] font-medium text-[#155e6b]" style={{ borderRadius: 1 }}>{c}</span>
            ))}
          </div>
        )}
        <div className="mb-1.5 flex items-center gap-1">
          <svg className="h-2.5 w-2.5 text-[#52c41a]" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" /></svg>
          <span className="text-[9px] text-[#999] group-hover:underline">Verified #{supplierCode}</span>
          {transactions && <span className="text-[9px] text-[#ccc]">· {transactions} deals</span>}
        </div>
        <div className="flex gap-2">
          <span className="block w-1/2 border border-[#155e6b] bg-white py-2 text-center text-xs font-semibold text-[#155e6b] transition-colors duration-150 group-hover:bg-[#155e6b] group-hover:text-white" style={{ borderRadius: 2 }}>
            Contact Supplier
          </span>
          <span className="block w-1/2 bg-[#ff6a00] py-2 text-center text-xs font-bold text-white transition-colors duration-150 hover:bg-[#e85e00]" style={{ borderRadius: 2 }}>
            Request Quote
          </span>
        </div>
      </div>
    </Link>
  );
}
