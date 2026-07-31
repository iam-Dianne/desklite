"use client";
import TicketRows from "@/components/TicketRows";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { TicketResult } from "@/types/ticket";
import { formatDistanceToNow } from "date-fns";
import TicketNavbar from "@/components/TicketNavbar";

const Tickets = () => {
  const [tickets, setTickets] = useState<TicketResult[]>([]);
  const [error, setError] = useState("");
  const [escalatedCount, setEscalatedCount] = useState<number | null>();

  useEffect(() => {
    const fetchData = async () => {
      const { data: ticket, error: getError } = await supabase
        .from("tickets")
        .select()
        .order("created_at", { ascending: false });

      if (getError || !ticket) {
        console.log(getError);
        setError("There are currently no tickets to post.");
        return;
      }

      const sorted = [...ticket].sort((a, b) => {
        const aWeight = a.status === "escalated" ? 0 : 1;
        const bWeight = b.status === "escalated" ? 0 : 1;
        return aWeight - bWeight;
      });

      setTickets(sorted);

      const { count, error } = await supabase
        .from("tickets")
        .select("*", { count: "exact", head: true })
        .eq("status", "escalated");

      setEscalatedCount(count);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col py-24 container">
      <TicketNavbar />
      <div>
        <div className="mb-4">
          <p className="font-semibold text-2xl">Tickets</p>
          <p className="text-sm text-muted">
            {tickets.length} open, {escalatedCount} needs attention
          </p>
        </div>
        <p className="text-sm text-red-400">{error}</p>
        <div className="flex flex-col gap-3">
          {tickets.map((ticket) => (
            <div key={ticket.id}>
              <TicketRows
                id={ticket.id}
                category={ticket.category}
                priority={ticket.priority}
                status={ticket.status}
                description={ticket.description}
                timestamp={formatDistanceToNow(
                  new Date(
                    ticket.created_at +
                      (ticket.created_at.endsWith("Z") ? "" : "Z"),
                  ),
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tickets;
