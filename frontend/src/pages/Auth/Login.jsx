import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "@/services/api";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "bizboost-token",
        response.data.access_token
      );

      localStorage.setItem(
        "bizboost-user",
        JSON.stringify(
          response.data.user
        )
      );

      navigate("/dashboard");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.detail ||
        "Login failed"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-6">
        Login
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded"
        >
          Login
        </button>

        <p>
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}