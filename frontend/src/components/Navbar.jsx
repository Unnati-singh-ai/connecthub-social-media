import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

function Navbar() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

useEffect(() => {
  fetchProfile();
}, []);

const fetchProfile = async () => {
  try {
    const token = localStorage.getItem("access");

    const response = await api.get("/users/profile/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setProfile(response.data);
  } catch (error) {
    console.log(error);
  }
};

 const handleLogout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("username");

  navigate("/");
};

  return (
    <nav className="bg-blue-500 text-white shadow">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <Link
          to="/feed"
          className="text-3xl font-extrabold tracking-wide"
        >
          ConnectHub
        </Link>

     <div className="flex items-center gap-8 text-lg">

  <Link to="/feed" className="hover:text-blue-200 transition duration-200">
    Feed
  </Link>

  <Link to="/search" className="hover:text-blue-200 transition duration-200">
    Search
  </Link>

  <Link to="/profile" className="flex items-center gap-2 hover:text-blue-200 transition">

    {profile?.profile_picture ? (
      <img
        src={`http://127.0.0.1:8000${profile.profile_picture}`}
        alt="Profile"
        className="w-10 h-10 rounded-full object-cover border-2 border-white"
      />
    ) : (
      <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold">
        {profile?.username?.charAt(0).toUpperCase() || "U"}
      </div>
    )}

    <span className="hover:underline">
      Profile
    </span>

  </Link>

  <button
    onClick={handleLogout}
    className="bg-red-500 px-5 py-2 rounded-full hover:bg-red-600 transition shadow"
  >
    Logout
  </button>

   </div>
      </div>
    </nav>
  );
}

export default Navbar;