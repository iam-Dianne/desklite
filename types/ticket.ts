export type TicketCategory =
  | "hardware"
  | "network"
  | "software"
  | "security"
  | "other";
export type TicketPriority = "low" | "medium" | "high" | "critical";
export type TicketStatus = "open" | "resolved" | "escalated";

export type TriageResult = {
  ticket_category: TicketCategory;
  ticket_priority: TicketPriority;
  suggested_steps: string[];
};

export type TicketResult = {
  id: number;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  suggested_steps: string[];
  status: TicketStatus;
  created_at: string;
};
