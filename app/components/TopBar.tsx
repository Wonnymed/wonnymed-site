"use client";

interface TopBarProps {
  lang: string;
  onLangChange: (lang: string) => void;
}

export default function TopBar({ lang, onLangChange }: TopBarProps) {
  return (
    <div className="w-full bg-[#0f4a52]" style={{ height: 28 }}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6" style={{ height: 28 }}>
        <span className="text-[11px] text-white/60">WonnyMed Ltd — Hong Kong</span>
        <div className="flex items-center text-[11px]">
          {(["en", "pt", "es"] as const).map((code, i) => (
            <span key={code}>
              {i > 0 && <span className="mx-1.5 text-white/20">|</span>}
              <button
                onClick={() => onLangChange(code)}
                className={code === lang ? "font-semibold text-white" : "text-white/50 hover:text-white"}
              >
                {code.toUpperCase()}
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
