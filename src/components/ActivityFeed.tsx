import React from "react";
import { ActivityItem } from "@/types/dashboard";

interface ActivityFeedProps {
  activity: ActivityItem[];
}

export default function ActivityFeed({ activity }: ActivityFeedProps) {
  return (
    <div className="bg-[#111111] border border-[#27272A] rounded-xl p-5 space-y-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 select-none">Recent Activity</h3>
      <div className="space-y-4">
        {activity.map((act) => (
          <div key={act.id} className="flex justify-between items-start gap-4 text-xs leading-relaxed">
            <div className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#DC2626] mt-1.5 flex-shrink-0" />
              <span className="text-zinc-300 font-medium">{act.content}</span>
            </div>
            <span className="text-[10px] text-zinc-500 flex-shrink-0 select-none whitespace-nowrap">{act.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
