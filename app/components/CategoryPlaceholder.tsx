import React from "react";

const CATEGORY_STYLES: Record<string, { bg: string; border: string; color: string }> = {
  "Medical Devices":       { bg: "#eff6ff", border: "#bfdbfe", color: "#3b82f6" },
  "Consumables":           { bg: "#ecfdf5", border: "#a7f3d0", color: "#10b981" },
  "Aesthetic Equipment":   { bg: "#faf5ff", border: "#e9d5ff", color: "#a855f7" },
  "Dental":                { bg: "#ecfeff", border: "#a5f3fc", color: "#06b6d4" },
  "Electronics":           { bg: "#fffbeb", border: "#fde68a", color: "#f59e0b" },
  "Beauty":                { bg: "#fdf2f8", border: "#fbcfe8", color: "#ec4899" },
  "Industrial":            { bg: "#f3f4f6", border: "#d1d5db", color: "#6b7280" },
  "Rehabilitation":        { bg: "#f0fdfa", border: "#99f6e4", color: "#14b8a6" },
};

const CATEGORY_ICONS: Record<string, React.ReactElement> = {
  "Medical Devices": (
    <svg width="48" height="48" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="14" y="8" width="28" height="36" rx="3" /><line x1="28" y1="16" x2="28" y2="28" /><line x1="22" y1="22" x2="34" y2="22" /><rect x="18" y="44" width="20" height="4" rx="1" /><line x1="24" y1="48" x2="24" y2="52" /><line x1="32" y1="48" x2="32" y2="52" />
    </svg>
  ),
  "Consumables": (
    <svg width="48" height="48" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 8L22 20C22 22 20 24 18 26L18 48C18 50 20 52 22 52L34 52C36 52 38 50 38 48L38 26C36 24 34 22 34 20L34 8" /><line x1="22" y1="8" x2="34" y2="8" /><line x1="22" y1="30" x2="34" y2="30" /><circle cx="28" cy="40" r="3" />
    </svg>
  ),
  "Aesthetic Equipment": (
    <svg width="48" height="48" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M28 8L28 18" /><path d="M28 18C22 18 16 24 16 32C16 40 22 46 28 48" /><path d="M28 18C34 18 40 24 40 32C40 40 34 46 28 48" /><circle cx="28" cy="32" r="6" /><path d="M24 32L32 32" /><path d="M28 28L28 36" />
    </svg>
  ),
  "Dental": (
    <svg width="48" height="48" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 12C16 12 12 16 12 22C12 28 16 30 18 36C20 42 20 48 22 48C24 48 24 42 28 38C32 42 32 48 34 48C36 48 36 42 38 36C40 30 44 28 44 22C44 16 40 12 36 12C32 12 30 14 28 16C26 14 24 12 20 12Z" />
    </svg>
  ),
  "Electronics": (
    <svg width="48" height="48" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="12" width="40" height="28" rx="2" /><line x1="8" y1="34" x2="48" y2="34" /><path d="M22 40L18 48" /><path d="M34 40L38 48" /><line x1="16" y1="48" x2="40" y2="48" /><circle cx="28" cy="24" r="1" fill="currentColor" /><path d="M16 20L22 26L26 22L32 28L36 24L40 28" />
    </svg>
  ),
  "Beauty": (
    <svg width="48" height="48" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 8L24 16C24 16 18 18 18 28L18 44C18 47 20 50 24 50L32 50C36 50 38 47 38 44L38 28C38 18 32 16 32 16L32 8" /><line x1="24" y1="8" x2="32" y2="8" /><line x1="18" y1="24" x2="38" y2="24" /><ellipse cx="28" cy="36" rx="5" ry="6" />
    </svg>
  ),
  "Industrial": (
    <svg width="48" height="48" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="28" cy="28" r="12" /><circle cx="28" cy="28" r="4" /><path d="M28 12V16" /><path d="M28 40V44" /><path d="M16.7 16.7L19.5 19.5" /><path d="M36.5 36.5L39.3 39.3" /><path d="M12 28H16" /><path d="M40 28H44" /><path d="M16.7 39.3L19.5 36.5" /><path d="M36.5 19.5L39.3 16.7" />
    </svg>
  ),
  "Rehabilitation": (
    <svg width="48" height="48" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="28" cy="14" r="6" /><path d="M20 28C20 24 23 22 28 22C33 22 36 24 36 28" /><path d="M20 28L20 40L16 48" /><path d="M36 28L36 40L40 48" /><rect x="22" y="28" width="12" height="16" rx="2" /><line x1="28" y1="32" x2="28" y2="38" /><line x1="25" y1="35" x2="31" y2="35" />
    </svg>
  ),
};

const DEFAULT_STYLE = { bg: "#f5f7fa", border: "#e5e7eb", color: "#9ca3af" };

export default function CategoryPlaceholder({ category, height = 160 }: { category: string; height?: number }) {
  const style = CATEGORY_STYLES[category] || DEFAULT_STYLE;
  const icon = CATEGORY_ICONS[category];

  return (
    <div
      className="flex flex-col items-center justify-center gap-1.5"
      style={{ height, background: style.bg, borderBottom: `1px solid ${style.border}`, color: style.color }}
    >
      {icon || (
        <svg width="48" height="48" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="12" y="8" width="32" height="40" rx="3" /><line x1="20" y1="18" x2="36" y2="18" /><line x1="20" y1="26" x2="36" y2="26" /><line x1="20" y1="34" x2="28" y2="34" />
        </svg>
      )}
      <span className="text-[10px] text-gray-300">Photo available upon request</span>
    </div>
  );
}
