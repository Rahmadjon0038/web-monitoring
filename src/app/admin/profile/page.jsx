'use client'

import React from 'react';

function AdminProfilePage() {
  // Mock data (keyin API bilan almashtirish mumkin)
  const admin = {
    name: "Rahmadjon",
    email: "admin@example.com",
    avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1704000000~exp=1704000600~hmac=1234567890abcdef"
  };

  const stats = [
    { title: "Guruhlar", value: 5 },
    { title: "Foydalanuvchilar", value: 120 },
    { title: "Video darslar", value: 15 },
  ];

  return (
    <div
      style={{
        background: 'url(/admin-bg.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="min-h-screen pt-20 px-6 text-white"
    >
      {/* Profil Card */}
      <div className=" mx-auto bg-transparent backdrop-blur-3xl border-2 border-gray-400 rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-8">
        {/* Avatar */}
        <div className="flex-shrink-0 text-center">
          <img
            src={admin.avatar}
            alt="Admin Avatar"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover mx-auto"
          />
        </div>

        {/* Admin Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2">👨‍💼 {admin.name}</h1>
          <p className="text-gray-300 text-lg mb-4">{admin.email}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center md:text-left">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-md hover:bg-white/20 transition"
              >
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-gray-300 mt-1">{stat.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-600 hover:bg-blue-500 transition p-6 rounded-xl shadow-lg text-center cursor-pointer">
          <h2 className="text-xl font-bold mb-2">📚 Guruhlar</h2>
          <p className="text-gray-200">Guruhlarni boshqarish va foydalanuvchilarni qo‘shish</p>
        </div>
        <div className="bg-green-600 hover:bg-green-500 transition p-6 rounded-xl shadow-lg text-center cursor-pointer">
          <h2 className="text-xl font-bold mb-2">👤 Foydalanuvchilar</h2>
          <p className="text-gray-200">Foydalanuvchilar ro‘yhati va guruhga qo‘shish</p>
        </div>
        <div className="bg-yellow-500 hover:bg-yellow-400 transition p-6 rounded-xl shadow-lg text-center cursor-pointer">
          <h2 className="text-xl font-bold mb-2">🎥 Video Darslar</h2>
          <p className="text-gray-200">Video darslar qo‘shish va tahrirlash</p>
        </div>
      </div>
    </div>
  );
}

export default AdminProfilePage;
