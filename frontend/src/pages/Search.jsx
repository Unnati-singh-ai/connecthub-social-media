import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Search() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);

    if (!value.trim()) {
      setUsers([]);
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
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">Search Users</h1>

      <input
        type="text"
        placeholder="Search by username..."
        value={search}
        onChange={handleSearch}
        className="w-full border rounded-lg p-3"
      />

      <div className="mt-6 space-y-3">
        {users.map((user) => (
         <div
             key={user.id}
             onClick={() => navigate(`/users/${user.id}`)}
             className="border rounded-lg p-4 shadow cursor-pointer hover:bg-gray-100 transition"
            >
            <h2 className="font-bold text-lg">
              {user.username}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;