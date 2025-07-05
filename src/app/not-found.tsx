import Link from 'next/link';
import Image from 'next/image';

// Force static generation for 404 page
export const dynamic = 'force-static';
export const revalidate = false;

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <Image
            alt="Logo"
            className="mx-auto mb-4"
            height={30}
            src="/Logo.svg"
            width={120}
          />
        </div>

        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>

        <p className="text-gray-400 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or hasn&apos;t been implemented yet.
          We&apos;re working hard to bring you more features.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            href="/"
          >
            Go Home
          </Link>
          <Link
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            href="/appointment/step-1"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}
