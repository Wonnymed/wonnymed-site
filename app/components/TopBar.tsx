"use client";

const LANGS = [
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
  { code: "es", label: "ES" },
];

interface TopBarProps {
  lang: string;
  onLangChange: (lang: string) => void;
}

export default function TopBar({ lang, onLangChange }: TopBarProps) {
  return (
    <div className="w-full bg-[#0f4a52]" style={{ height: 28 }}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6" style={{ height: 28 }}>
        <span className="text-[11px] text-white/60">WonnyMed Ltd — Hong Kong</span>
        <div className="flex items-center gap-0 text-[11px]">
          <span className="text-white/50 hover:text-white cursor-pointer">Trade Assurance</span>
          <span className="mx-2 text-white/20">|</span>
          <span className="text-white/50 hover:text-white cursor-pointer">Help Center</span>
          <span className="mx-2 text-white/20">|</span>
          <div className="flex items-center gap-0">
            {LANGS.map((l, i) => (
              <span key={l.code}>
                {i > 0 && <span className="mx-1 text-white/20">|</span>}
                <button
                  onClick={() => onLangChange(l.code)}
                  className={`${l.code === lang ? "font-semibold text-white" : "text-white/50 hover:text-white"}`}
                >
                  {l.label}
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
