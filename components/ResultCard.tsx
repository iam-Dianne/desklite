import React from "react";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import TicketBadges from "./TicketBadges";

const ResultCard = () => {
  return (
    <Card size="sm" className="text-sm">
      <CardHeader className="flex flex-col gap-2">
        <TicketBadges category="network" priority="medium" />
        <CardDescription>Suggested first steps</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <p>
          Restart your router, then check if other devices lose connection too —
          that tells us if it's your device or the network.
        </p>
        <div className="flex gap-3">
          <Button className={"flex-1"} size="sm">
            That fixed it
          </Button>
          <Button className={"flex-1"} size="sm" variant={"outline"}>
            Didn't work
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
