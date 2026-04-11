import Link from "next/link";

const STEPS = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#155e6b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 4L6 10v10c0 8.5 6 15.5 14 18 8-2.5 14-9.5 14-18V10L20 4z" />
        <path d="M14 20l4 4 8-8" />
      </svg>
    ),
    title: "Exclusive Partnerships",
    text: "Direct agreements with manufacturers. We are their authorized channel for Latin America — not a marketplace listing.",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#155e6b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="20" r="14" />
        <ellipse cx="20" cy="20" rx="14" ry="6" />
        <line x1="20" y1="6" x2="20" y2="34" />
        <circle cx="10" cy="12" r="2" fill="#155e6b" stroke="none" />
        <circle cx="30" cy="28" r="2" fill="#155e6b" stroke="none" />
        <circle cx="28" cy="14" r="2" fill="#155e6b" stroke="none" />
      </svg>
    ),
    title: "Regulatory Intelligence",
    text: "ANVISA, FDA, CE, INVIMA, ANMAT, COFEPRIS — we prepare compliance documentation before you even ask.",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#155e6b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="10" />
        <line x1="25" y1="25" x2="35" y2="35" />
        <rect x="12" y="14" width="12" height="2" rx="0.5" />
        <rect x="12" y="18" width="8" height="2" rx="0.5" />
        <rect x="12" y="22" width="10" height="2" rx="0.5" />
      </svg>
    ),
    title: "Factory-Verified Quality",
    text: "Every supplier is audited on-site. Pre-shipment inspection standard on all orders. No exceptions.",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#155e6b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="8" width="24" height="20" rx="2" />
        <path d="M8 16h24" />
        <circle cx="20" cy="22" r="3" />
        <path d="M17 22h-3m9 0h3" />
        <path d="M14 32l2-4h8l2 4" />
      </svg>
    ),
    title: "Secured Trade Terms",
    text: "30/70 structured payments with escrow protection. The manufacturer gets paid when you confirm quality.",
  },
];

export default function HowItWorks() {
  return (
    <section className="border-t border-gray-200 bg-white px-6 py-12">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">Your Authorized Import Channel</h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-gray-500">
          WonnyMed operates as the exclusive regional bridge between verified Asian manufacturers and Latin American buyers.
        </p>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.title} className="text-center">
              <div className="mx-auto mb-3 flex h-[40px] w-[40px] items-center justify-center">{step.icon}</div>
              <h3 className="mt-3 text-sm font-bold text-gray-900">{step.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-gray-500">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/rfq"
            className="inline-block rounded-lg bg-[#ff6a00] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#e85e00]"
          >
            Start Your Sourcing Request →
          </Link>
        </div>
      </div>
    </section>
  );
}
