import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import Comments from "./Comments";
import { useNavigate } from "react-router-dom";

function PostCard({ post, posts, setPosts  }) {
  const [liked, setLiked] = useState(post.is_liked);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const navigate = useNavigate();
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
  const handleDelete = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this post?"
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("access");

    await api.delete(`/posts/${post.id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Remove the deleted post from the UI
    setPosts(posts.filter((p) => p.id !== post.id));

    toast.success("Post deleted successfully!");
  } catch (error) {
    console.log(error);
    toast.error("Failed to delete post.");
  }
};
const handleUpdate = async () => {
  try {
    const token = localStorage.getItem("access");

    const response = await api.patch(
      `/posts/${post.id}/`,
      {
        content: editedContent,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Update the post in the UI
    setPosts(
      posts.map((p) =>
        p.id === post.id ? response.data : p
      )
    );

    setIsEditing(false);

    toast.success("Post updated successfully!");
  } catch (error) {
    console.log(error);
    toast.error("Failed to update post.");
  }
};

const loggedInUser = localStorage.getItem("username");

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
     <div className="flex items-center justify-between mb-4">
  <div className="flex items-center gap-3">

    {post.profile_picture ? (
      <img
        src={`http://127.0.0.1:8000${post.profile_picture}`}
        alt="Profile"
        className="w-12 h-12 rounded-full object-cover border"
      />
    ) : (
      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
        {post.author.charAt(0).toUpperCase()}
      </div>
    )}

    <div>
      <h2
        onClick={() => navigate(`/users/${post.author_id}`)}
        className="text-lg font-bold text-blue-600 cursor-pointer hover:underline"
      >
        @{post.author}
      </h2>

      <p className="text-sm text-gray-500">
        {new Date(post.created_at).toLocaleString()}
      </p>
    </div>

  </div>
</div>

    {isEditing ? (
  <textarea
    value={editedContent}
    onChange={(e) => setEditedContent(e.target.value)}
    className="w-full border rounded-lg p-2 mt-2"
    rows={3}
  />
) : (
  <p className="mt-2">{post.content}</p>
)}

      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="mt-4 rounded-lg w-full"
        />
      )}

    <div className="flex items-center justify-between mt-4">
      
     <div className="flex gap-4">
    <button
      onClick={handleLike}
      className="text-blue-600 font-semibold hover:text-blue-800"
    >
      {liked ? "❤️ Liked" : "🤍 Like"}
    </button>

{loggedInUser === post.author && (
  isEditing ? (
    <>
      <button
        onClick={handleUpdate}
        className="text-green-600 font-semibold hover:text-green-800"
      >
        💾 Save
      </button>

      <button
        onClick={() => {
          setEditedContent(post.content);
          setIsEditing(false);
        }}
        className="text-gray-600 font-semibold hover:text-gray-800"
      >
        ❌ Cancel
      </button>
    </>
  ) : (
    <button
      onClick={() => setIsEditing(true)}
      className="text-green-600 font-semibold hover:text-green-800"
    >
      ✏️ Edit
    </button>
  )
)}

    {loggedInUser === post.author && (
      
  <button
    onClick={handleDelete}
    className="text-red-600 font-semibold hover:text-red-800"
  >
    🗑 Delete
  </button>
)}
  </div>

  <span className="text-gray-600">
    {likesCount} Likes
  </span>
</div>

     
      <Comments postId={post.id} />
    </div>
  );
}

export default PostCard;