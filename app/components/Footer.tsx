import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0f4a52]">
      <div className="mx-auto max-w-[1400px] px-4 py-10">
        <div className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-3 lg:grid-cols-5">
          {/* Column 1 — About */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="mb-3 text-sm font-semibold text-white">About WonnyMed</h4>
            <p className="mb-3 text-xs leading-relaxed text-gray-400">
              WonnyMed Ltd is a Hong Kong-registered sourcing company helping Latin American businesses import directly from verified factories in China and South Korea. We handle sourcing, negotiation, quality inspection, regulatory documentation, and shipping.
            </p>
            <p className="text-[10px] leading-relaxed text-gray-500">
              HQ Hong Kong | Sourcing: Shanghai · Guangzhou · Suzhou · Seoul
            </p>
          </div>

          {/* Column 2 — Product Categories */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Product Categories</h4>
            <ul className="space-y-1.5">
              {[
                ["Medical Devices", "medical-devices"],
                ["Consumables", "consumables"],
                ["Aesthetic Equipment", "aesthetic-equipment"],
                ["Dental", "dental"],
                ["Electronics", "electronics"],
                ["Beauty", "beauty"],
                ["Industrial", "industrial"],
                ["Rehabilitation", "rehabilitation"],
              ].map(([label, slug]) => (
                <li key={slug}>
                  <Link href={`/category/${slug}`} className="text-xs text-gray-400 transition-colors hover:text-white">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Trade Services */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Trade Services</h4>
            <ul className="space-y-1.5">
              {["Sourcing & Procurement", "Quality Inspection", "Regulatory Compliance", "Shipping & Logistics", "Trade Assurance", "Payment Protection"].map((t) => (
                <li key={t}><span className="cursor-pointer text-xs text-gray-400 transition-colors hover:text-white">{t}</span></li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Regulatory */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Regulatory</h4>
            <ul className="space-y-1.5">
              {[
                "ANVISA (Brazil)",
                "FDA 510(k) (USA)",
                "CE Marking (EU)",
                "INVIMA (Colombia)",
                "ANMAT (Argentina)",
                "COFEPRIS (Mexico)",
                "SFDA (Saudi Arabia)",
              ].map((t) => (
                <li key={t}>
                  <Link href="/regulatory" className="text-xs text-gray-400 transition-colors hover:text-white">{t}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 — Contact */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Contact</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <span className="mb-0.5 block text-[10px] uppercase tracking-wider text-gray-500">Email</span>
                contact@wonnymed.com
              </li>
              <li>
                <span className="mb-0.5 block text-[10px] uppercase tracking-wider text-gray-500">WeChat</span>
                WonnyMed
              </li>
              <li>
                <span className="mb-0.5 block text-[10px] uppercase tracking-wider text-gray-500">WhatsApp</span>
                <a href="https://wa.me/15615966097" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Available →</a>
              </li>
              <li>
                <span className="mb-0.5 block text-[10px] uppercase tracking-wider text-gray-500">Business Hours</span>
                Mon–Fri 9:00–18:00 HKT
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#0a3a40]">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-2 px-4 py-3 md:flex-row">
          <p className="text-xs text-gray-500">
            &copy; 2026 WonnyMed Ltd. Authorized Regional Distribution Network for Latin America. Registered in Hong Kong SAR.
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <span className="cursor-pointer transition-colors hover:text-gray-300">Trade Assurance</span>
            <span className="text-gray-700">|</span>
            <span className="cursor-pointer transition-colors hover:text-gray-300">Buyer Protection</span>
            <span className="text-gray-700">|</span>
            <span className="cursor-pointer transition-colors hover:text-gray-300">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
