import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await api.get("/posts/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts(response.data.results || response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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
    <div className="min-h-screen bg-gray-300 py-8">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <CreatePost onPostCreated={fetchPosts} />
      {posts.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <div className="text-7xl mb-4">📭</div>

          <h2 className="text-2xl font-bold text-gray-700">
            No Posts Yet
          </h2>

          <p className="text-gray-500 mt-3">
            Be the first one to share something with the ConnectHub community!
          </p>
        </div>
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
    </div>

     </>
  );
 
}

export default Feed;