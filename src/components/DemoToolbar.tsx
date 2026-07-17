import React, { useState, useEffect } from "react";

interface DemoToolbarProps {
  demoMode: "loaded" | "empty" | "loading";
  setDemoMode: (mode: "loaded" | "empty" | "loading") => void;
}

export default function DemoToolbar({ demoMode, setDemoMode }: DemoToolbarProps) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration warnings
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-[#111111] border border-[#27272A] p-2.5 rounded-xl flex items-center gap-2 shadow-2xl select-none">
      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider px-1.5">Demo Controls</span>
      <div className="flex bg-[#090909] border border-[#27272A] rounded-lg p-0.5">
        <button
          type="button"
          onClick={() => setDemoMode("loaded")}
          className={`text-[10px] font-semibold px-2 py-1 rounded transition-colors focus:outline-none ${
            demoMode === "loaded" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-white"
          }`}
        >
          Loaded
        </button>
        <button
          type="button"
          onClick={() => setDemoMode("empty")}
          className={`text-[10px] font-semibold px-2 py-1 rounded transition-colors focus:outline-none ${
            demoMode === "empty" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-white"
          }`}
        >
          Empty
        </button>
        <button
          type="button"
          onClick={() => setDemoMode("loading")}
          className={`text-[10px] font-semibold px-2 py-1 rounded transition-colors focus:outline-none ${
            demoMode === "loading" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-white"
          }`}
        >
          Loading
        </button>
      </div>
    </div>
  );
}
