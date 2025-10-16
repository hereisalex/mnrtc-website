import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Minnesota Retro Technology Club",
  description: "A user's group for retro/vintage computer and technology enthusiasts in the Twin Cities",
  keywords: ["retro computing", "vintage technology", "Minnesota", "Twin Cities", "computer club"],
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    title: "Minnesota Retro Technology Club",
    description: "A user's group for retro/vintage computer and technology enthusiasts in the Twin Cities",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
