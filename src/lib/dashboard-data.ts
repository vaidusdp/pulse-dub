import { User, Stat, TrafficPoint, TopLink, RecentLink, ActivityItem } from "../types/dashboard";

export const dummyUser: User = {
  name: "Vaidus",
  email: "vaidus@example.com",
  avatarUrl: "", // Initials fallback
  plan: "PRO"
};

export const dummyStats: Stat[] = [
  { id: "imported-links", name: "Imported Links", value: "128", change: "+12%", trend: "up", iconName: "Link2" },
  { id: "total-clicks", name: "Total Clicks", value: "24.3K", change: "+8%", trend: "up", iconName: "MousePointerClick" },
  { id: "unique-visitors", name: "Unique Visitors", value: "18.4K", change: "+14%", trend: "up", iconName: "Activity" },
  { id: "active-domains", name: "Active Domains", value: "6", change: "Stable", trend: "stable", iconName: "Server" }
];

export const dummyTrafficData: TrafficPoint[] = [
  { date: "Jul 11", clicks: 2100 },
  { date: "Jul 12", clicks: 2350 },
  { date: "Jul 13", clicks: 2800 },
  { date: "Jul 14", clicks: 2400 },
  { date: "Jul 15", clicks: 3100 },
  { date: "Jul 16", clicks: 2900 },
  { date: "Jul 17", clicks: 3400 }
];

export const dummyTopLinks: TopLink[] = [
  { slug: "/github", clicks: "4.3K", destination: "github.com/vaidus/pulse" },
  { slug: "/portfolio", clicks: "2.1K", destination: "vaidus.dev" },
  { slug: "/resume", clicks: "1.4K", destination: "drive.google.com/resume" }
];

export const dummyRecentLinks: RecentLink[] = [
  {
    id: "link-1",
    shortUrl: "pulse.li/github",
    destination: "github.com/vaidus/pulse",
    faviconName: "Github",
    clicks: 4321,
    status: "Active",
    created: "2 hours ago"
  },
  {
    id: "link-2",
    shortUrl: "pulse.li/portfolio",
    destination: "vaidus.dev/about",
    faviconName: "Globe",
    clicks: 2140,
    status: "Active",
    created: "1 day ago"
  },
  {
    id: "link-3",
    shortUrl: "pulse.li/figma-ui",
    destination: "figma.com/file/pulse-dashboard",
    faviconName: "Figma",
    clicks: 812,
    status: "Paused",
    created: "3 days ago"
  },
  {
    id: "link-4",
    shortUrl: "pulse.li/doc-v2",
    destination: "docs.pulse.li/getting-started",
    faviconName: "FileText",
    clicks: 1450,
    status: "Active",
    created: "5 days ago"
  },
  {
    id: "link-5",
    shortUrl: "pulse.li/archive-old",
    destination: "old.pulse.li/legacy-app",
    faviconName: "Layout",
    clicks: 94,
    status: "Archived",
    created: "1 week ago"
  }
];

export const dummyActivity: ActivityItem[] = [
  { id: "act-1", content: "Dub sync completed", timestamp: "10 mins ago" },
  { id: "act-2", content: "127 links imported", timestamp: "10 mins ago" },
  { id: "act-3", content: "Analytics refreshed", timestamp: "1 hour ago" },
  { id: "act-4", content: "Workspace connected", timestamp: "4 hours ago" },
  { id: "act-5", content: "Sync failed (re-attempted)", timestamp: "1 day ago" }
];
