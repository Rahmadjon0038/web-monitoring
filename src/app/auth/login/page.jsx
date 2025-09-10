'use client'
import { useRole } from "@/context/userContext";
import { uselogin } from "@/hooks/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Login() {
  // ------------------ Login mutate -------------
  const loginMutation = uselogin();
  const navigate = useRouter();
  const { role, setRole } = useRole();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // inputni yangilash
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submit bosilganda
  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate({
      formData,
      onSuccess: (data) => {
        if (data?.role === "user") {
          navigate.replace("/user/userprofile");
        } else if (data?.role === "admin") {
          navigate.replace("/admin/profile");
        }

        setRole(data?.role);
      },
    });
  };

  return (
    <div
      style={{
        background: "url(/auth.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-black/40 border border-gray-600 backdrop-blur-2xl p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl max-sm:text-2xl font-bold text-white text-center mb-6">
          Login
        </h1>

        {loginMutation.isError && (
          <p className="text-red-400 text-center mb-4">
            ❌ Email yoki parol noto‘g‘ri!
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full"
        >
          <input
            type="email"
            name="email"
            placeholder="Email manzil"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Parol"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full mt-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white font-semibold rounded-lg transition"
          >
            {loginMutation.isPending ? "⏳ Yuklanmoqda..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
