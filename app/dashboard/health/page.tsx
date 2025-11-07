'use client';

import { useState, useEffect } from "react";
import { HealthStatus } from "./HealthStatus";

export default function HealthPage() {
  const [initialData, setInitialData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // For static export, we can't call API routes, so we'll skip the health check
    // or implement it client-side if needed
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div style={{ color: 'rgba(226,232,240,0.7)' }}>Loading...</div>;
  }

  return <HealthStatus initialData={initialData} />;
}


