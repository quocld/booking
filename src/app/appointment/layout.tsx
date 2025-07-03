"use client";
import React, { useEffect } from "react";
import { useBookingStore } from "./bookingStore";
import { usePathname } from "next/navigation";

const steps = [
  { label: "Step 1", description: "Client & Vehicle" },
  { label: "Step 2", description: "Details" },
  { label: "Review", description: "Confirm" },
];

export default function AppointmentLayout({ children }: { children: React.ReactNode }) {
  const step = useBookingStore((state) => state.step);
  const stepDescription = steps.find((_, idx) => idx + 1 === step)?.description;
  const setStep = useBookingStore((state) => state.setStep);
  const pathname = usePathname();

  useEffect(() => {
    // Map pathname to step
    if (pathname.includes("step-1")) setStep(1);
    else if (pathname.includes("step-2")) setStep(2);
    else if (pathname.includes("step-3")) setStep(3);
  }, [pathname, setStep]);

  return (
    <div>
      <div>{stepDescription}</div>
      <div className="flex max-w-5xl mx-auto mt-8">
        <div className="flex-1 bg-gray-900 rounded-l-lg shadow-lg p-8">
          {children}
        </div>
        <aside className="w-56 bg-gray-950 rounded-r-lg shadow-lg p-8 flex flex-col items-center">
          <nav className="flex flex-col gap-8 w-full">
            {steps.map((stepObj, idx) => (
              <div key={stepObj.label} className="flex items-center gap-4">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-lg font-bold ${step === idx + 1 ? 'bg-blue-600 border-blue-600 text-white' : 'bg-gray-800 border-gray-700 text-gray-400'}`}>{idx + 1}</div>
                <div>
                  <div className="font-semibold text-gray-100">{stepObj.label}</div>
                  <div className="text-xs text-gray-400">{stepObj.description}</div>
                </div>
              </div>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  );
}