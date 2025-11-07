"use client";

import Header from "@/components/Header";
import RetroSidebar from "@/components/RetroSidebar";
import InfoSidebar from "@/components/InfoSidebar";
import { usePathname } from "next/navigation";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideHeader = pathname === "/guestbook";
  
  return (
    <>
      {/* Header spans full width at top */}
      {!hideHeader && <Header />}
      
      {/* Three-column layout below header */}
      <table className="retro-layout" style={{ marginTop: 0 }}>
        <tbody>
          <tr>
            <td className="left-sidebar">
              <RetroSidebar />
            </td>
            <td className="center-content">
              <main>{children}</main>
            </td>
            <td className="right-sidebar">
              <InfoSidebar />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
