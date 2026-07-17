import React from "react";
import { Search, Bell, ChevronDown, RefreshCw, Menu } from "lucide-react";
import { User } from "@/types/dashboard";

interface TopNavbarProps {
  user: User;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setIsMobileMenuOpen: (open: boolean) => void;
  onSyncDub: () => void;
}

export default function TopNavbar({
  user,
  searchQuery,
  setSearchQuery,
  setIsMobileMenuOpen,
  onSyncDub
}: TopNavbarProps) {
  return (
    <header className="sticky top-0 h-16 border-b border-[#27272A] bg-[#090909]/80 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 z-30">
      <div className="flex items-center gap-3">
        {/* Hamburger trigger for mobile/tablet */}
        <button 
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open navigation menu"
          className="xl:hidden p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-[#111111] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="font-semibold text-sm tracking-tight text-white select-none">Dashboard</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end max-w-2xl">
        {/* Search Input */}
        <div className="relative w-full max-w-[140px] sm:max-w-[200px] md:max-w-[240px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
          <input
            type="text"
            id="navbar-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search links..."
            aria-label="Search links by slug or destination"
            className="w-full bg-[#111111] border border-[#27272A] text-xs pl-9 pr-3 py-1.5 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-colors focus-visible:ring-2 focus-visible:ring-[#DC2626]"
          />
        </div>

        {/* Notification Bell */}
        <button 
          type="button"
          aria-label="View notifications"
          className="p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-[#111111] transition-colors relative outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#DC2626]" aria-hidden="true" />
        </button>

        {/* Date Range Selector */}
        <div className="relative hidden sm:block">
          <button 
            type="button"
            aria-label="Select date range"
            className="bg-[#111111] border border-[#27272A] text-zinc-400 hover:text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#DC2626]"
          >
            Last 7 Days
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
          </button>
        </div>

        {/* Primary CTA (Sync Dub) */}
        <button 
          type="button"
          onClick={onSyncDub}
          className="bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg font-medium transition-transform duration-100 hover:scale-[1.02] active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909] flex items-center gap-1.5"
        >
          <RefreshCw className="w-3 h-3 animate-none" />
          <span>Sync Dub</span>
        </button>

        {/* User Initials Avatar */}
        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-[#27272A] flex items-center justify-center text-xs font-semibold text-white select-none">
          {user.name.substring(0, 1).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
