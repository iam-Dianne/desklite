import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <div className="h-100 flex justify-center items-center ">
      <Loader2Icon
        data-slot="spinner"
        role="status"
        aria-label="Loading"
        className={cn("size-8 animate-spin", className)}
        {...props}
      />
    </div>
  );
}

export { Spinner };
