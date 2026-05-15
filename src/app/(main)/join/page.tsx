'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { sessionsApi } from '@/api/sessions';
import { authApi } from '@/api/auth';
import { useAuthStore } from '@/stores/auth-store';
import { JoinLoading } from '@/components/auth/JoinLoading';
import { AudienceStage } from '@/app/(main)/join/_components/AudienceStage';
import FullscreenPOC from './_components/FullscreenPOC';

function JoinPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLive, setIsLive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [sid, setSid] = useState<string | null>("123");

  const setToken = useAuthStore((state) => state.setToken);
  /* 
    useEffect(() => {
      const session = searchParams.get('session');
      const invite = searchParams.get('invite');
  
      if (!session || !invite) {
        router.push('/auth/error?reason=missing_params');
        return;
      }
  
      setSid(session);
  
      const handleJoin = async () => {
        try {
          // 1. Check session status
          const { status } = await sessionsApi.getStatus(session);
  
          if (status === 'ended') {
            router.push('/auth/ended');
            return;
          }
  
          // 2. Exchange token
          const authResponse = await authApi.getToken({
            sessionId: session,
            inviteToken: invite,
          });
  
          // 3. Store JWT in store (which persists to sessionStorage)
          setToken(authResponse.jwt, authResponse.role, authResponse.expiry);
  
          // 4. Update state to render stage
          setIsLive(true);
          setIsLoading(false);
        } catch (error: any) {
          console.error('Join error:', error);
          const reason = error?.response?.data?.error === 'invalid_invite' ? 'invalid_invite' : 'api_error';
          router.push(`/auth/error?reason=${reason}`);
        }
      };
  
      handleJoin();
    }, [searchParams, router, setToken]); */

  /*  if (isLoading || !sid) {
     return <JoinLoading />;
   }
 
   if (isLive) {
     return <AudienceStage sid={sid} />;
   } */

  // return <JoinLoading />;

  return <FullscreenPOC />
}

export default function JoinPage() {
  return (
    <Suspense fallback={<JoinLoading />}>
      <JoinPageContent />
    </Suspense>
  );
}
