import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function UserProfile() {
  const { id } = useParams();

  const [user, setUser] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);

  const [posts, setPosts] = useState([]);

 

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("access");

      const res = await api.get(`/users/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleFollow = async () => {
  try {
    const token = localStorage.getItem("access");

    await api.post(
      `/users/${id}/follow/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchUser();
  } catch (err) {
    console.log(err);
  }
};

const fetchCurrentUser = async () => {
  try {
    const token = localStorage.getItem("access");

    const res = await api.get("/users/profile/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setCurrentUser(res.data);
  } catch (err) {
    console.log(err);
  }
};

const fetchUserPosts = async () => {
  try {
    const token = localStorage.getItem("access");

    const res = await api.get(`/posts/user/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setPosts(res.data.results || res.data);
  } catch (err) {
    console.log(err);
  }
};

 useEffect(() => {
    fetchUser();
    fetchCurrentUser();
    fetchUserPosts();
  }, [id]);

    if (!user) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-3xl font-bold">{user.username}</h1>

      <p className="mt-2 text-gray-600">{user.email}</p>

      <div className="flex gap-8 mt-6">
        <div>
          <strong>{user.followers_count}</strong>
          <p>Followers</p>
        </div>

        <div>
          <strong>{user.following_count}</strong>
          <p>Following</p>
        </div>
      </div>
     {currentUser && currentUser.id !== user.id && (
  <button
    onClick={handleFollow}
    className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
  >
    {user.is_following ? "Unfollow" : "Follow"}
  </button>
)}

   <div className="mt-8">
  <h2 className="text-2xl font-bold mb-4">Posts</h2>

  {posts.length === 0 ? (
    <p className="text-gray-500">No posts yet.</p>
  ) : (
    posts.map((post) => (
      <div
        key={post.id}
        className="border rounded-lg p-4 shadow mb-4"
      >
        <p>{post.content}</p>
      </div>
    ))
  )}
</div>
    </div>
  );
}

export default UserProfile;