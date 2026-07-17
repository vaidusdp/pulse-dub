import React from "react";
import { BarChart3 } from "lucide-react";
import { TopLink } from "@/types/dashboard";

interface TopLinksCardProps {
  topLinks: TopLink[];
}

export default function TopLinksCard({ topLinks }: TopLinksCardProps) {
  return (
    <div className="bg-[#111111] border border-[#27272A] rounded-xl p-5 flex flex-col justify-between h-full select-none">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Top Performing Dub Links</h3>
          <BarChart3 className="w-4 h-4 text-zinc-500" />
        </div>
        
        <div className="divide-y divide-[#27272A]">
          {topLinks.map((link) => (
            <div key={link.slug} className="py-3.5 flex justify-between items-center text-xs">
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-white hover:text-[#DC2626] transition-colors cursor-pointer select-all truncate">{link.slug}</span>
                <span className="text-[10px] text-zinc-500 truncate">{link.destination}</span>
              </div>
              <span className="font-semibold text-white bg-zinc-900 border border-[#27272A] px-2 py-1 rounded flex-shrink-0 ml-3">
                {link.clicks} Clicks
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
