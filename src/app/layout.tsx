import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Safa Shili - Psychologue Rosny-sous-Bois",
  description: "Cabinet de psychologie clinique spécialisé en violence conjugale et psychotraumatologie",
  icons: {
    icon: [
      {
        url: "/favicon.ico?v=2",
        type: "image/x-icon",
        sizes: "16x16 32x32",
      },
      {
        url: "/icon.svg?v=2",
        type: "image/svg+xml",
        sizes: "any",
      },
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='15' fill='%233b82f6'/><g fill='white'><path d='M8 10 C8 6, 12 4, 16 4 C20 4, 24 6, 24 10 C24 14, 22 16, 22 18 L22 22 C22 24, 20 26, 16 26 C12 26, 10 24, 10 22 L10 18 C10 16, 8 14, 8 10 Z'/><path d='M12 12 C11 10, 9 10, 9 13 C9 15, 12 17, 16 20 C20 17, 23 15, 23 13 C23 10, 21 10, 20 12 C19 11, 18 11, 16 12 C14 11, 13 11, 12 12 Z'/><circle cx='12' cy='8' r='1'/><circle cx='20' cy='8' r='1'/><circle cx='16' cy='6' r='0.8'/></g></svg>",
        type: "image/svg+xml",
      }
    ],
    shortcut: "/favicon.ico?v=2",
    apple: "/icon-192.svg?v=2",
  },
  manifest: "/manifest.json",
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