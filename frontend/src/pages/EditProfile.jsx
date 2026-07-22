import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    profile_picture: null,
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("access");

      const res = await api.get("/users/profile/edit/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData({
        username: res.data.username || "",
        bio: res.data.bio || "",
        profile_picture: null,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access");

      const data = new FormData();

      data.append("username", formData.username);
      data.append("bio", formData.bio);

      if (formData.profile_picture) {
        data.append("profile_picture", formData.profile_picture);
      }

      await api.put("/users/profile/edit/", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile Updated Successfully!");

      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full border p-3 rounded"
        />

        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Bio"
          rows="4"
          className="w-full border p-3 rounded"
        />

        <input
          type="file"
          name="profile_picture"
          accept="image/*"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Save Changes
        </button>

      </form>
    </div>
  );
}

export default EditProfile;