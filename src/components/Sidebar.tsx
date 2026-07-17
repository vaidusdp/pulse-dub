import React from "react";
import { X, LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "@/types/dashboard";

interface SidebarProps {
  user: User;
  navigationItems: Array<{ name: string; id: string; href: string }>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export default function Sidebar({
  user,
  navigationItems,
  activeTab,
  setActiveTab,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}: SidebarProps) {
  
  const sidebarContent = (isDrawer = false) => (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col flex-1 py-6">
        {/* Logo & Close for drawer */}
        <div className="px-6 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#DC2626] flex items-center justify-center font-bold text-sm tracking-tight text-white select-none">
              P
            </div>
            <span className="font-semibold text-lg tracking-tight">Pulse</span>
          </div>
          {isDrawer && (
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
              className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-[#111111] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="px-3 space-y-1" aria-label={isDrawer ? "Mobile Navigation" : "Desktop Navigation"}>
          {navigationItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (isDrawer) setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center relative py-2.5 px-4 rounded-lg text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626] ${
                  isActive 
                    ? "text-white bg-[#111111]" 
                    : "text-zinc-400 hover:text-white hover:bg-[#111111]/50"
                }`}
              >
                {/* Subtle red left indicator */}
                {isActive && (
                  <motion.div 
                    layoutId={isDrawer ? "activeIndicatorMobile" : "activeIndicatorDesktop"}
                    className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-[#DC2626] rounded-r"
                    transition={{ type: "tween", ease: "easeInOut", duration: 0.2 }}
                  />
                )}
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Bottom (Upgrade & Profile) */}
      <div className="p-4 border-t border-[#27272A] space-y-4">
        {/* Upgrade Card */}
        <div className="bg-[#111111] border border-[#27272A] rounded-xl p-4 select-none">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">Upgrade to Pro</h4>
          <p className="text-xs text-zinc-500 mb-3 leading-relaxed">Get advanced analytics, custom domains, and unlimited links.</p>
          <button 
            type="button"
            onClick={() => alert("Upgrade simulation: premium billing screen.")}
            className="w-full bg-white hover:bg-zinc-200 text-[#090909] font-semibold text-xs py-2 px-3 rounded-lg transition-transform active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
          >
            Upgrade
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center justify-between px-2 select-none">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-zinc-800 border border-[#27272A] flex items-center justify-center text-xs font-semibold text-white flex-shrink-0">
              {user.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-medium text-white truncate">{user.name}</span>
              <span className="text-[10px] text-zinc-500 truncate">{user.email}</span>
            </div>
          </div>
          <span className="text-[9px] bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/20 font-bold px-1.5 py-0.5 rounded tracking-wide flex-shrink-0">
            {user.plan}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden xl:flex xl:w-64 border-r border-[#27272A] bg-[#090909] flex-col justify-between fixed top-0 bottom-0 left-0 z-40">
        {sidebarContent(false)}
      </aside>

      {/* Mobile/Tablet slide-in drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 xl:hidden"
            />
            {/* Drawer container */}
            <motion.aside 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 bottom-0 left-0 w-64 bg-[#090909] border-r border-[#27272A] z-50 flex flex-col justify-between xl:hidden"
            >
              {sidebarContent(true)}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
