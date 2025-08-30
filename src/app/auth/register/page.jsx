'use client'
import { useRegister } from "@/hooks/auth";
import React, { useState } from "react";

function Register() {
  // -------------- register mutate ------------
  const registerMutation = useRegister()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
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
    // console.log("Foydalanuvchi ma'lumotlari:", formData);
    registerMutation.mutate(formData)

  };

  return (
    <div style={{ background: 'url(/auth.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-transparent border border-gray-500 backdrop-blur-3xl p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Ro‘yxatdan o‘tish
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Ismingiz"
            value={formData.name}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email manzil"
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Parol"
            value={formData.password}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="mt-4 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition"
          >
            Ro‘yxatdan o‘tish
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
