export const metadata = {
  title: "Wonnymed — Global Medical Solutions",
  description: "Clinical supply with compliance and speed. RFQ-based, no public catalog.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}