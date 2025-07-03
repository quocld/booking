import React from "react";

export default function AppointmentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-xl mx-auto bg-gray-900 rounded-lg shadow-lg p-8 mt-8">
      {/* Step indicator placeholder */}
      <div className="mb-6 text-gray-400">Step indicator here</div>
      {children}
    </div>
  );
} 