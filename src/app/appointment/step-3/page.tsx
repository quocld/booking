'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Step3Page() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => {
    setSubmitted(true);
    // Có thể gọi API ở đây nếu cần
    // router.push("/appointment/success");
  };
  return (
    <div className="relative min-h-[300px]">
      <h1 className="text-2xl font-bold mb-4">Book an Appointment - Step 3</h1>
      <p className="text-gray-300">This is the final step of the multi-step appointment booking form.</p>
      {submitted && <div className="text-green-400 font-semibold mt-4">Submitted!</div>}
      <div className="flex flex-col xs:flex-row justify-center xs:justify-end gap-2 absolute xs:static right-0 bottom-0 w-full xs:w-auto">
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-1 px-4 rounded text-sm border border-gray-700"
          onClick={() => router.push('/appointment/step-2')}
        >
          Back
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded text-sm border border-blue-700"
          disabled={submitted}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
