import MacWindow from "@/components/mac-ui/MacWindow";
import MacButton from "@/components/mac-ui/MacButton";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <MacWindow title="Error" width="100%">
        <div className="text-center py-12">
          <div className="text-6xl font-chicago mb-4">404</div>
          <h1 className="text-3xl font-chicago mb-3">Page Not Found</h1>
          <p className="font-geneva mb-6 text-mac-gray-dark">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex gap-3 justify-center">
            <MacButton href="/" variant="primary">
              Go Home
            </MacButton>
            <MacButton href="/blog">View Blog</MacButton>
          </div>
        </div>
      </MacWindow>
    </div>
  );
}

