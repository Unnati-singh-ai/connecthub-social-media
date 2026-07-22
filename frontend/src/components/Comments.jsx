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
      <h3 className="font-semibold mb-2">Comments</h3>

      {comments.length === 0 ? (
        <p className="text-gray-500 text-sm">No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="border-b py-2"
          >
            <p className="font-semibold">
              {comment.author}
            </p>

            <p>{comment.content}</p>
            {loggedInUser === comment.author && (
                <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-red-600 text-sm mt-1 hover:text-red-800"
                >
                    🗑 Delete
                </button>
                )}
          </div>
        ))
      )}
      <div className="mt-4">
  <input
    type="text"
    value={content}
    onChange={(e) => setContent(e.target.value)}
    placeholder="Write a comment..."
    className="w-full border rounded-lg p-2"
  />

  <button
    onClick={handleCommentSubmit}
    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
  >
    Post Comment
  </button>
</div>
    </div>
  );
}

export default Comments;