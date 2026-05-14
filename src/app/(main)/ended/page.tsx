'use client';

import React from 'react';

export default function EndedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full p-8 rounded-2xl border border-border bg-card shadow-yoga text-center">
        <h1 className="text-3xl font-bold mb-4">Session Ended</h1>
        <p className="text-muted-foreground">
          This live session has concluded. Thank you for joining!
        </p>
      </div>
    </div>
  );
}
