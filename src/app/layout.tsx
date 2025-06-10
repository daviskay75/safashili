import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Safa Shili - Psychologue Rosny-sous-Bois",
  description: "Cabinet de psychologie clinique spécialisé en violence conjugale et psychotraumatologie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}