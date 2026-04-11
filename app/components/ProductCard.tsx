import Link from "next/link";

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
      {/* Image */}
      <div className="flex h-[160px] items-center justify-center bg-[#f5f7fa]">
        <svg className="h-9 w-9 text-[#d4d4d4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.7}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      </div>
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
