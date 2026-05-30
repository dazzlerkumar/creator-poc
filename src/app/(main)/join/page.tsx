'use client';

import { Suspense } from 'react';
import { JoinLoading } from '@/components/auth/JoinLoading';
import { AudienceStage } from '@/app/(main)/join/_components/audience-stage';

function JoinPageContent() {
  const videoBroadcastId = "URXBh2PRp0o" // TODO:  Video id will be given by backend
  return <AudienceStage sid={videoBroadcastId} />
}

export default function JoinPage() {
  return (
    <Suspense fallback={<JoinLoading />}>
      <JoinPageContent />
    </Suspense>
  );
}
