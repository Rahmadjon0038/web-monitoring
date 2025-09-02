'use client'
import React from 'react'
import { Edit, Trash2 } from 'lucide-react'
import { usegetAllusers } from '@/hooks/auth';
import Image from 'next/image';
import Loader from '@/componets/loader/Loader';

function Page() {
  const { data, isLoading, error } = usegetAllusers();
  const users = data?.users

  if (isLoading) return <Loader />
  if (error) return 'maluomt mavjud emas'

  return (
    <div className="min-h-screen px-6 pt-30 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-8">👥 Ro‘yxatdan o‘tgan foydalanuvchilar</h1>

      {/* Table */}
      <div className="bg-transparent border border-gray-700 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="px-4 py-3 text-left">Id</th>
              <th className="px-4 py-3 text-left">Avatar</th>
              <th className="px-4 py-3 text-left">Ism</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map(user => (
              <tr key={user?.id} className="border-b border-gray-700 hover:bg-gray-800 transition">
                <td className="px-4 py-3 font-medium">{user?.id}</td>
                <td className="px-4 py-3 font-medium"><Image className='rounded-xs' src={user?.avatar ? user?.avatar : '/profile.png'} alt='profile img' width={64} height={64} /></td>
                <td className="px-4 py-3 font-medium">{user?.name}</td>
                <td className="px-4 py-3">{user?.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${user?.role === "admin"
                      ? "bg-red-100 text-red-600"
                      : "bg-blue-100 text-blue-600"
                      }`}
                  >
                    {user?.role}
                  </span>
                </td>
                <td className="px-4 py-3 flex justify-center gap-3">
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
