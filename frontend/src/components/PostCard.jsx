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
    <div className="bg-gray-100 rounded-3xl shadow-lg hover:shadow-2xl border border-blue-300 transition-all duration-300 overflow-hidden mb-8 p-8">
    <div className="flex items-center justify-between p-10">

  <div className="flex items-center gap-4">

    {post.profile_picture ? (
      <img
        src={`http://127.0.0.1:8000${post.profile_picture}`}
        alt={post.author}
        className="w-14 h-14 rounded-full object-cover border-2 border-blue-500 shadow"
      />
    ) : (
      <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
        {post.author.charAt(0).toUpperCase()}
      </div>
    )}

    <div>

      <h2
        onClick={() => navigate(`/users/${post.author_id}`)}
        className="font-bold text-lg cursor-pointer hover:text-blue-600"
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
  <p className="px-5 pb-4 text-gray-700 leading-8 text-[17px] whitespace-pre-wrap">
  {post.content}
</p>
)}

      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="w-full max-h-[600px] object-cover hover:scale-[1.02] transition duration-500"
        />
      )}

    <div className="flex items-center justify-between px-5 py-4 border-t">
      
     <div className="flex gap-4">
    <button
      onClick={handleLike}
      className={`px-5 py-2 rounded-full font-semibold transition ${
        liked
        ? "bg-red-100 text-red-600"
        : "bg-gray-100 hover:bg-gray-200"
        }`}
    >
      {liked ? "❤️ Liked" : "🤍 Like"}
    </button>

{loggedInUser === post.author && (
  isEditing ? (
    <>
      <button
        onClick={handleUpdate}
        className="px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        💾 Save
      </button>

      <button
        onClick={() => {
          setEditedContent(post.content);
          setIsEditing(false);
        }}
        className="px-5 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
      >
        ❌ Cancel
      </button>
    </>
  ) : (
    <button
      onClick={() => setIsEditing(true)}
      className="px-5 py-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition"
    >
      ✏️ Edit
    </button>
  )
)}

    {loggedInUser === post.author && (
      
  <button
    onClick={handleDelete}
    className="px-5 py-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition"
  >
    🗑 Delete
  </button>
)}
  </div>

<span className="font-semibold text-gray-700">
  ❤️ {likesCount} {likesCount === 1 ? "Like" : "Likes"}
</span>
</div>

     
      <Comments postId={post.id} />
    </div>
  );
}

export default PostCard;