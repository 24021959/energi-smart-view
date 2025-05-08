
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type CalendarProps = React.HTMLAttributes<HTMLDivElement>;

function Calendar({
  className,
  ...props
}: CalendarProps) {
  // Simplified calendar component that doesn't depend on react-day-picker
  return (
    <div className={cn("p-3", className)} {...props}>
      <div className="flex justify-between items-center mb-2">
        <Button variant="outline" size="icon" className="h-7 w-7">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-sm font-medium">Calendar view simplified</div>
        <Button variant="outline" size="icon" className="h-7 w-7">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
          <div key={day} className="text-center text-xs text-muted-foreground">
            {day}
          </div>
        ))}
        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
          <Button
            key={day}
            variant="ghost"
            className="h-9 w-9 p-0 font-normal text-center"
          >
            {day}
          </Button>
        ))}
      </div>
    </div>
  );
}

export { Calendar };
