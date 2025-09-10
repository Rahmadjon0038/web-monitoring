'use client'

import MiniLoaser from '@/componets/loader/MiniLoaser';
import { useRole } from '@/context/userContext';
import { usegetStats } from '@/hooks/adminstats';
import { useUserMe } from '@/hooks/auth';
import { Group, Users, Video } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect } from 'react';

function AdminProfilePage() {
  const { data, isLoading, error } = useUserMe();
  const admin = data?.user;
  const { username, setUsername } = useRole();
  const { data: stats, isLoading: statsloading } = usegetStats();

  useEffect(() => {
    if (admin?.name) {
      setUsername(admin.name);
    }
  }, [admin, setUsername]);

  return (
    <div
      style={{
        background: 'url(/userProfile.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="min-h-screen py-24 sm:pt-26 px-4 sm:px-8 md:px-16 text-white"
    >
      {/* Profile Card */}
      <div className="mx-auto bg-black/40 backdrop-blur-3xl border border-gray-400 rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center ">
        {/* Avatar */}
        <div className="flex-shrink-0 text-center">
          <img
            src={
              admin?.avatar
                ? admin?.avatar
                : 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1704000000~exp=1704000600~hmac=1234567890abcdef'
            }
            alt="Admin Avatar"
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg object-cover mx-auto"
          />
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{admin?.name}</h1>
          <p className="text-gray-300 text-base sm:text-lg mb-4">{admin?.email}</p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-md hover:bg-white/20 transition min-h-20 flex flex-col justify-center">
              {statsloading ? (
                <MiniLoaser />
              ) : (
                <>
                  <p className="text-xl sm:text-2xl font-bold">{stats?.groups} ta</p>
                  <p className="text-gray-300 mt-1 text-sm sm:text-base">Guruhlar</p>
                </>
              )}
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-md hover:bg-white/20 transition min-h-20 flex flex-col justify-center">
              {statsloading ? (
                <MiniLoaser />
              ) : (
                <>
                  <p className="text-xl sm:text-2xl font-bold">{stats?.users} ta</p>
                  <p className="text-gray-300 mt-1 text-sm sm:text-base">Foydalanuvchilar</p>
                </>
              )}
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-md hover:bg-white/20 transition min-h-20 flex flex-col justify-center">
              {statsloading ? (
                <MiniLoaser />
              ) : (
                <>
                  <p className="text-xl sm:text-2xl font-bold">{stats?.lessons} ta</p>
                  <p className="text-gray-300 mt-1 text-sm sm:text-base">Videodarslar</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="mx-auto mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
        <Link href={'/admin/groups'}>
          <div className="bg-blue-600 hover:bg-blue-500 transition p-6 rounded-xl shadow-lg text-center cursor-pointer">
            <h2 className="text-lg sm:text-xl font-bold mb-2 flex justify-center gap-2 items-center">
              <Group size={22} strokeWidth={2.2} /> Guruhlar
            </h2>
            <p className="text-gray-200 text-sm sm:text-base">
              Guruhlarni boshqarish va foydalanuvchilarni qo‘shish
            </p>
          </div>
        </Link>

        <Link href={'/admin/users'}>
          <div className="bg-green-600 hover:bg-green-500 transition p-6 rounded-xl shadow-lg text-center cursor-pointer">
            <h2 className="text-lg sm:text-xl font-bold mb-2 flex justify-center gap-2 items-center">
              <Users size={22} strokeWidth={2.2} /> Foydalanuvchilar
            </h2>
            <p className="text-gray-200 text-sm sm:text-base">
              Foydalanuvchilar ro‘yhati va guruhga qo‘shish
            </p>
          </div>
        </Link>

        <Link href={'/admin/videolessons'}>
          <div className="bg-yellow-500 hover:bg-yellow-400 transition p-6 rounded-xl shadow-lg text-center cursor-pointer">
            <h2 className="text-lg sm:text-xl font-bold mb-2 flex justify-center gap-2 items-center">
              <Video size={22} strokeWidth={2.2} /> Video Darslar
            </h2>
            <p className="text-gray-200 text-sm sm:text-base">
              Video darslar qo‘shish va tahrirlash
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AdminProfilePage;
