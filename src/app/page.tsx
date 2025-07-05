import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehicle Service Booking System",
  description: "Professional vehicle service booking and management system",
};

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

// This page can be statically generated
export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white m-10">
          Vehicle Service Booking System
        </h1>
        
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          Streamline your vehicle service appointments with our professional booking system. 
          Easy scheduling, client management, and service tracking all in one place.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/appointment/step-1"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
          >
            Book Appointment
          </Link>
          <Link
            href="/appointment/step-1"
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
          >
            View Services
          </Link>
        </div>
      </div>
    </div>
  );
}
