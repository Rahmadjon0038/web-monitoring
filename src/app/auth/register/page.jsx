'use client'
import { useRegister } from "@/hooks/auth";
import React, { useState } from "react";

function Register() {
  // -------------- register mutate ------------
  const registerMutation = useRegister();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // default qilib "user" qildim
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
    registerMutation.mutate(formData);
  };

  return (
    <div
      style={{
        background: "url(/auth.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen flex items-center justify-center px-4 py-10"
    >
      <div className="w-full max-w-md bg-black/40 border border-gray-600 backdrop-blur-2xl p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl max-sm:text-2xl font-bold text-white text-center mb-6">
          Ro‘yxatdan o‘tish
        </h1>

        {/* Error chiqishi */}
        {registerMutation.isError && (
          <p className="text-red-400 text-center mb-4">
            ❌ Ro‘yxatdan o‘tishda xatolik yuz berdi!
          </p>
        )}

        {/* Muvaffaqiyatli bo‘lsa */}
        {registerMutation.isSuccess && (
          <p className="text-green-400 text-center mb-4">
            ✅ Muvaffaqiyatli ro‘yxatdan o‘tdingiz!
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Ismingiz"
            value={formData.name}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email manzil"
            value={formData.email}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Parol"
            value={formData.password}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full mt-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white font-semibold rounded-lg transition"
          >
            {registerMutation.isPending ? "⏳ Yuborilmoqda..." : "Ro‘yxatdan o‘tish"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
