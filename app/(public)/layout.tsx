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
      <table className="retro-layout">
        <tbody>
          <tr>
            <td className="left-sidebar">
              <RetroSidebar />
            </td>
            <td className="center-content" colSpan={hideHeader ? 1 : 1}>
              {!hideHeader && (
                <div style={{ marginBottom: '20px' }}>
                  <Header />
                </div>
              )}
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
