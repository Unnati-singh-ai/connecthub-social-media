import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold">
          ConnectHub
        </h1>

        <div className="flex gap-6 items-center">
          <Link to="/feed" className="hover:underline">
            Feed
          </Link>

          <Link to="/profile" className="hover:underline">
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;