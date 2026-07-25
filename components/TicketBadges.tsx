import { Badge } from "./ui/badge";

const priorityStyles: Record<string, string> = {
  low: "bg-muted text-muted-foreground border-muted-foreground/20",
  medium: "bg-secondary/10 text-accent-orange border-secondary/30",
  high: "bg-orange-600/10 text-orange-600 border-orange-600/30",
  critical: "bg-red-600/10 text-red-600 border-red-600/30",
};

const categoryStyles: Record<string, string> = {
  hardware: "bg-primary/10 text-primary border-primary/30",
  network: "bg-primary/10 text-primary border-primary/30",
  software: "bg-blue-600/10 text-blue-600 border-blue-600/30",
  security: "bg-purple-600/10 text-purple-600 border-purple-600/30",
  other: "bg-muted text-muted-foreground border-muted-foreground/20",
};

type TicketBadgesProps = {
  category: string;
  priority: string;
};

const TicketBadges = ({ category, priority }: TicketBadgesProps) => {
  return (
    <div className="flex gap-2">
      <Badge className={categoryStyles[category] ?? categoryStyles.other}>
        {category}
      </Badge>
      <Badge className={priorityStyles[priority] ?? priorityStyles.other}>
        {priority}
      </Badge>
    </div>
  );
};

export default TicketBadges;
