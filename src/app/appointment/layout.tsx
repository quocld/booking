import React from "react";

const steps = [
  { label: "Step 1", description: "Client & Vehicle" },
  { label: "Step 2", description: "Details" },
  { label: "Review", description: "Confirm" },
];

export default function AppointmentLayout({ children }: { children: React.ReactNode }) {
  // This will only work in client components, so for now, highlight step 1 statically
  // For dynamic highlight, use a client component or pass step as prop
  return (
    <div className="flex max-w-5xl mx-auto mt-8">
      <div className="flex-1 bg-gray-900 rounded-l-lg shadow-lg p-8">
        {children}
      </div>
      <aside className="w-56 bg-gray-950 rounded-r-lg shadow-lg p-8 flex flex-col items-center">
        <nav className="flex flex-col gap-8 w-full">
          {steps.map((step, idx) => (
            <div key={step.label} className="flex items-center gap-4">
              <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-lg font-bold ${idx === 0 ? 'bg-blue-600 border-blue-600 text-white' : 'bg-gray-800 border-gray-700 text-gray-400'}`}>{idx + 1}</div>
              <div>
                <div className="font-semibold text-gray-100">{step.label}</div>
                <div className="text-xs text-gray-400">{step.description}</div>
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </div>
  );
} 