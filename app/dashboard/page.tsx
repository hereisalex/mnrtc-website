'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardHome() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/dashboard/analytics");
  }, [router]);

  return null;
}


