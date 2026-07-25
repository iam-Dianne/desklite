"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ResultCard from "@/components/ResultCard";
import { toast } from "@/components/ui/toast";

const Homepage = () => {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setStatus("submitting");

    const { error } = await supabase.from("tickets").insert({ description });

    if (error) {
      console.log(error);
      setStatus("error");
      toast.add({
        type: "error",
        description: "Ticket could not be submitted.",
        priority: "high",
      });
      return;
    }

    setStatus("success");
    toast.add({
      type: "success",
      description: "Ticket has been submitted.",
    });
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

        <ResultCard />
      </form>
    </div>
  );
};

export default Homepage;
