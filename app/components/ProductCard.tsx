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
  image?: string;
}

export default function ProductCard({ slug, name, longName, category, moq, certifications, supplierCode, transactions }: ProductCardProps) {
  return (
    <Link href={`/product/${slug}`} className="group block border border-[#e8e8e8] bg-white hover:shadow-[0_1px_4px_rgba(0,0,0,0.08)]" style={{ borderRadius: 2 }}>
      <CategoryPlaceholder category={category} height={160} />
      <div className="p-2">
        <h3 className="mb-1 line-clamp-2 h-[34px] text-[12px] font-semibold leading-[17px] text-[#333] group-hover:text-[#0d4f82]">
          {longName || name}
        </h3>
        <p className="mb-1 text-[11px] text-[#999]">Min. Order: {moq}</p>
        {certifications.length > 0 && (
          <div className="mb-1 flex flex-wrap gap-[2px]">
            {certifications.slice(0, 3).map((c) => (
              <span key={c} className="border border-[#e0e0e0] px-1 py-px text-[9px] font-medium text-[#888]" style={{ borderRadius: 1 }}>{c}</span>
            ))}
          </div>
        )}
        <div className="mb-1.5 flex items-center gap-1">
          <svg className="h-2.5 w-2.5 text-[#52c41a]" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" /></svg>
          <span className="text-[9px] text-[#999]">Verified #{supplierCode}</span>
          {transactions && <span className="text-[9px] text-[#ccc]">· {transactions} deals</span>}
        </div>
        <span className="block w-full border border-[#0d4f82] py-[4px] text-center text-[11px] font-medium text-[#0d4f82] group-hover:bg-[#0d4f82] group-hover:text-white" style={{ borderRadius: 2 }}>
          Contact Supplier
        </span>
      </div>
    </Link>
  );
}
