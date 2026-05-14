'use client';

import React from 'react';

export function JoinLoading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background">
      <div className="relative">
        {/* Animated ring with yoga gradient */}
        <div className="h-24 w-24 rounded-full border-4 border-muted"></div>
        <div className="absolute inset-0 h-24 w-24 animate-spin rounded-full border-t-4 border-t-primary"></div>
        
        {/* Inner glow effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-primary/10 blur-xl"></div>
        </div>
      </div>
      
      <h2 className="mt-8 font-sans text-2xl font-bold tracking-tight text-foreground/80">
        Joining...
      </h2>
      <p className="mt-2 font-sans text-muted-foreground">
        Preparing your audience experience
      </p>
      
      {/* Yoga themed accent at the bottom */}
      <div className="absolute bottom-0 h-1 w-full bg-linear-to-r from-yoga-blue to-yoga-green opacity-50"></div>
    </div>
  );
}
