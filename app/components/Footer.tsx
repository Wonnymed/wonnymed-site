import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#e0e0e0] bg-[#f7f8fa]">
      <div className="mx-auto max-w-[1400px] px-4 py-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-5">
          {/* About */}
          <div>
            <h4 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[#333]">About WonnyMed</h4>
            <ul className="space-y-1">
              {["Company Profile", "Why WonnyMed", "Quality Assurance", "Careers"].map((t) => (
                <li key={t}><span className="cursor-pointer text-[11px] text-[#777] hover:text-[#0d4f82]">{t}</span></li>
              ))}
            </ul>
          </div>
          {/* Categories */}
          <div>
            <h4 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[#333]">Product Categories</h4>
            <ul className="space-y-1">
              {[["Medical Devices", "medical-devices"], ["Consumables", "consumables"], ["Aesthetic Equipment", "aesthetic-equipment"], ["Dental", "dental"], ["Electronics", "electronics"], ["Rehabilitation", "rehabilitation"]].map(([t, s]) => (
                <li key={s}><Link href={`/category/${s}`} className="text-[11px] text-[#777] hover:text-[#0d4f82]">{t}</Link></li>
              ))}
            </ul>
          </div>
          {/* Services */}
          <div>
            <h4 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[#333]">Services</h4>
            <ul className="space-y-1">
              {["Global Sourcing", "Factory Inspection", "OEM / ODM", "Regulatory Support", "Logistics & Shipping", "Trade Assurance"].map((t) => (
                <li key={t}><span className="cursor-pointer text-[11px] text-[#777] hover:text-[#0d4f82]">{t}</span></li>
              ))}
            </ul>
          </div>
          {/* Support */}
          <div>
            <h4 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[#333]">Support</h4>
            <ul className="space-y-1">
              <li><Link href="/rfq" className="text-[11px] text-[#777] hover:text-[#0d4f82]">Request Quotation</Link></li>
              <li><Link href="/regulatory" className="text-[11px] text-[#777] hover:text-[#0d4f82]">Regulatory Guide</Link></li>
              {["FAQ", "Buyer Guide", "Dispute Resolution"].map((t) => (
                <li key={t}><span className="cursor-pointer text-[11px] text-[#777] hover:text-[#0d4f82]">{t}</span></li>
              ))}
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h4 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[#333]">Contact</h4>
            <ul className="space-y-1.5 text-[11px] text-[#777]">
              <li>sourcing@wonnymed.com</li>
              <li>WhatsApp: +1 (561) 596-6097</li>
              <li>HQ: Hong Kong SAR</li>
              <li>Operations: Guangzhou, China</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom bar */}
      <div className="border-t border-[#e0e0e0] bg-[#f0f1f3]">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-1 px-4 py-2.5 md:flex-row">
          <p className="text-[10px] text-[#aaa]">&copy; 2026 WonnyMed Ltd. Hong Kong SAR. All rights reserved.</p>
          <div className="flex gap-4 text-[10px] text-[#aaa]">
            <span className="cursor-pointer hover:text-[#666]">Terms of Service</span>
            <span className="cursor-pointer hover:text-[#666]">Privacy Policy</span>
            <span className="cursor-pointer hover:text-[#666]">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
