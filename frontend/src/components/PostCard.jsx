import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

function PostCard({ post }) {
  const [liked, setLiked] = useState(post.is_liked);
  const [likesCount, setLikesCount] = useState(post.likes_count);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("access");

      await api.post(
        `/posts/${post.id}/like/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (liked) {
        setLiked(false);
        setLikesCount((prev) => prev - 1);
      } else {
        setLiked(true);
        setLikesCount((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h2 className="font-bold text-lg">{post.author}</h2>

      <p className="mt-2">{post.content}</p>

      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="mt-4 rounded-lg w-full"
        />
      )}

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handleLike}
          className="text-blue-600 font-semibold hover:text-blue-800"
        >
          {liked ? "❤️ Liked" : "🤍 Like"}
        </button>

        <span className="text-gray-600">
          {likesCount} Likes
        </span>
      </div>

      <p className="text-sm text-gray-500 mt-3">
        {new Date(post.created_at).toLocaleString()}
      </p>
    </div>
  );
}

export default PostCard;