export interface Lead {
  id: string;
  name: string;
  twitterHandle: string;
  email?: string;
  company?: string;
  status:
    | "new"
    | "contacted"
    | "responded"
    | "qualified"
    | "converted"
    | "lost";
  assignedTo?: string;
  source: "twitter_search" | "twitter_engagement" | "referral" | "manual";
  engagementScore: number;
  lastContact: string;
  notes?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Intern {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  assignedLeads: number;
  conversionRate: number;
  lastActive: string;
}

export const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    twitterHandle: "@sarahj_tech",
    email: "sarah@techstartup.com",
    company: "TechStartup Inc",
    status: "contacted",
    assignedTo: "intern-1",
    source: "twitter_search",
    engagementScore: 85,
    lastContact: "2024-01-15T10:30:00Z",
    notes: "Interested in our B2B solution. Follow up scheduled for next week.",
    tags: ["tech", "startup", "b2b"],
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Mike Chen",
    twitterHandle: "@mikechen_dev",
    email: "mike@devstudio.com",
    company: "DevStudio",
    status: "responded",
    assignedTo: "intern-2",
    source: "twitter_engagement",
    engagementScore: 92,
    lastContact: "2024-01-14T14:20:00Z",
    notes: "Very positive response. Wants to schedule a demo.",
    tags: ["developer", "agency", "high-priority"],
    createdAt: "2024-01-08T11:15:00Z",
    updatedAt: "2024-01-14T14:20:00Z",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    twitterHandle: "@emily_rodriguez",
    email: "emily@marketingpro.com",
    company: "MarketingPro Solutions",
    status: "qualified",
    assignedTo: "intern-1",
    source: "twitter_search",
    engagementScore: 78,
    lastContact: "2024-01-13T16:45:00Z",
    notes: "Qualified lead. Budget confirmed. Moving to proposal stage.",
    tags: ["marketing", "enterprise", "qualified"],
    createdAt: "2024-01-05T13:30:00Z",
    updatedAt: "2024-01-13T16:45:00Z",
  },
  {
    id: "4",
    name: "David Kim",
    twitterHandle: "@davidkim_ceo",
    email: "david@innovatecorp.com",
    company: "InnovateCorp",
    status: "new",
    assignedTo: undefined,
    source: "twitter_search",
    engagementScore: 65,
    lastContact: "2024-01-12T09:00:00Z",
    notes: "New lead from Twitter search. Need to research company size.",
    tags: ["ceo", "enterprise", "new"],
    createdAt: "2024-01-12T09:00:00Z",
    updatedAt: "2024-01-12T09:00:00Z",
  },
  {
    id: "5",
    name: "Lisa Thompson",
    twitterHandle: "@lisathompson_hr",
    email: "lisa@hrtech.com",
    company: "HR Tech Solutions",
    status: "converted",
    assignedTo: "intern-3",
    source: "referral",
    engagementScore: 95,
    lastContact: "2024-01-11T11:20:00Z",
    notes:
      "Successfully converted! Contract signed. Implementation starting next month.",
    tags: ["hr", "converted", "enterprise"],
    createdAt: "2024-01-02T10:00:00Z",
    updatedAt: "2024-01-11T11:20:00Z",
  },
  {
    id: "6",
    name: "Alex Turner",
    twitterHandle: "@alexturner_freelance",
    email: "alex@freelance.dev",
    company: "Freelance Developer",
    status: "lost",
    assignedTo: "intern-2",
    source: "twitter_engagement",
    engagementScore: 45,
    lastContact: "2024-01-10T15:30:00Z",
    notes: "Not interested in our solution. Budget constraints.",
    tags: ["freelance", "lost", "budget"],
    createdAt: "2024-01-07T12:00:00Z",
    updatedAt: "2024-01-10T15:30:00Z",
  },
  {
    id: "7",
    name: "Rachel Green",
    twitterHandle: "@rachelgreen_consultant",
    email: "rachel@consultingfirm.com",
    company: "Green Consulting",
    status: "contacted",
    assignedTo: "intern-1",
    source: "manual",
    engagementScore: 70,
    lastContact: "2024-01-14T13:15:00Z",
    notes: "Initial contact made. Waiting for response.",
    tags: ["consulting", "b2b", "contacted"],
    createdAt: "2024-01-09T14:20:00Z",
    updatedAt: "2024-01-14T13:15:00Z",
  },
  {
    id: "8",
    name: "James Wilson",
    twitterHandle: "@jameswilson_coo",
    email: "james@scaleup.com",
    company: "ScaleUp Ventures",
    status: "responded",
    assignedTo: "intern-3",
    source: "twitter_search",
    engagementScore: 88,
    lastContact: "2024-01-13T10:45:00Z",
    notes:
      "Positive response. Interested in enterprise features. Scheduling call.",
    tags: ["coo", "scaleup", "enterprise"],
    createdAt: "2024-01-06T16:30:00Z",
    updatedAt: "2024-01-13T10:45:00Z",
  },
];

export const mockInterns: Intern[] = [
  {
    id: "intern-1",
    name: "Alex Johnson",
    email: "alex.johnson@company.com",
    isActive: true,
    assignedLeads: 3,
    conversionRate: 67,
    lastActive: "2024-01-15T10:30:00Z",
  },
  {
    id: "intern-2",
    name: "Maria Garcia",
    email: "maria.garcia@company.com",
    isActive: true,
    assignedLeads: 2,
    conversionRate: 75,
    lastActive: "2024-01-15T09:15:00Z",
  },
  {
    id: "intern-3",
    name: "Tom Chen",
    email: "tom.chen@company.com",
    isActive: false,
    assignedLeads: 2,
    conversionRate: 50,
    lastActive: "2024-01-14T16:45:00Z",
  },
];

export const statusColors = {
  new: "secondary",
  contacted: "info",
  responded: "warning",
  qualified: "success",
  converted: "default",
  lost: "destructive",
} as const;
