"use client";

import TicketBadges from "./TicketBadges";

type ticketRowItems = {
  category: string;
  priority: string;
  description: string;
  timestamp: string;
};

const TicketRows = ({
  category,
  priority,
  description,
  timestamp,
}: ticketRowItems) => {
  return (
    <div className="px-4 py-3 text-sm flex justify-between items-center border rounded-lg shadow-xs">
      <div className="flex flex-col gap-2">
        <div>{description}</div>
        <TicketBadges category={category} priority={priority} />
      </div>
      <div className="text-muted">{timestamp}</div>
    </div>
  );
};

export default TicketRows;
