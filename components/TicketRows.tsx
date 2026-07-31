"use client";

import Link from "next/link";
import TicketBadges from "./TicketBadges";

type ticketRowItems = {
  id: string;
  category: string;
  priority: string;
  status: string;
  description: string;
  timestamp: string;
};

const TicketRows = ({
  id,
  category,
  priority,
  status,
  description,
  timestamp,
}: ticketRowItems) => {
  return (
    <Link
      href={`/tickets/${id}`}
      className="px-4 py-3 text-sm flex justify-between items-center border rounded-lg shadow-xs hover:scale-101 hover:bg-foreground/3"
    >
      <div className="flex flex-col gap-2">
        <div>{description}</div>
        <TicketBadges category={category} priority={priority} status={status} />
      </div>
      <div className="text-muted">{timestamp} ago</div>
    </Link>
  );
};

export default TicketRows;
