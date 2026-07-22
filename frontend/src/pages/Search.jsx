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
        {users.map((user) => {
            console.log(user.profile_picture);

        return (
         <div
            key={user.id}
            onClick={() => navigate(`/users/${user.id}`)}
            className="border rounded-lg p-4 shadow cursor-pointer hover:bg-gray-100 transition flex items-center gap-4"
            >
            {user.profile_picture ? (
                <img
                    src={user.profile_picture}
                    alt={user.username}
                    className="w-14 h-14 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                    {user.username.charAt(0).toUpperCase()}
                    </div>
                )}

  <div>
    <h2 className="font-bold text-lg">{user.username}</h2>
    <p className="text-gray-500">{user.email}</p>
  </div>
</div>
        );
})}
      </div>
    </div>
  );
}

export default Search;