import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await api.get(`/comments/?post=${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setComments(response.data.results || response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load comments");
    }
  };
  const handleCommentSubmit = async () => {
  if (!content.trim()) {
    toast.error("Comment cannot be empty");
    return;
  }

  try {
    const token = localStorage.getItem("access");

    await api.post(
      "/comments/",
      {
        post: postId,
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setContent("");

    fetchComments();

    toast.success("Comment added!");
  } catch (error) {
    console.log(error);
    toast.error("Failed to add comment");
  }
};
const handleDeleteComment = async (id) => {
  const confirmDelete = window.confirm(
    "Delete this comment?"
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("access");

    await api.delete(`/comments/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== id)
    );

    toast.success("Comment deleted!");
  } catch (error) {
    console.log(error);
    toast.error("Failed to delete comment");
  }
};
const loggedInUser = localStorage.getItem("username");

  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold text-gray-800 mt-6 mb-4">Comments</h3>

      {comments.length === 0 ? (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-4 text-center text-gray-500">
          No comments yet. Be the first to comment 💬
          </div>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-gray-50 rounded-xl p-3 mb-3 border border-gray-200"
          >
            <p className="font-bold text-blue-600">
              {comment.author}
            </p>

           <p className="mt-1 text-gray-700 leading-6">
              {comment.content}
            </p>
            {loggedInUser === comment.author && (
                <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="mt-2 text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full hover:bg-red-200 transition"
                >
                    🗑 Delete
                </button>
                )}
          </div>
        ))
      )}
     <div className="mt-6 mb-6 .">
  <input
    type="text"
    value={content}
    onChange={(e) => setContent(e.target.value)}
    placeholder="Write a comment..."
    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <button
    onClick={handleCommentSubmit}
    className="mt-3 mr-6 ml-0 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
  >
    Post Comment
  </button>
</div>
    </div>
  );
}

export default Comments;