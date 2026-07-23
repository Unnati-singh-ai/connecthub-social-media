import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await api.post("/users/register/", {
        username,
        email,
        password,
      });

      toast.success("Registration successful!");

      navigate("/");
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">

      <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-pink-400/30 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-300/20 rounded-full blur-3xl animate-pulse"></div>
      
      
      <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden max-w-5xl w-full flex shadow-2xl">

       <div className="w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white p-12 flex flex-col justify-center items-center">

        <h1 className="text-6xl font-extrabold drop-shadow-[0_0_25px_rgba(255,255,255,0.5)]">
          ConnectHub
        </h1>

        <p className="text-center text-2xl mt-10 leading-relaxed">
          Join thousands of developers,
          <br />
          build your network,
          <br />
          and share your ideas.
        </p>

        <div className="text-8xl mt-12 animate-bounce">
          🚀
        </div>

      </div>
      <div className="w-1/2 bg-white/90 backdrop-blur-xl p-14">

        <h1 className="text-5xl font-bold mb-2">
          Create Account ✨
        </h1>

        <p className="text-gray-500 mb-8">
          Start your ConnectHub journey today.
        </p>

        <form onSubmit={handleSubmit}>

          {/* Inputs will go here */}
          <input
          type="text"
          placeholder="Username"
          className="w-full border border-gray-300 rounded-xl p-4 mb-4 transition-all duration-300 focus:scale-[1.02] focus:ring-4 focus:ring-blue-300 focus:border-blue-500 outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-xl p-4 mb-4 transition-all duration-300 focus:scale-[1.02] focus:ring-4 focus:ring-blue-300 focus:border-blue-500 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-xl p-4 mb-4 transition-all duration-300 focus:scale-[1.02] focus:ring-4 focus:ring-blue-300 focus:border-blue-500 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border border-gray-300 rounded-xl p-4 mb-6 transition-all duration-300 focus:scale-[1.02] focus:ring-4 focus:ring-blue-300 focus:border-blue-500 outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          

        </form>
        <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Create Account 🚀"}
          </button>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

        <p className="text-center text-xs text-gray-500 mt-8">
          © 2026 ConnectHub • Built with React & Django
        </p>

</div>

        

       

      </div>
    </div>
  );
}

export default Register;