import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-bgcColor">
      <h1 className="mb-4 text-6xl font-bold text-red-500">404</h1>
      <p className="mb-8 text-xl text-gray-300">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        to="/FindAndSearch"
        className="px-4 py-2 text-white transition duration-300 rounded bg-primary hover:bg-primaryDarker"
      >
        Go back to Home
      </Link>
    </div>
  );
}
