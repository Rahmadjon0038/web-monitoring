'use client'
import React from 'react'
import { Users } from 'lucide-react'
import { usegetAllusers } from '@/hooks/auth';
import Image from 'next/image';
import Loader from '@/componets/loader/Loader';

function Page() {
  const { data, isLoading, error } = usegetAllusers();
  const users = data?.users

  if (isLoading) return <Loader />
  if (error) return 'Maluomot mavjud emas'

  return (
    <div className="min-h-screen px-4 sm:px-6 pt-24 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Header */}
      <h1 className="text-xl sm:text-3xl font-bold mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4">
        <Users size={30} strokeWidth={3} /> Ro‘yxatdan o‘tgan foydalanuvchilar
      </h1>

      {/* Table Container (scrollable on small screens) */}
      <div className="bg-transparent border border-gray-700 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[600px] sm:min-w-0">
            <thead className="bg-gray-800 text-gray-300 text-sm sm:text-base">
              <tr>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left">Id</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left">Avatar</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left">Ism</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left">Email</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {users?.map(user => (
                <tr
                  key={user?.id}
                  className="border-b border-gray-700 hover:bg-gray-800 transition"
                >
                  <td className="px-3 sm:px-4 py-2 sm:py-3 font-medium text-sm sm:text-base">
                    {user?.id}
                  </td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3">
                    <Image
                      className="rounded-full"
                      src={user?.avatar ? user?.avatar : '/profile.png'}
                      alt="profile img"
                      width={40}
                      height={40}
                    />
                  </td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3 font-medium text-sm sm:text-base">
                    {user?.name}
                  </td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base break-all">
                    {user?.email}
                  </td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3">
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                        user?.role === "admin"
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {user?.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Page
