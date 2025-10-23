import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import RetroSidebar from "@/components/RetroSidebar";
import InfoSidebar from "@/components/InfoSidebar";

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

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <Header />

        {/* Three-Column Layout */}
        <table className="retro-layout">
          <tbody>
            <tr>
              <td className="left-sidebar">
                <RetroSidebar />
              </td>
              <td className="center-content">
                <main>
                  {children}
                </main>
              </td>
              <td className="right-sidebar">
                <InfoSidebar />
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}

RootLayout.displayName = 'RootLayout';

export default RootLayout;
