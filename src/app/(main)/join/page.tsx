'use client';

import { Suspense } from 'react';
import { JoinLoading } from '@/components/auth/JoinLoading';
import { AudienceStage } from '@/app/(main)/join/_components/audience-stage';

function JoinPageContent() {
  return <AudienceStage sid={"123"} />
}

export default function JoinPage() {
  return (
    <Suspense fallback={<JoinLoading />}>
      <JoinPageContent />
    </Suspense>
  );
}
