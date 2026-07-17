import React from "react";

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div 
      className={`bg-[#111111] border border-[#27272A] rounded-xl p-5 space-y-4 select-none ${className}`}
      aria-hidden="true"
    >
      <div className="flex justify-between items-center">
        <div className="h-3 bg-zinc-800 rounded w-1/3 animate-pulse" />
        <div className="w-7 h-7 rounded-lg bg-zinc-800 animate-pulse" />
      </div>
      <div className="h-6 bg-zinc-800 rounded w-1/2 mt-4 animate-pulse" />
    </div>
  );
}

export function SkeletonGraph() {
  return (
    <div 
      className="bg-[#111111] border border-[#27272A] rounded-xl p-5 space-y-5 select-none h-full"
      aria-hidden="true"
    >
      <div className="flex justify-between items-start">
        <div className="space-y-2 w-1/3">
          <div className="h-3 bg-zinc-800 rounded w-1/2 animate-pulse" />
          <div className="h-6 bg-zinc-800 rounded w-3/4 animate-pulse" />
        </div>
        <div className="w-5 h-5 bg-zinc-800 rounded animate-pulse" />
      </div>
      
      {/* flexible metrics skeletons */}
      <div className="grid grid-cols-3 gap-4 py-3 border-y border-[#27272A]">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-1.5">
            <div className="h-2 bg-zinc-800 rounded w-1/2 animate-pulse" />
            <div className="h-3.5 bg-zinc-800 rounded w-3/4 animate-pulse" />
          </div>
        ))}
      </div>

      {/* SVG grid skeleton */}
      <div className="w-full h-[200px] flex flex-col justify-between py-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-px bg-zinc-800 w-full animate-pulse opacity-40" />
        ))}
      </div>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div 
      className="flex justify-between items-center py-3 border-b border-[#27272A]/40 animate-pulse"
      aria-hidden="true"
    >
      <div className="h-3 bg-zinc-800 rounded w-1/4" />
      <div className="h-3 bg-zinc-800 rounded w-1/3" />
      <div className="h-3 bg-zinc-800 rounded w-1/12" />
      <div className="h-4 bg-zinc-800 rounded-full w-12" />
      <div className="h-3 bg-zinc-800 rounded w-1/6" />
      <div className="h-6 bg-zinc-800 rounded w-10" />
    </div>
  );
}

export function SkeletonActivityItem() {
  return (
    <div 
      className="flex justify-between items-center py-1 animate-pulse"
      aria-hidden="true"
    >
      <div className="flex items-center gap-2 w-3/4">
        <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 flex-shrink-0" />
        <div className="h-3 bg-zinc-800 rounded w-full" />
      </div>
      <div className="h-2.5 bg-zinc-800 rounded w-12" />
    </div>
  );
}
