import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Search() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);
    setLoading(true);

    if (!value.trim()) {
      setUsers([]);
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("access");

      const res = await api.get(`/users/search/?search=${value}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data.results || res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };




  return (
    <div className="min-h-screen bg-gray-100 py-10">
     <div className="max-w-3xl mx-auto  mt-10 p-6">
      <h1 className="text-4xl font-extrabold text-center mb-2">
    🔍 Discover People
      </h1>

      <p className="text-center text-gray-500 mb-8">
          Find developers and connect with them.
      </p>

      <input
        type="text"
        placeholder="Search by username..."
        value={search}
        onChange={handleSearch}
        className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="mt-8 space-y-5">
        {search.trim() === "" && (
  <div className="bg-white rounded-2xl shadow-md p-10 text-center">
    <div className="text-6xl mb-4">🔍</div>

    <h2 className="text-2xl font-bold text-gray-700">
      Search ConnectHub
    </h2>

    <p className="text-gray-500 mt-3">
      Search by username to discover and connect with people.
    </p>
  </div>
)}
        {search && users.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center text-gray-500">
            <p className="text-lg font-semibold">No users found 😔</p>
            <p className="mt-2">Try searching with another username.</p>
          </div>
        )}

            {loading && (
        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-gray-600">
            Searching...
          </p>
        </div>
      )}
        {users.map((user) => {
            

        return (
        <div
  key={user.id}
  onClick={() => navigate(`/users/${user.id}`)}
  className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 cursor-pointer p-5 flex items-center justify-between"
>
  <div className="flex items-center gap-4">

    {user.profile_picture ? (
      <img
        src={user.profile_picture}
        alt={user.username}
        className="w-16 h-16 rounded-full object-cover border-2 border-pink-400"
      />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
              {user.username.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <h2 className="text-xl font-bold">
              @{user.username}
            </h2>

            <p className="text-gray-500">
              {user.email}
            </p>

            <p className="text-sm text-gray-400 mt-1">
              ConnectHub Member 🚀
            </p>
          </div>

        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition"
        >
          View Profile →
        </button>
      </div>
        );
})}
      </div>
    </div>
    </div>
  );
}

export default Search;