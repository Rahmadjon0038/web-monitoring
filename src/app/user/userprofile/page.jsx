'use client'
import PieChartWithCustomizedLabel from "@/componets/UserChart";
import { useUserMe } from "@/hooks/auth";
import Link from "next/link";
import React from "react";

function Page() {
  const { data, isLoading, error } = useUserMe();

  if (isLoading) return <p className="text-white text-xl">⏳ Yuklanmoqda...</p>;
  if (error) return <p className="text-red-400 text-xl">❌ Xatolik: {error.message}</p>;

  const user = data?.user;
  const lastMonthStars = {
    month: "Avgust 2025",
    stars: 3 // 1, 2 yoki 3 yulduzcha
  };
  const starsArray = Array.from({ length: lastMonthStars.stars });

  return (
    <div
      style={{
        background: 'url(/userProfile.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      className="pt-20 px-6 text-white min-h-screen "
    >
      {/* Profil qismi */}
      <div className="bg-transparent backdrop-blur-3xl border-2 border-gray-400 p-6 rounded-xl shadow-md mb-8 mt-12 flex flex-col items-center grid grid-cols-2">

        {/* Avatar */}
        <div className="text-center">
          <img
            src={user?.avatar ? user.avatar : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"}
            alt="Avatar"
            className="w-28 h-28 rounded-full border-4 mx-auto border-white shadow-lg object-cover"
          />

          {/* User Info */}
          {/* <h1 className="text-2xl font-bold mt-4">👩‍🎓 Profil</h1> */}
          <p className="text-gray-300 text-xl mt-2">{user?.name}</p>
          <p className="text-gray-300 text-xl mt-2">{user?.email}</p>
          <div className="mt-4 text-center">
            <p className="text-gray-300 text-lg">{lastMonthStars.month}</p>
            <div className="flex justify-center flex-wrap mt-2">
              {starsArray.map((_, idx) => (
                <span key={idx} className="text-yellow-400 text-2xl mx-1">⭐</span>
              ))}
            </div>
          </div>
        </div>
        <div className="">
          <PieChartWithCustomizedLabel />
          <p className="text-xl text-gray-300 text-center">Ballar bo'yicha statistika</p>
        </div>
      </div>

      {/* Pastki 2 ta card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Guruh card */}
        <Link href={'/user/userprofile/groups'}>
          <div className="bg-transparent backdrop-blur-3xl border-2 border-gray-400 p-6 rounded-xl shadow-md cursor-pointer transition">
            <h2 className="text-xl font-bold text-blue-400">📚 Mening Guruhim</h2>
            <p className="text-gray-400 mt-2">
              Guruhingiz haqida ma’lumot va reytinglarni ko‘rish uchun kirish
              mumkin.
            </p>
          </div>
        </Link>

        {/* Video dars card */}
        <Link href={'/user/videos'}>
          <div className="bg-transparent backdrop-blur-3xl border-2 border-gray-400 p-6 rounded-xl shadow-md cursor-pointer transition">
            <h2 className="text-xl font-bold text-green-400">🎥 Video Darslar</h2>
            <p className="text-gray-400 mt-2">
              Siz uchun tayyorlangan dars videolarini shu yerda tomosha qilishingiz
              mumkin.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Page;
