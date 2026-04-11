export default function TopBar() {
  return (
    <div className="w-full bg-[#0f4a52]">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="flex items-center justify-between py-[5px] text-[11px] text-white/80">
          <div className="flex items-center gap-4">
            <span>Authorized Sourcing Platform for Latin America</span>
            <span className="text-white/30">|</span>
            <span>Exclusive Manufacturer Partnerships</span>
            <span className="text-white/30">|</span>
            <span>Quality Inspection</span>
            <span className="text-white/30">|</span>
            <span>HQ Hong Kong</span>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <span>Pre-Shipment Inspection</span>
            <span className="text-white/30">|</span>
            <span>Regulatory Compliance</span>
            <span className="text-white/30">|</span>
            <span>Trade Assurance</span>
          </div>
        </div>
      </div>
    </div>
  );
}
