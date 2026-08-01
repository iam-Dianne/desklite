"use client";
import TicketNavbar from "@/components/TicketNavbar";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TicketResult } from "@/types/ticket";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import TicketBadges from "@/components/TicketBadges";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const TicketPage = () => {
  const [ticket, setTicket] = useState<TicketResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error: getError } = await supabase
        .from("tickets")
        .select()
        .eq("id", params.id)
        .single();

      if (!data || getError) {
        console.log(getError);
      }

      setTicket(data);
      setLoading(false);
    };

    fetchData();
  }, [params.id]);

  const handleToggleStatus = async () => {
    if (!ticket) return;

    const newStatus = ticket.status === "resolved" ? "escalated" : "resolved";

    const { error: updateError } = await supabase
      .from("tickets")
      .update({ status: newStatus })
      .eq("id", ticket.id);

    if (!updateError) {
      setTicket({ ...ticket, status: newStatus });
    }
  };

  return (
    <div className="flex flex-col gap-6 py-24 container">
      <TicketNavbar />
      <Link
        href={"/tickets"}
        className="text-muted text-sm flex gap-2 items-center "
      >
        <ArrowLeft size={16} /> back to tickets
      </Link>
      {loading && <Spinner />}
      {!loading && !ticket && (
        <p className="text-red-500 text-center">Ticket not found :(</p>
      )}
      {!loading && ticket && (
        <div className="flex flex-col gap-2">
          <TicketBadges
            category={ticket.category}
            priority={ticket.priority}
            status={ticket.status}
          />
          <p className="text-sm text-muted">
            Submitted{" "}
            {formatDistanceToNow(
              new Date(
                ticket.created_at +
                  (ticket.created_at.endsWith("Z") ? "" : "Z"),
              ),
            )}{" "}
            {""} ago
          </p>
          <div className="p-3 border border-muted/30 rounded-lg">
            <p className="text-muted">Description</p>
            <p>{ticket.description}</p>
          </div>
          <div className="p-3 mb-3 border border-muted/30 rounded-lg">
            <p className="text-muted">Suggested Steps</p>
            {ticket.suggested_steps && ticket.suggested_steps.length > 0 ? (
              ticket.suggested_steps.map((step, index) => (
                <p className="px-2" key={index}>
                  {">"} {step}
                </p>
              ))
            ) : (
              <p className="px-2 text-muted text-sm">
                No suggestions available yet.
              </p>
            )}
          </div>
          <Button
            onClick={handleToggleStatus}
            variant="outline"
            className="cursor-pointer"
          >
            {ticket.status === "resolved"
              ? "Reopen ticket"
              : "Mark as resolved"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TicketPage;
