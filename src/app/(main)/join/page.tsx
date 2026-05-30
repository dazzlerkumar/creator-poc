'use client';

import { Suspense } from 'react';
import { useSearchParams } from "next/navigation";
import { JoinLoading } from '@/components/auth/JoinLoading';
import { AudienceStage } from '@/app/(main)/join/_components/audience-stage';

function JoinPageContent() {
  const searchParams = useSearchParams();
  const videoBroadcastId = searchParams.get("v") || "-";
  return <AudienceStage videoBroadcastId={videoBroadcastId} />
}

export default function JoinPage() {
  return (
    <Suspense fallback={<JoinLoading />}>
      <JoinPageContent />
    </Suspense>
  );
}
