'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ErrorPageContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason');

  const getErrorMessage = () => {
    switch (reason) {
      case 'invalid_invite':
        return 'The invite token provided is invalid or has expired.';
      case 'missing_params':
        return 'Missing required session or invite parameters.';
      case 'api_error':
        return 'An error occurred while connecting to the session. Please try again.';
      default:
        return 'An unexpected error occurred.';
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full p-8 rounded-2xl border border-destructive/20 bg-card shadow-yoga text-center">
        <div className="h-16 w-16 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-destructive">Oops!</h1>
        <p className="text-foreground font-medium mb-2">{getErrorMessage()}</p>
        <p className="text-muted-foreground">
          If you believe this is a mistake, please contact the host.
        </p>
      </div>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorPageContent />
    </Suspense>
  );
}
