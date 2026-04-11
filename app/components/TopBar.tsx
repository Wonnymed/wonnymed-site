export default function TopBar() {
  return (
    <div className="w-full bg-[#1a1a1a]">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="flex items-center justify-between py-[5px] text-[11px] text-white/70">
          <div className="flex items-center gap-4">
            <span>Global Sourcing Platform</span>
            <span className="text-white/30">|</span>
            <span>Verified Suppliers</span>
            <span className="text-white/30">|</span>
            <span>Quality Inspection</span>
            <span className="text-white/30">|</span>
            <span>HQ Hong Kong</span>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <span>Trade Assurance</span>
            <span className="text-white/30">|</span>
            <span>Buyer Protection</span>
          </div>
        </div>
      </div>
    </div>
  );
}
