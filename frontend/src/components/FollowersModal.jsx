import { useEffect, useState } from "react";
import api from "../api/axios";

function FollowersModal({
  isOpen,
  onClose,
  title,
  url,
}) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await api.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data.results || response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl w-[400px] max-h-[500px] overflow-y-auto p-6">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-2xl font-bold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ✖
          </button>

        </div>

        {users.length === 0 ? (
          <p className="text-gray-500">
            No users found.
          </p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-4 border-b py-3"
            >
              {user.profile_picture ? (
                <img
                  src={user.profile_picture}
                  alt={user.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  {user.username[0].toUpperCase()}
                </div>
              )}

              <div>
                <h3 className="font-semibold">
                  {user.username}
                </h3>

                <p className="text-gray-500 text-sm">
                  {user.email}
                </p>
              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default FollowersModal;