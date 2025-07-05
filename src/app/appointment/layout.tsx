'use client';
import React, { useEffect } from 'react';
import { useBookingStore } from './bookingStore';
import { usePathname } from 'next/navigation';

const steps = [
  { label: 'Step 1', description: 'Client Information' },
  { label: 'Step 2', description: 'Services' },
  { label: 'Step 3', description: 'Review & Send' },
];

export default function AppointmentLayout({ children }: { children: React.ReactNode }) {
  const step = useBookingStore((state) => state.step);
  const hasHydrated = useBookingStore((state) => state._hasHydrated);
  const setStep = useBookingStore((state) => state.setStep);
  const pathname = usePathname();

  // Get step title from pathname to avoid flickering
  const getStepTitleFromPath = () => {
    if (pathname.includes('step-1')) return 'Client Information';
    if (pathname.includes('step-2')) return 'Services';
    if (pathname.includes('step-3')) return 'Review & Send';
    return ' ';
  };

  useEffect(() => {
    if (!hasHydrated) return;

    // Map pathname to step
    if (pathname.includes('step-1')) setStep(1);
    else if (pathname.includes('step-2')) setStep(2);
    else if (pathname.includes('step-3')) setStep(3);
  }, [pathname, setStep, hasHydrated]);

  // Don't render until hydrated to prevent flickering
  if (!hasHydrated) {
    return (
      <div
        className="px-4 py-6 gap-4"
        style={{
          background: 'linear-gradient(to bottom, #2d6fcc 0%,  #0F0F0F 16%, #0F0F0F 100%)',
        }}
      >
        <div className="w-full h-[52px] text-2xl font-bold content-center">
          {/* Use a neutral title during hydration to prevent mismatch */}

        </div>
        <div className="flex flex-col md:flex-row mt-4 gap-4">
          <div className="flex-1 bg-[#18181B] rounded-lg shadow-lg p-4">
            {children}
          </div>
          <aside className="w-full md:w-64 h-fit bg-[#18181B] rounded-lg shadow-lg p-4 flex flex-col items-center">
            <nav className="relative flex flex-col gap-5 w-full items-center mt-2">
              {steps.map((stepObj, idx) => {
                // During hydration, show all steps as inactive to prevent mismatch
                const isLast = idx === steps.length - 1;
                return (
                  <div key={stepObj.label} className="flex flex-col items-center w-full relative z-10 group">
                    <div className="flex items-center gap-7 w-full py-1">
                      <div className="relative flex flex-col items-center">
                        {/* Step icon */}
                        <span className="w-7 h-7 flex items-center justify-center">
                          <span className="w-7 h-7 rounded-full border-2 border-gray-200 flex items-center justify-center bg-transparent" />
                        </span>
                        {/* Line dọc nối các bước */}
                        {!isLast && (
                          <span className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-11 bg-gray-200 opacity-60" />
                        )}
                      </div>
                      <div className="flex flex-col justify-center select-none">
                        <div className="text-xs text-gray-400">{stepObj.label}</div>
                        <div className="text-lg font-bold text-gray-200">{stepObj.description}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </nav>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div
      className="px-4 py-6 gap-4"
      style={{
        background: 'linear-gradient(to bottom, #2d6fcc 0%,  #0F0F0F 16%, #0F0F0F 100%)',
      }}
    >
      <div className="w-full h-[52px] text-2xl font-bold content-center">
        {getStepTitleFromPath()}
      </div>
      <div className="flex flex-col md:flex-row mt-4 gap-4">
        <div className="flex-1 bg-[#18181B] rounded-lg shadow-lg p-4">
          {children}
        </div>
        <aside className="w-full md:w-64 h-fit bg-[#18181B] rounded-lg shadow-lg p-4 flex flex-col items-center">
          <nav className="relative flex flex-col gap-5 w-full items-center mt-2">
            {steps.map((stepObj, idx) => {
              const isActive = step === idx + 1;
              const isLast = idx === steps.length - 1;
              return (
                <div key={stepObj.label} className="flex flex-col items-center w-full relative z-10 group">
                  <div className="flex items-center gap-7 w-full py-1">
                    <div className="relative flex flex-col items-center">
                      {/* Step icon */}
                      <span className="w-7 h-7 flex items-center justify-center">
                        {isActive ? (
                          <span className="w-7 h-7 rounded-full border-3 border-blue-400 flex items-center justify-center bg-transparent">
                            <span className="w-3.5 h-3.5 rounded-full bg-blue-400 block" />
                          </span>
                        ) : (
                          <span className="w-7 h-7 rounded-full border-2 border-gray-200 flex items-center justify-center bg-transparent" />
                        )}
                      </span>
                      {/* Line dọc nối các bước */}
                      {!isLast && (
                        <span className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-11 bg-gray-200 opacity-60" />
                      )}
                    </div>
                    <div className="flex flex-col justify-center select-none">
                      <div className="text-xs text-gray-400">{stepObj.label}</div>
                      <div className={`text-lg font-bold ${isActive ? 'text-white' : 'text-gray-200'}`}>{stepObj.description}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
        </aside>
      </div>
    </div>
  );
}
