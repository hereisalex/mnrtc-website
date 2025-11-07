import type { Metadata } from "next";
import "./globals.css";
import { SupabaseProvider } from "@/components/providers/SupabaseProvider";
import { PageViewTracker } from "@/components/telemetry/PageViewTracker";
import { TelemetryErrorBoundary } from "@/components/telemetry/ErrorBoundary";

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

async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // For static export, we can't use server-side Supabase client
  // The SupabaseProvider will handle session initialization client-side
  const initialSession = null;

  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <SupabaseProvider initialSession={initialSession}>
          <TelemetryErrorBoundary>
            <PageViewTracker />
            {children}
          </TelemetryErrorBoundary>
        </SupabaseProvider>
      </body>
    </html>
  );
}

RootLayout.displayName = 'RootLayout';

export default RootLayout;
