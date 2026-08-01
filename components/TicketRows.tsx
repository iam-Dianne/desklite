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
      className="p-2 md:px-4 md:py-3 text-sm flex justify-between items-center gap-2 border rounded-lg shadow-xs hover:scale-101 hover:bg-foreground/3"
    >
      <div className="w-3/4 flex flex-col gap-2">
        <div className="text-xs md:text-sm">{description}</div>
        <TicketBadges category={category} priority={priority} status={status} />
      </div>
      <div className="w-1/4 text-end text-muted text-xs">{timestamp} ago</div>
    </Link>
  );
};

export default TicketRows;
