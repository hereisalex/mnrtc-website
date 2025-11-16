'use client';

import MacWindow from '@/components/mac-ui/MacWindow';
import MacButton from '@/components/mac-ui/MacButton';

interface SupabaseConfigErrorProps {
  missingVars: string[];
}

export function SupabaseConfigError({ missingVars }: SupabaseConfigErrorProps) {
  const hasUrl = !missingVars.includes('NEXT_PUBLIC_SUPABASE_URL');
  const hasKey = !missingVars.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY');

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <MacWindow title="Supabase Configuration Required" width="100%">
        <div className="space-y-6">
          {/* Error Icon and Title */}
          <div className="text-center">
            <div className="text-5xl mb-4">⚠️</div>
            <h1 className="text-2xl font-chicago mb-2 text-mac-black">
              Supabase Not Configured
            </h1>
            <p className="font-geneva text-mac-gray-dark">
              Your website needs Supabase credentials to function properly.
            </p>
          </div>

          {/* Missing Variables */}
          <div className="bg-mac-platinum-dark border-2 border-mac-black p-4">
            <h2 className="font-chicago font-bold text-mac-black mb-2">
              Missing Configuration:
            </h2>
            <ul className="list-disc list-inside font-geneva text-mac-gray-dark space-y-1">
              {missingVars.map((varName) => (
                <li key={varName} className="font-mono text-sm">
                  {varName}
                </li>
              ))}
            </ul>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="space-y-4">
            <h2 className="font-chicago font-bold text-mac-black text-xl">
              📋 Quick Setup Guide
            </h2>

            {/* Step 1: Get Supabase Credentials */}
            <div className="bg-mac-platinum-dark border-2 border-mac-black p-4">
              <h3 className="font-chicago font-bold text-mac-black mb-2">
                Step 1: Get Your Supabase Credentials
              </h3>
              <div className="font-geneva text-mac-gray-dark space-y-3 text-sm">
                <p>
                  <strong>Don't have a Supabase account?</strong> Create one for free at{' '}
                  <a
                    href="https://supabase.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-mac-blue underline hover:text-mac-blue-dark"
                  >
                    supabase.com
                  </a>
                </p>
                <div className="space-y-2">
                  <p>
                    <strong>Already have a project?</strong> Follow these steps:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 ml-2">
                    <li>
                      Go to{' '}
                      <a
                        href="https://app.supabase.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-mac-blue underline hover:text-mac-blue-dark"
                      >
                        app.supabase.com
                      </a>{' '}
                      and sign in
                    </li>
                    <li>Select your project (or create a new one)</li>
                    <li>Click on <strong>"Settings"</strong> (⚙️ icon) in the left sidebar</li>
                    <li>Click on <strong>"API"</strong> in the settings menu</li>
                    <li>
                      You'll see two values you need:
                      <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                        <li>
                          <strong>Project URL</strong> - Looks like:{' '}
                          <code className="bg-mac-gray px-1 rounded">https://xxxxx.supabase.co</code>
                        </li>
                        <li>
                          <strong>anon public</strong> key - A long string starting with{' '}
                          <code className="bg-mac-gray px-1 rounded">eyJ...</code>
                        </li>
                      </ul>
                    </li>
                    <li>
                      Click the <strong>"Copy"</strong> button next to each value to copy them
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Step 2: Run Setup Script */}
            <div className="bg-mac-platinum-dark border-2 border-mac-black p-4">
              <h3 className="font-chicago font-bold text-mac-black mb-2">
                Step 2: Run the Setup Script
              </h3>
              <div className="font-geneva text-mac-gray-dark space-y-3 text-sm">
                <p>
                  Open your terminal/command prompt in the project directory and run:
                </p>
                <div className="bg-mac-black text-mac-platinum p-3 rounded font-mono text-xs overflow-x-auto">
                  <div className="flex items-center gap-2">
                    <span className="text-mac-gray">$</span>
                    <span>npm run setup:env</span>
                  </div>
                </div>
                <p>
                  The script will ask you for the values you copied in Step 1. Just paste them when prompted!
                </p>
              </div>
            </div>

            {/* Step 3: Restart */}
            <div className="bg-mac-platinum-dark border-2 border-mac-black p-4">
              <h3 className="font-chicago font-bold text-mac-black mb-2">
                Step 3: Restart Your Development Server
              </h3>
              <div className="font-geneva text-mac-gray-dark space-y-2 text-sm">
                <p>
                  After running the setup script, restart your development server:
                </p>
                <div className="bg-mac-black text-mac-platinum p-3 rounded font-mono text-xs overflow-x-auto">
                  <div className="flex items-center gap-2">
                    <span className="text-mac-gray">$</span>
                    <span>npm run dev</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Guide Link */}
          <div className="bg-mac-blue-light border-2 border-mac-blue p-4">
            <p className="font-geneva text-sm text-mac-black">
              <strong>💡 Need visual help?</strong> Check out the{' '}
              <a
                href="https://supabase.com/docs/guides/getting-started/quickstarts/nextjs"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-bold hover:text-mac-blue-dark"
              >
                Supabase Next.js Quickstart Guide
              </a>{' '}
              for screenshots and detailed instructions.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center pt-4">
            <MacButton
              href="https://app.supabase.com"
              external
              variant="primary"
            >
              Open Supabase Dashboard
            </MacButton>
            <MacButton
              onClick={() => window.location.reload()}
              variant="default"
            >
              Refresh Page
            </MacButton>
          </div>

          {/* Current Status */}
          {(hasUrl || hasKey) && (
            <div className="bg-mac-platinum-dark border-2 border-mac-black p-3 mt-4">
              <p className="font-geneva text-xs text-mac-gray-dark">
                <strong>Note:</strong> Some configuration values are already set. 
                You only need to provide the missing ones.
              </p>
            </div>
          )}
        </div>
      </MacWindow>
    </div>
  );
}

