'use client'
import Loader from "@/componets/loader/Loader";
import PieChartWithCustomizedLabel from "@/componets/UserChart";
import { useRole } from "@/context/userContext";
import { useavatar, useUserMe } from "@/hooks/auth";
import { Button } from "@mui/material";
import Cookies from "js-cookie";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Page() {
  const { data, isLoading, error } = useUserMe();
  const avatarMutation = useavatar();
  const { role, setRole } = useRole();

  if (isLoading) return <p className="text-white text-xl"><Loader /></p>;
  if (error) return <p className="text-red-400 text-xl">❌ Xatolik: {error.message}</p>;

  const user = data?.user;
  const lastMonthStars = {
    month: "Avgust 2025",
    stars: 3 // 1, 2 yoki 3 yulduzcha
  };
  const avatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);       // backend kutayotgan nom bilan
    avatarMutation.mutate({ id: user?.id, formData });
  };


  const navigate = useRouter();
  const starsArray = Array.from({ length: lastMonthStars.stars });
  const logout = () => {
    Cookies.remove('token')
    Cookies.remove('role')
    navigate.push('/')
    setRole(null)
  }

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
      <div className="bg-transparent backdrop-blur-3xl border-2 border-gray-400 p-6 rounded-xl shadow-md mb-8 mt-12  flex-col  grid grid-cols-2">

        {/* Avatar */}
        <div className="text-center">
          <div className="inline-block relative overflow-hidden ">
            <Image
              src={user?.avatar ? user.avatar : "/profile.png"}
              alt="Avatar"
              className="w-28 h-28 rounded-full border-2  mx-auto border-white shadow-lg object-cover"
              width={200}
              height={200}
            />
            <input onChange={avatarChange} className="absolute bottom-0 z-50 opacity-0" type="file" />
            <ImagePlus className="absolute z-0 bottom-0 right-0" size={24} color="#00e5ff" strokeWidth={2.75} />
          </div>

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
            <Button onClick={logout}>Chiqish</Button>
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
        <Link href={'/user/groups'}>
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
