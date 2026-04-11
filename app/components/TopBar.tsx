export default function TopBar() {
  return (
    <div className="w-full bg-[#0f4a52]">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="flex items-center justify-between py-1.5 text-[11px] text-white/80">
          <div className="flex items-center gap-5">
            <span>Authorized Sourcing Platform for Latin America</span>
            <span className="text-white/20">&middot;</span>
            <span>Exclusive Manufacturer Partnerships</span>
            <span className="text-white/20">&middot;</span>
            <span className="hidden lg:inline">Quality Inspection</span>
            <span className="hidden lg:inline text-white/20">&middot;</span>
            <span className="hidden lg:inline">HQ Hong Kong</span>
          </div>
          <div className="hidden items-center gap-5 md:flex">
            <span>Pre-Shipment Inspection</span>
            <span className="text-white/20">&middot;</span>
            <span>Regulatory Compliance</span>
            <span className="hidden lg:inline text-white/20">&middot;</span>
            <span className="hidden lg:inline">Trade Assurance</span>
          </div>
        </div>
      </div>
    </div>
  );
}
