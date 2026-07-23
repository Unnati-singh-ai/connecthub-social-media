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
  <div className="bg-gray-100 rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">

    <h2 className="text-xl font-bold mb-4 text-gray-800">
      ✨ Create a New Post
    </h2>

    <form onSubmit={handleSubmit}>

      <textarea
        placeholder="What's on your mind today?"
        className="w-full border border-gray-300 rounded-xl p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition"
        rows={5}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {image && (
        <p className="mt-3 text-sm text-green-600">
          📷 {image.name}
        </p>
      )}

      <div className="flex justify-between items-center mt-5">

        <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition">

          📷 Add Photo

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="hidden"
          />

        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition disabled:opacity-50"
        >
          {loading ? "Posting..." : "🚀 Create Post"}
        </button>

      </div>

    </form>

  </div>
);
}

export default CreatePost;