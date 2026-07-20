import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim() && !image) {
      toast.error("Write something or choose an image.");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);

    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("access");

      await api.post("/posts/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Post created!");

      setContent("");
      setImage(null);

      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="What's on your mind?"
          className="w-full border rounded-lg p-3 mb-4"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Posting..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;