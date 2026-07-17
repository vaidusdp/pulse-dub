"use client";

import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Link2, 
  AlertCircle, 
  BarChart3,
  Settings,
  RefreshCw
} from 'lucide-react';

// Shared types & mock data
import { RecentLink } from "@/types/dashboard";
import { 
  dummyUser, 
  dummyStats, 
  dummyTrafficData, 
  dummyTopLinks, 
  dummyRecentLinks, 
  dummyActivity 
} from "@/lib/dashboard-data";

// Components
import Sidebar from "@/components/Sidebar";
import TopNavbar from "@/components/TopNavbar";
import Hero from "@/components/Hero";
import StatsGrid from "@/components/StatsGrid";
import TrafficChart from "@/components/TrafficChart";
import TopLinksCard from "@/components/TopLinksCard";
import RecentLinksTable from "@/components/RecentLinksTable";
import ActivityFeed from "@/components/ActivityFeed";
import DemoToolbar from "@/components/DemoToolbar";

// Skeletons
import { 
  SkeletonCard, 
  SkeletonGraph, 
  SkeletonRow, 
  SkeletonActivityItem 
} from "@/components/Skeletons";

const navigationItems = [
  { name: "Dashboard", id: "dashboard", href: "#" },
  { name: "Links", id: "links", href: "#" },
  { name: "Analytics", id: "analytics", href: "#" },
  { name: "Settings", id: "settings", href: "#" }
];

