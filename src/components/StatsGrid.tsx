import React from "react";
import { motion } from "framer-motion";
import { Link2, MousePointerClick, Activity, Server, LucideIcon } from "lucide-react";
import { Stat } from "@/types/dashboard";

interface StatsGridProps {
  stats: Stat[];
}

const cardIcons: Record<string, LucideIcon> = {
  Link2,
  MousePointerClick,
  Activity,
  Server
};

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const Icon = cardIcons[stat.iconName] || Link2;
        const isUp = stat.trend === "up";
        const isStable = stat.trend === "stable";

        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            whileHover={{ y: -2 }}
            className="bg-[#111111] border border-[#27272A] rounded-xl p-5 flex flex-col justify-between transition-shadow duration-200 hover:shadow-2xl select-none"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs text-zinc-400 font-medium">{stat.name}</span>
              <div className="p-1.5 rounded-lg bg-zinc-900 border border-[#27272A] text-zinc-400">
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-2xl font-bold tracking-tight text-white">{stat.value}</span>
              <span 
                className={`text-xs font-semibold px-2 py-0.5 rounded ${
                  isUp 
                    ? "bg-emerald-500/10 text-emerald-400" 
                    : isStable 
                      ? "bg-zinc-500/10 text-zinc-400" 
                      : "bg-rose-500/10 text-rose-400"
                }`}
              >
                {stat.change}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
