import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";
import FollowersModal from "../components/FollowersModal";
import LoadingSpinner from "../components/LoadingSpinner";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalUrl, setModalUrl] = useState("");

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
  return (
    <>
      <Navbar />
      <LoadingSpinner />
    </>
  );
}

  return (
    <>
      <Navbar />

      <div className="max-w-2xl mx-auto mt-10 bg-gray-300 shadow rounded-lg p-6">

        <h1 className="text-3xl font-bold mb-6">
          My Profile
        </h1>
        <div className="flex justify-center mb-6">
          {profile.profile_picture ? (
            <img
              src={`http://127.0.0.1:8000${profile.profile_picture}`}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
              No Image
            </div>
          )}
        </div>

        <div className="space-y-5 text-center bg-gray-300">

          <div>
            <p className="text-gray-500">Username</p>
            <h2 className="text-3xl font-bold">
                @{profile.username}
              </h2>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              {profile.email}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-lg mb-2">
              📝 About
            </h3>

            <p className="text-gray-700">
              {profile.bio || "No bio added yet."}
            </p>
          </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
         <div
          onClick={() => {
            setModalTitle("Followers");
            setModalUrl(`/users/${profile.id}/followers/`);
            setModalOpen(true);
          }}
          className="bg-blue-50 rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition"
        >
          <p className="text-gray-600">
            Followers
          </p>

          <h2 className="text-3xl font-bold text-blue-600">
            {profile.followers_count}
          </h2>
        </div>

          <div
            onClick={() => {
              setModalTitle("Following");
              setModalUrl(`/users/${profile.id}/following/`);
              setModalOpen(true);
            }}
            className="bg-green-50 rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition"
          >
            <p className="text-gray-600">
              Following
            </p>

            <h2 className="text-3xl font-bold text-green-600">
              {profile.following_count}
            </h2>
          </div>

        </div>

          <Link
            to="/profile/edit"
            className="inline-block mt-6 bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition shadow-lg"
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
    <FollowersModal
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      title={modalTitle}
      url={modalUrl}
    />

      
    </>
  );
}

export default Profile;