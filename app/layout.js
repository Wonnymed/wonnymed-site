// === app/layout.js (fixed, imports global CSS once) ===
import "../styles/globals.css";

export const metadata = {
  title: "Wonnymed",
  description: "Clinical supply with compliance and speed. HQ Hong Kong.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
