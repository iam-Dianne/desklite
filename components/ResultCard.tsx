import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import TicketBadges from "./TicketBadges";
import { RESOLVED_MESSAGE, ESCALATED_MESSAGE } from "@/lib/ticketMessages";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

type resultItems = {
  id: number;
  category: string;
  priority: string;
  status: string;
  suggestedStep: string[];
};

const ResultCard = ({
  id,
  category,
  priority,
  status,
  suggestedStep,
}: resultItems) => {
  const [feedback, setFeedback] = useState<"resolved" | "escalated" | null>(
    null,
  );

  const handleEscalated = async () => {
    const { data: updateData, error: updateError } = await supabase
      .from("tickets")
      .update({ status: "escalated" })
      .eq("id", id);

    setFeedback("escalated");

    if (updateError) {
      console.error(updateError);
    }
  };

  const handleResolved = async () => {
    const { data: updateData, error: updateError } = await supabase
      .from("tickets")
      .update({ status: "resolved" })
      .eq("id", id);

    setFeedback("resolved");

    if (updateError) {
      console.error(updateError);
    }
  };

  return (
    <Card size="sm" className="text-sm">
      {feedback ? (
        // button response
        <CardContent className="flex flex-col gap-6">
          <p
            className={
              feedback === "resolved"
                ? "p-2 bg-primary/10 text-primary border-primary/30"
                : "p-2 bg-red-500/10 text-red-500 border-red-500/30"
            }
          >
            {feedback === "escalated"
              ? ESCALATED_MESSAGE.message
              : RESOLVED_MESSAGE.message}
          </p>
        </CardContent>
      ) : (
        <>
          <CardHeader className="flex flex-col gap-2">
            <TicketBadges
              status={status}
              category={category}
              priority={priority}
            />
            <CardDescription>Suggested first steps</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <ul className="list-disc list-inside space-y-1 text-sm">
              {suggestedStep.slice(0, 2).map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>

            <div className="flex gap-3">
              <Button onClick={handleResolved} className={"flex-1"} size="sm">
                That fixed it
              </Button>
              <Button
                onClick={handleEscalated}
                className={"flex-1"}
                size="sm"
                variant={"outline"}
              >
                Didn't work
              </Button>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default ResultCard;
