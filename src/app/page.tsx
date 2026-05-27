"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import routePaths from "@/config/route-paths.config";
import { signIdentityToken } from "@/lib/hmac";
import { AlertTriangle, Headset } from "lucide-react";
import React from "react";
import HabuildLogo from "@/components/ui/habuild-logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HABUILD_SUPPORT_CONTACT } from "@/lib/constants";

export default function Home(): React.JSX.Element {
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState<'loading' | 'error'>('loading');

  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async (): Promise<void> => {
      try {
        // Passing dummy arguments since the hmac function requires them
        await signIdentityToken('temp-user', 'temp-secret');
        if (isMounted) {
          router.replace(routePaths.main.join);
        }
      } catch (_error: unknown) {
        console.error("HABUILD AUTH ERROR: ", _error)
        if (isMounted) {
          setAuthStatus('error');
        }
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (authStatus === 'error') {
    return (
      <div className="h-full min-h-screen flex flex-col items-center justify-center p-4">
        <HabuildLogo className="w-26 mb-12" />
        <div className="bg-white w-full max-w-sm rounded-[32px] p-8 py-10 flex flex-col items-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="bg-destructive/10 p-4 rounded-full mb-6">
            <AlertTriangle size={32} className="text-destructive" />
          </div>

          <h1 className="text-[22px] font-bold text-slate-900 mb-3">Authentication Error</h1>
          <p className="text-slate-500 mb-8 text-center px-2 leading-relaxed">
            We Use the link sent to your WhatsApp<br /> to join the stream.
          </p>

          <Button
            onClick={() => window.location.reload()}
            className="h-12 text-lg text-white font-semibold"
            variant='brand'
          >
            Reload
          </Button>

          <div className="mt-8 flex flex-col items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 tracking-wider">
              NEED ASSISTANCE?
            </span>
            <Link href={HABUILD_SUPPORT_CONTACT} target="_blank" rel="noopener noreferrer" className="text-secondary font-medium flex items-center gap-2 hover:underline text-sm">
              <Headset size={18} />
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full min-h-screen flex flex-col items-center justify-center text-muted-foreground/40 gap-2">
      <div className="flex-grow flex flex-col gap-4 items-center justify-center p-gutter">
        <div className="flex items-center justify-center animate-pulse">
          <HabuildLogo className="w-30" />
        </div>
        <div className="flex flex-col items-center gap-4 mt-2">
          <div className="text-center space-y-1.5">
            <p className="text-foreground font-medium text-base tracking-tight">
              Authenticating access...
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Experience the calmness of Habuild Yoga.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
