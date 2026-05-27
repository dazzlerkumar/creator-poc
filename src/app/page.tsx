"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import routePaths from "@/config/route-paths.config";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace(routePaths.auth.login);
  }, [router]);
  return null;
}
