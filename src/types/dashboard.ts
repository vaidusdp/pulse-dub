export interface User {
  name: string;
  email: string;
  avatarUrl: string;
  plan: string;
}

export interface Stat {
  id: string;
  name: string;
  value: string;
  change: string;
  trend: "up" | "down" | "stable";
  iconName: string;
}

export interface TrafficPoint {
  date: string;
  clicks: number;
}

export interface TopLink {
  slug: string;
  clicks: string;
  destination: string;
}

export interface RecentLink {
  id: string;
  shortUrl: string;
  destination: string;
  faviconName: string;
  clicks: number;
  status: "Active" | "Paused" | "Archived";
  created: string;
}

export interface ActivityItem {
  id: string;
  content: string;
  timestamp: string;
}
