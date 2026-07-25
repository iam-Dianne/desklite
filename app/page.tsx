"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ResultCard from "@/components/ResultCard";
import { toast } from "@/components/ui/toast";
import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

type TriageResult = {
  ticket_category: string;
  ticket_priority: string;
  suggested_steps: string[];
};

const Homepage = () => {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [result, setResult] = useState<TriageResult | null>(null);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setStatus("submitting");

    const { data: ticket, error: insertError } = await supabase
      .from("tickets")
      .insert({ description })
      .select()
      .single();

    if (insertError || !ticket) {
      console.log(insertError);
      setStatus("error");
      toast.add({
        type: "error",
        description: "Ticket could not be submitted.",
        priority: "high",
      });
      return;
    }

    const res = await fetch("/api/triage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    });

    if (!res.ok) {
      setStatus("error");
      toast.add({
        type: "error",
        description: "Ticket saved, but triage failed.",
        priority: "high",
      });
      return;
    }

    const triage = await res.json();

    const { data: updateData, error: updateError } = await supabase
      .from("tickets")
      .update({
        category: triage.ticket_category,
        priority: triage.ticket_priority,
        suggested_steps: triage.suggested_steps,
      })
      .eq("id", ticket.id);

    console.log("update result:", updateData, updateError);

    if (updateError) {
      console.error(updateError);
    }

    setResult(triage);
    setStatus("success");
    toast.add({ type: "success", description: "Ticket has been submitted." });
    setDescription("");
  };

  return (
    <div className="min-h-screen w-full px-4 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-120 flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold">What's going on?</h1>
          <p className="text-foreground/80 text-sm">
            Describe your tech issue in plain english — we'll figure out the
            rest.
          </p>
        </div>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="my wifi keeps dropping every few minutes"
        />
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Submitting..." : "Submit ticket"}
        </Button>

        {status === "success" && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.3 }}
          >
            <ResultCard
              category={result.ticket_category}
              priority={result.ticket_priority}
              suggestedStep={result.suggested_steps}
            />
          </motion.div>
        )}
      </form>
    </div>
  );
};

export default Homepage;
