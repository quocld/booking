import Link from "next/link";
import Image from "next/image";

// Force static generation for 404 page
export const dynamic = 'force-static';
export const revalidate = false;

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <Image
            src="/Logo.svg"
            alt="Logo"
            width={120}
            height={30}
            className="mx-auto mb-4"
          />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
        
        <p className="text-gray-400 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or hasn't been implemented yet. 
          We're working hard to bring you more features.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/appointment/step-1"
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
} 