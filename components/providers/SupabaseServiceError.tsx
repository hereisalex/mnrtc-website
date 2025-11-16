'use client';

import MacWindow from '@/components/mac-ui/MacWindow';

export function SupabaseServiceError() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <MacWindow title="Supabase Service Unavailable" width="100%">
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-5xl mb-4">🛜</div>
            <h1 className="text-2xl font-chicago mb-2 text-mac-black">
              Unable to connect to Supabase
            </h1>
            <p className="font-geneva text-mac-gray-dark">
              Your environment variables appear to be set, but the Supabase client could not be initialized.
            </p>
          </div>

          <div className="bg-mac-platinum-dark border-2 border-mac-black p-4">
            <h2 className="font-chicago font-bold text-mac-black mb-2">
              Try these steps:
            </h2>
            <ul className="list-disc list-inside font-geneva text-mac-gray-dark space-y-1">
              <li>Check your internet connection and disable any ad-blockers or privacy extensions.</li>
              <li>Verify the Supabase project is reachable and not under maintenance.</li>
              <li>Open the browser console for detailed error logs.</li>
              <li>Reload this page to retry the connection.</li>
            </ul>
          </div>

          <div className="flex gap-3 justify-center pt-4">
            <a
              href="https://status.supabase.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-geneva"
            >
              Check Supabase Status
            </a>
            <button
              onClick={() => window.location.reload()}
              className="font-geneva underline"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </MacWindow>
    </div>
  );
}


