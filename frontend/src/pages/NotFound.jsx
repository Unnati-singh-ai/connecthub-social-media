import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-xl text-center">

        <div className="text-8xl mb-6">
          😵
        </div>

        <h1 className="text-6xl font-extrabold text-gray-800">
          404
        </h1>

        <h2 className="text-3xl font-bold mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-4">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/feed"
          className="inline-block mt-8 px-8 py-4 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
        >
          ← Back to Feed
        </Link>

      </div>

    </div>
  );
}

export default NotFound;