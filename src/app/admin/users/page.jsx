'use client'

import React from 'react'
import { Eye, Edit, Trash2 } from 'lucide-react'

function Page() {
  // Mock foydalanuvchilar (keyin API bilan ulaysan)
  const users = [
    { id: 1, name: "Ali Valiyev", email: "ali@example.com", role: "user", group: "Frontend Guruh", joined: "2025-01-10" },
    { id: 2, name: "Laylo Karimova", email: "laylo@example.com", role: "user", group: "Backend Guruh", joined: "2025-01-15" },
    { id: 3, name: "Admin Boss", email: "admin@example.com", role: "admin", group: "-", joined: "2025-01-01" },
    { id: 4, name: "Jasur Saidov", email: "jasur@example.com", role: "user", group: "-", joined: "2025-02-01" },
  ];

  return (
    <div className="min-h-screen px-6 pt-30 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-8">👥 Ro‘yxatdan o‘tgan foydalanuvchilar</h1>

      {/* Table */}
      <div className="bg-transparent border border-gray-700 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="px-4 py-3 text-left">Ism</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Guruh</th>
              <th className="px-4 py-3 text-left">Qo‘shilgan</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-800 transition">
                <td className="px-4 py-3 font-medium">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {user.group === "-" ? (
                    <span className="text-gray-400 italic">❌ Guruhga qo‘shilmagan</span>
                  ) : (
                    <span className="text-green-400">✅ {user.group}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-300">{user.joined}</td>
                <td className="px-4 py-3 flex justify-center gap-3">
                  <button className="text-blue-400 hover:text-blue-300 transition flex items-center gap-1">
                    <Eye size={18} /> Ko‘rish
                  </button>
                  <button className="text-green-400 hover:text-green-300 transition flex items-center gap-1">
                    <Edit size={18} /> Tahrirlash
                  </button>
                  <button className="text-red-400 hover:text-red-300 transition flex items-center gap-1">
                    <Trash2 size={18} /> O‘chirish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page
