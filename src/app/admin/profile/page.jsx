'use client'

import MiniLoaser from '@/componets/loader/MiniLoaser';
import { useRole } from '@/context/userContext';
import { usegetStats } from '@/hooks/adminstats';
import { useUserMe } from '@/hooks/auth';
import { usegetvideocount } from '@/hooks/videoLessons';
import { Group, GroupIcon, Users, Video } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect } from 'react';

function AdminProfilePage() {
  const { data, isLoading, error } = useUserMe();
  const admin = data?.user
  const { username, setUsername } = useRole();

  const { data: stats, isLoading: statsloading, error: loadingerror } = usegetStats()


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
      className="min-h-screen pt-30 px-24 text-white">
      <div className="mx-auto bg-transparent backdrop-blur-3xl border border-gray-400 rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-12 items-center gap-">
        <div className="flex-shrink-0 text-center">
          <img
            src={admin?.avatar ? admin?.avatar : 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1704000000~exp=1704000600~hmac=1234567890abcdef'}
            alt="Admin Avatar"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover mx-auto"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2">{admin?.name}</h1>
          <p className="text-gray-300 text-lg mb-4">{admin?.email}</p>

          <div className="grid grid-cols-3 gap-4 text-center md:text-left">

            <div
              className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-md hover:bg-white/20 transition min-h-24">

              {statsloading ? <MiniLoaser /> :
                <div>
                  <p className="text-2xl font-bold">{stats?.groups} ta</p>
                  <p className="text-gray-300 mt-1">Guruxlar</p>
                </div>}
            </div>
            <div
              className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-md hover:bg-white/20 transition min-h-24">

              {statsloading ? <MiniLoaser /> :
                <div>
                  <p className="text-2xl font-bold">{stats?.users} ta</p>
                  <p className="text-gray-300 mt-1">Foydalanuvchilar</p>
                </div>
              }
            </div>

            <div
              className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-md hover:bg-white/20 transition min-h-24">
              {statsloading ? <MiniLoaser /> :
                <div>
                  <p className="text-2xl font-bold">{stats?.lessons} ta</p>
                  <p className="text-gray-300 mt-1">Videodarslar</p>
                </div>
              }
            </div>

          </div>
        </div>
      </div>

      <div className=" mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href={'/admin/groups'}>
          <div className="bg-blue-600 hover:bg-blue-500 transition p-6 rounded-xl shadow-lg text-center cursor-pointer">
            <h2 className="text-xl font-bold mb-2 flex justify-center gap-2 "><Group size={25} strokeWidth={2.2}/> Guruhlar</h2>
            <p className="text-gray-200">Guruhlarni boshqarish va foydalanuvchilarni qo‘shish</p>
          </div>
        </Link>
        <Link href={'/admin/users'}>
          <div className="bg-green-600 hover:bg-green-500 transition p-6 rounded-xl shadow-lg text-center cursor-pointer">
            <h2 className="text-xl font-bold mb-2 flex justify-center gap-2"><Users size={25} strokeWidth={2.2} /> Foydalanuvchilar</h2>
            <p className="text-gray-200">Foydalanuvchilar ro‘yhati va guruhga qo‘shish</p>
          </div>
        </Link>
        <Link href={'/admin/videolessons'}>
          <div className="bg-yellow-500 hover:bg-yellow-400 transition p-6 rounded-xl shadow-lg text-center cursor-pointer">
            <h2 className="text-xl font-bold mb-2 flex justify-center gap-2"><Video size={25} strokeWidth={2.2}/> Video Darslar</h2>
            <p className="text-gray-200">Video darslar qo‘shish va tahrirlash</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AdminProfilePage;
