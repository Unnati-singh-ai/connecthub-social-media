import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import { User, Lock, Eye, EyeOff } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await api.post("/token/", {
        username,
        password,
      });

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("username", username);

      toast.success("Login successful!");

      navigate("/feed");
    } catch (error) {
      toast.error("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
     
      {/* Floating Circles */}
    <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/20 rounded-full blur-3xl animate-pulse"></div>

    <div className="absolute bottom-0 -right-20 w-96 h-96 bg-pink-400/30 rounded-full blur-3xl animate-pulse"></div>

    <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-300/20 rounded-full blur-3xl animate-pulse"></div>
    
    {/* Login Card */}
    <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden max-w-5xl w-full flex shadow-2xl" >

      {/* Left Side */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white p-12 flex flex-col justify-center items-center">

       <h1 className="text-6xl font-extrabold text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.5)]">
          ConnectHub
        </h1>

        <p className="text-xl text-center leading-relaxed">
          Connect with developers,
          <br />
          share your ideas,
          <br />
          and build your network.
        </p>

        <div className="text-8xl animate-bounce drop-shadow-2xl">
              🌍
          </div>

      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-white/90 backdrop-blur-xl p-14">

        <h2 className="text-4xl font-extrabold mb-2 tracking-tight">
          Welcome Back 👋
        </h2>

        <p className="text-gray-500 mb-8">
          Login to continue using ConnectHub.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

         <div className="relative">

          <User
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border rounded-xl focus:scale-[1.02] focus:ring-4 focus:ring-blue-300  transition-all outline-none duration-300"
          />

        </div>

         <div className="relative">

      <Lock
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full pl-12 pr-12 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
      />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>

      </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              py-4
              rounded-xl
              font-bold
              text-lg
              text-white
              bg-gradient-to-r
              from-blue-600
              via-indigo-600
              to-purple-600
              hover:scale-105
              hover:shadow-2xl
              transition-all
              duration-300
              "           >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-8 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
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

export default Login;