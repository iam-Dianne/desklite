import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import TicketBadges from "./TicketBadges";

type resultItems = {
  category: string;
  priority: string;
  suggestedStep: string[];
};

const ResultCard = ({ category, priority, suggestedStep }: resultItems) => {
  return (
    <Card size="sm" className="text-sm">
      <CardHeader className="flex flex-col gap-2">
        <TicketBadges category={category} priority={priority} />
        <CardDescription>Suggested first steps</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <ul className="list-disc list-inside space-y-1 text-sm">
          {suggestedStep.slice(0, 2).map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>

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
