'use client';


interface AudienceStageProps {
  sid: string;
}

export function AudienceStage({ sid }: AudienceStageProps) {
  return (
    <div
      data-testid="audience-stage"
      className="flex min-h-screen flex-col items-center justify-center p-4 bg-background"
    >
      <div className="max-w-md w-full p-8 rounded-2xl border border-border bg-card shadow-yoga text-center">
        <div className="h-16 w-16 mx-auto mb-6 rounded-full bg-linear-to-br from-yoga-blue to-yoga-green flex items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2c.46-1.72.46-5.33.46-5.33a29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
        </div>
        <h1 className="text-3xl font-bold mb-2">Audience Stage</h1>
        <p className="text-muted-foreground mb-6">Session ID: {sid}</p>
        <p className="text-lg">Welcome to the live session!</p>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground italic">
            This is a placeholder for the full audience experience.
          </p>
        </div>
      </div>
    </div>
  );
}
