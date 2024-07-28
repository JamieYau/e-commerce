import { cn } from "@/lib/utils";
import {
  ShoppingCart,
  Truck,
  CreditCard,
  SquareGanttChart,
} from "lucide-react";
import React from "react";

export default function ProgressBar({
  currentStage,
}: {
  currentStage: number;
}) {
  const stages = ["Cart", "Shipping", "Payment", "Review"];
  const icons = [ShoppingCart, Truck, CreditCard, SquareGanttChart];

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-full max-w-lg items-center justify-between gap-1">
        {stages.map((stage, index) => {
          const Icon = icons[index];
          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    "rounded-full p-2",
                    index <= currentStage ? "bg-primary" : "bg-muted",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5",
                      index <= currentStage
                        ? "stroke-background"
                        : "stroke-muted-foreground",
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "text-sm font-medium",
                    index <= currentStage
                      ? "font-semibold text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {stage}
                </span>
              </div>
              {index < stages.length - 1 && (
                <div className="h-1 flex-1 bg-gray-200"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
