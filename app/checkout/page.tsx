"use client"
import ProButton from "@/components/ProButton";
import ProgressBar from "@/components/ProgressBar";
import { useState } from "react";

export default function Page() {
  const [currentStage, setCurrentStage] = useState(0);

  return (
    <div className="w-full">
      <ProgressBar currentStage={currentStage} />
      <ProButton />
    </div>
  );
}
