import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchProfile();
    fetchMyPosts();
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
      toast.error("Failed to load profile");
    }
  };

 
  const fetchMyPosts = async () => {
  try {
    const token = localStorage.getItem("access");

    const response = await api.get("/posts/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const username = localStorage.getItem("username");

    const myPosts = (response.data.results || response.data).filter(
      (post) => post.author === username
    );

    setPosts(myPosts);
  } catch (error) {
    console.log(error);
    toast.error("Failed to load posts");
  }
};
  if (!profile) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  return (
    <>
      <Navbar />

      <div className="max-w-2xl mx-auto mt-10 bg-white shadow rounded-lg p-6">

        <h1 className="text-3xl font-bold mb-6">
          My Profile
        </h1>
        <div className="flex justify-center mb-6">
          {profile.profile_picture ? (
            <img
              src={`http://127.0.0.1:8000${profile.profile_picture}`}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
              No Image
            </div>
          )}
        </div>

        <div className="space-y-4">

          <div>
            <p className="text-gray-500">Username</p>
            <h2 className="text-xl font-semibold">
              {profile.username}
            </h2>
          </div>

          <div>
            <p className="text-gray-500">Email</p>
            <h2 className="text-lg">
              {profile.email}
            </h2>
          </div>

          <div>
            <p className="text-gray-500">Bio</p>
            <p>{profile.bio || "No bio added yet."}</p>
          </div>

          <div className="flex gap-10 mt-6">

            <div>
              <p className="text-gray-500">Followers</p>
              <h2 className="text-2xl font-bold">
                {profile.followers_count}
              </h2>
            </div>

            <div>
              <p className="text-gray-500">Following</p>
              <h2 className="text-2xl font-bold">
                {profile.following_count}
              </h2>
            </div>

          </div>

          <Link
            to="/profile/edit"
            className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit Profile
          </Link>

        </div>
              </div>

      <div className="max-w-2xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">
          My Posts
        </h2>

        {posts.length === 0 ? (
          <p>You haven't created any posts yet.</p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              posts={posts}
              setPosts={setPosts}
            />
          ))
        )}
      </div>
    

      
    </>
  );
}

export default Profile;