import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";
import Navbar from "../components/Navbar";

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
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  return (
    <>
        <Navbar />
    <div className="max-w-2xl mx-auto mt-10">
        <CreatePost onPostCreated={fetchPosts} />
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
      posts.map((post) => (
        <PostCard
            key={post.id}
            post={post}
        />
    ))
 )}
    </div>
     </>
  );
 
}

export default Feed;