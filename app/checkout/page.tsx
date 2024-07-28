"use client";
import ProButton from "@/components/ProButton";
import ProgressBar from "@/components/ProgressBar";
import ReviewCart from "@/components/ReviewCart";
import { useState } from "react";

export default function Page() {
  const [currentStage, setCurrentStage] = useState(0);

  const stages = [
    <ReviewCart key="1" next={() => setCurrentStage(1)} />,
    // <DeliveryAddress
    //   next={() => setCurrentStage(2)}
    //   prev={() => setCurrentStage(0)}
    // />,
    // <Payment next={() => setCurrentStage(3)} prev={() => setCurrentStage(1)} />,
    // <OrderReview prev={() => setCurrentStage(2)} />,
  ];

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col p-2 sm:px-8 gap-4">
      <ProgressBar currentStage={currentStage} />
      <section>
        {stages[0]}
        <ProButton />
      </section>
    </div>
  );
}