export default function DashboardPage() {
  // Demo states
  const [demoMode, setDemoMode] = useState<"loaded" | "empty" | "loading">("loaded");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null);

  // Read-only data states
  const [links] = useState<RecentLink[]>(dummyRecentLinks);
  const [stats] = useState(dummyStats);
  const [topLinks] = useState(dummyTopLinks);
  const [activity] = useState(dummyActivity);
  const [trafficData] = useState(dummyTrafficData);
  const [user] = useState(dummyUser);

  // Copy handler
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLinkId(id);
    setTimeout(() => setCopiedLinkId(null), 2000);
  };

  // Sync Dub trigger handler
  const handleSyncDub = () => {
    console.log("Syncing Dub...");
    alert("Syncing Dub workspace... (console logged)");
  };

  // Search filter (slug or destination)
  const filteredLinks = useMemo(() => {
    return links.filter(link => 
      link.shortUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.destination.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [links, searchQuery]);

  return (
    <div className="min-h-screen bg-[#090909] text-white flex flex-col xl:flex-row antialiased font-sans">
      
      {/* Sidebar Component (Handles desktop/drawer navigation) */}
      <Sidebar
        user={user}
        navigationItems={navigationItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 xl:pl-64 flex flex-col min-w-0">
        
        {/* Top Navigation Bar */}
        <TopNavbar
          user={user}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          onSyncDub={handleSyncDub}
        />

        {/* Inner Content Grid */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-8 max-w-[1400px] w-full mx-auto space-y-8">
          
          {/* Welcome Banner */}
          <Hero />

          {/* Animate layouts on Tab/Demo toggle */}
          <AnimatePresence mode="wait">
            {demoMode === "loading" ? (
              <motion.div
                key="loading-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="space-y-8"
              >
                {/* Stats Loading Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
                </div>

                {/* Graph Grid Loading Skeleton */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-2">
                    <SkeletonGraph />
                  </div>
                  <div>
                    <SkeletonCard className="h-full" />
                  </div>
                </div>

                {/* Table Row Loading Skeleton */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-2">
                    <div className="bg-[#111111] border border-[#27272A] rounded-xl p-5 space-y-4">
                      <div className="h-4 bg-zinc-800 rounded w-1/4 animate-pulse" />
                      <div className="space-y-3">
                        {[...Array(5)].map((_, i) => <SkeletonRow key={i} />)}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-[#111111] border border-[#27272A] rounded-xl p-5 space-y-4">
                      <div className="h-4 bg-zinc-800 rounded w-1/3 animate-pulse" />
                      <div className="space-y-4">
                        {[...Array(4)].map((_, i) => <SkeletonActivityItem key={i} />)}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : demoMode === "empty" ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="space-y-8"
              >
                {/* Zero Stats Overview */}
                <StatsGrid stats={stats.map(s => ({ ...s, value: "0", change: "0%" }))} />

                {/* Empty State Layout (Dub Unconnected Account) */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-2 bg-[#111111] border border-[#27272A] rounded-xl p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-4 min-h-[350px]">
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-[#27272A] flex items-center justify-center text-zinc-500">
                      <Link2 className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-white">Connect your Dub account</h3>
                      <p className="text-xs text-zinc-500 max-w-[280px] leading-relaxed">
                        Connect your Dub workspace to start importing links and analytics.
                      </p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => alert("Redirecting to Dub OAuth workflow...")}
                      className="bg-white hover:bg-zinc-200 text-[#090909] text-xs font-semibold px-4 py-2 rounded-lg transition-transform duration-100 hover:scale-[1.02] active:scale-[0.98] outline-none"
                    >
                      Connect Dub
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-[#111111] border border-[#27272A] rounded-xl p-5 space-y-4">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 select-none">Recent Activity</h3>
                      <div className="py-6 text-center select-none">
                        <AlertCircle className="w-5 h-5 text-zinc-600 mx-auto mb-2" />
                        <p className="text-xs text-zinc-500">No sync logs recorded today</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="loaded-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="space-y-8"
              >
                {/* Switch view screens based on navigation tab selection */}
                {activeTab === "dashboard" && (
                  <>
                    <StatsGrid stats={stats} />

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                      <div className="xl:col-span-2">
                        <TrafficChart trafficData={trafficData} />
                      </div>
                      <div>
                        <TopLinksCard topLinks={topLinks} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                      <div className="xl:col-span-2">
                        <RecentLinksTable
                          filteredLinks={filteredLinks}
                          totalLinksCount={links.length}
                          copiedLinkId={copiedLinkId}
                          onCopy={handleCopy}
                          onViewAnalytics={setActiveTab}
                        />
                      </div>
                      <div className="space-y-6">
                        <ActivityFeed activity={activity} />
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "links" && (
                  <div className="space-y-6">
                    <RecentLinksTable
                      filteredLinks={filteredLinks}
                      totalLinksCount={links.length}
                      copiedLinkId={copiedLinkId}
                      onCopy={handleCopy}
                      onViewAnalytics={setActiveTab}
                    />
                  </div>
                )}

                {activeTab === "analytics" && (
                  <div className="grid grid-cols-1 gap-6">
                    <TrafficChart trafficData={trafficData} />
                    <TopLinksCard topLinks={topLinks} />
                  </div>
                )}

                {activeTab === "settings" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none">
                    
                    {/* General Settings */}
                    <div className="bg-[#111111] border border-[#27272A] rounded-xl p-6 space-y-4">
                      <div className="flex items-center gap-2 border-b border-[#27272A] pb-3">
                        <Settings className="w-4.5 h-4.5 text-zinc-400" />
                        <h3 className="text-sm font-semibold text-white">General Settings</h3>
                      </div>
                      <div className="space-y-3 text-xs">
                        <div className="space-y-1">
                          <p className="text-zinc-500 font-medium">User Name</p>
                          <p className="text-white font-semibold bg-zinc-900 border border-[#27272A] px-3 py-2 rounded-lg">
                            {user.name}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-zinc-500 font-medium">Email Address</p>
                          <p className="text-white font-semibold bg-zinc-900 border border-[#27272A] px-3 py-2 rounded-lg">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dub Integration */}
                    <div className="bg-[#111111] border border-[#27272A] rounded-xl p-6 space-y-4">
                      <div className="flex items-center gap-2 border-b border-[#27272A] pb-3">
                        <Link2 className="w-4.5 h-4.5 text-zinc-400" />
                        <h3 className="text-sm font-semibold text-white">Dub Integration</h3>
                      </div>
                      <div className="space-y-3 text-xs">
                        <div className="flex justify-between items-center py-1">
                          <span className="text-zinc-500 font-medium">Status</span>
                          <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Connected
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                          <span className="text-zinc-500 font-medium">Workspace</span>
                          <span className="text-white font-semibold">example-workspace</span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                          <span className="text-zinc-500 font-medium">Last Sync</span>
                          <span className="text-zinc-400 font-medium">2 minutes ago</span>
                        </div>
                        <div className="pt-2">
                          <button 
                            type="button"
                            onClick={() => alert("Reconnecting Dub workspace OAuth workflow...")}
                            className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold px-4 py-2 rounded-lg w-full transition-transform active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
                          >
                            Reconnect Dub
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Subscription */}
                    <div className="bg-[#111111] border border-[#27272A] rounded-xl p-6 space-y-4">
                      <div className="flex items-center gap-2 border-b border-[#27272A] pb-3">
                        <BarChart3 className="w-4.5 h-4.5 text-zinc-400" />
                        <h3 className="text-sm font-semibold text-white">Subscription</h3>
                      </div>
                      <div className="space-y-3 text-xs">
                        <div className="flex justify-between items-center py-1">
                          <span className="text-zinc-500 font-medium">Current Plan</span>
                          <span className="bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/20 font-bold px-2 py-0.5 rounded text-[10px]">
                            {user.plan}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                          <span className="text-zinc-500 font-medium">Renews On</span>
                          <span className="text-white font-semibold">August 17, 2026</span>
                        </div>
                        <div className="pt-2">
                          <button 
                            type="button"
                            onClick={() => alert("Billing portal redirection...")}
                            className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold px-4 py-2 rounded-lg w-full transition-transform active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
                          >
                            Manage Subscription
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

              </motion.div>
            )}
          </AnimatePresence>

        </main>
      </div>

      {/* Floating Demo Control Bar (Isolated for dev environment only) */}
      <DemoToolbar demoMode={demoMode} setDemoMode={setDemoMode} />

    </div>
  );
}