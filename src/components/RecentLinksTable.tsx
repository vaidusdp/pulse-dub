import React from "react";
import { 
  Github, 
  Globe, 
  Figma, 
  Layout, 
  FileText, 
  Check, 
  Copy, 
  BarChart3, 
  ExternalLink 
} from "lucide-react";
import { RecentLink } from "@/types/dashboard";

interface RecentLinksTableProps {
  filteredLinks: RecentLink[];
  totalLinksCount: number;
  copiedLinkId: string | null;
  onCopy: (id: string, text: string) => void;
  onViewAnalytics: (tab: string) => void;
}

const faviconIcons = {
  Github,
  Globe,
  Figma,
  Layout,
  FileText
};

export default function RecentLinksTable({
  filteredLinks,
  totalLinksCount,
  copiedLinkId,
  onCopy,
  onViewAnalytics
}: RecentLinksTableProps) {
  return (
    <div className="bg-[#111111] border border-[#27272A] rounded-xl overflow-hidden flex flex-col">
      <div className="p-5 border-b border-[#27272A] flex justify-between items-center select-none">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Imported Links</h3>
        <span className="text-[10px] text-zinc-500 font-mono">
          Showing {filteredLinks.length} of {totalLinksCount}
        </span>
      </div>

      <div className="overflow-x-auto max-h-[360px] overflow-y-auto relative">
        {filteredLinks.length === 0 ? (
          <div className="p-8 text-center text-zinc-500 text-xs select-none">
            No links matched your search.
          </div>
        ) : (
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#111111] text-zinc-400 font-semibold sticky top-0 z-10 border-b border-[#27272A] select-none shadow-[0_1px_0_0_#27272A]">
              <tr>
                <th className="px-5 py-3.5">Short URL</th>
                <th className="px-5 py-3.5">Destination</th>
                <th className="px-5 py-3.5 text-center">Clicks</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Created</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272A]/60">
              {filteredLinks.map((link) => {
                const FaviconIcon = faviconIcons[link.faviconName as keyof typeof faviconIcons] || Globe;
                const isCopied = copiedLinkId === link.id;
                
                const statusColor = {
                  Active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                  Paused: "bg-amber-500/10 text-amber-400 border-amber-500/20",
                  Archived: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                }[link.status];

                return (
                  <tr key={link.id} className="hover:bg-[#111111]/40 transition-colors">
                    {/* Short URL */}
                    <td className="px-5 py-3.5 font-medium text-white select-all font-mono whitespace-nowrap">
                      {link.shortUrl}
                    </td>
                    
                    {/* Destination */}
                    <td className="px-5 py-3.5 text-zinc-400 max-w-[200px] truncate">
                      <div className="flex items-center gap-2">
                        <div className="w-4.5 h-4.5 rounded bg-zinc-950 border border-[#27272A] flex items-center justify-center text-zinc-400 flex-shrink-0">
                          <FaviconIcon className="w-3 h-3" />
                        </div>
                        <span className="truncate">{link.destination}</span>
                      </div>
                    </td>
                    
                    {/* Clicks */}
                    <td className="px-5 py-3.5 text-center text-white font-semibold">
                      {link.clicks.toLocaleString()}
                    </td>
                    
                    {/* Status */}
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 border rounded-full ${statusColor}`}>
                        {link.status}
                      </span>
                    </td>
                    
                    {/* Created */}
                    <td className="px-5 py-3.5 text-zinc-500 whitespace-nowrap">
                      {link.created}
                    </td>
                    
                    {/* Actions */}
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Copy Link */}
                        <button 
                          type="button"
                          onClick={() => onCopy(link.id, link.shortUrl)}
                          aria-label="Copy short link"
                          className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-900 border border-transparent hover:border-[#27272A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        
                        {/* Open Analytics */}
                        <button 
                          type="button"
                          onClick={() => onViewAnalytics("analytics")}
                          aria-label="Open analytics"
                          className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-900 border border-transparent hover:border-[#27272A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
                        >
                          <BarChart3 className="w-3.5 h-3.5" />
                        </button>

                        {/* View in Dub */}
                        <button 
                          type="button"
                          onClick={() => alert(`Redirecting to Dub link dashboard: dub.sh/${link.shortUrl.split('/')[1]}`)}
                          aria-label="View in Dub"
                          className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-900 border border-transparent hover:border-[#27272A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
