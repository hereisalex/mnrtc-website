import type { Metadata } from "next";
import "./globals.css";
import GeoCitiesMenuBar from "@/components/geocities/GeoCitiesMenuBar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Minnesota Retro Technology Club",
  description: "A user's group for retro/vintage computer and technology enthusiasts in the Twin Cities",
  keywords: ["retro computing", "vintage technology", "Minnesota", "Twin Cities", "computer club"],
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
        <GeoCitiesMenuBar />
        <main>
          {children}
        </main>
        <footer style={{ 
          position: 'fixed', 
          bottom: '20px', 
          left: '0', 
          right: '0',
          background: '#ffffff',
          border: '2px solid #000000',
          padding: '10px',
          margin: '0 20px',
          zIndex: 999
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: '10px',
              marginBottom: '10px'
            }}>
              <span style={{ fontSize: '10px', fontWeight: 'bold' }}>
                © 2025 Minnesota Retro Technology Club
              </span>
            </div>
            <div style={{ fontSize: '9px', color: '#666666', marginBottom: '8px' }}>
              Best viewed in Netscape Navigator 4.0 or Internet Explorer 4.0 • 
              <Link href="https://ana.hannahap.com/mnretrotech.org" style={{ color: '#0000ff', textDecoration: 'underline' }}>
                View Analytics
              </Link>
            </div>
            <div style={{ fontSize: '9px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
              <Link href="https://twincitiesgeek.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#0000ff', textDecoration: 'underline' }}>
                Twin Cities Geek
              </Link>
              <Link href="https://geekpartnership.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#0000ff', textDecoration: 'underline' }}>
                Geek Partnership Society
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
