"use client";
import TicketRows from "@/components/TicketRows";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { TicketResult } from "@/types/ticket";
import { formatDistanceToNow } from "date-fns";

const Tickets = () => {
  const [tickets, setTickets] = useState<TicketResult[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data: ticket, error: getError } = await supabase
        .from("tickets")
        .select();

      if (getError || !ticket) {
        console.log(getError);
        setError("There are currently no tickets to post.");
        return;
      }

      setTickets(ticket);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col py-24 container">
      <div className="p-2 mb-2 flex justify-between items-center border-b ">
        <p>The Queue</p>
        <Link href={"/"} className="hover:font-semibold">
          + new ticket
        </Link>
      </div>
      <div>
        <div className="mb-4">
          <p className="font-semibold text-2xl">Tickets</p>
          <p className="text-sm text-muted">
            {tickets.length} open, needs attention
          </p>
        </div>
        <p className="text-sm text-red-400">{error}</p>
        <div className="flex flex-col gap-3">
          {tickets.map((ticket) => (
            <div key={ticket.id}>
              <TicketRows
                category={ticket.category}
                priority={ticket.priority}
                description={ticket.description}
                timestamp={formatDistanceToNow(new Date(ticket.created_at), {
                  addSuffix: true,
                })}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tickets;
