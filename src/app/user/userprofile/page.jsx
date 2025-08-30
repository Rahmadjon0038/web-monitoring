import Link from "next/link";
import React from "react";

function Page() {
  // User ma'lumotlari (hozircha arraydan/mock dan)
  const user = {
    name: "Oybek",
    group: "Frontend Guruh",
    totalScore: 320,
    lastMonthStatus: "⭐ Super Star (Yanvar)",
  };

  return (
    <div style={{
      background: 'url(/userProfile.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center'
    }} className="pt-20 px-6 text-white min-h-screen ">
      {/* Profil qismi */}
      <div className="bg-transparent backdrop-blur-3xl border-2 border-gray-400 p-6 rounded-xl shadow-md mb-8 mt-12">
        <h1 className="text-2xl font-bold">👩‍🎓 Profil</h1>
        <p className="text-gray-300 text-xl mt-2">Ism: {user.name}</p>
        <p className="text-gray-300 text-xl">Guruh: {user.group}</p>
        <p className="text-gray-300 text-xl">Umumiy ball: {user.totalScore}</p>
        <p className="text-gray-400 mt-2 text-xl italic">
          Oxirgi oy statusi: {user.lastMonthStatus}
        </p>
      </div>

      {/* Pastki 2 ta card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Guruh card */}
        <Link href={'/userprofile/groups'}>
          <div className="bg-transparent backdrop-blur-3xl border-2 border-gray-400 p-6 rounded-xl shadow-md cursor-pointer transition">
            <h2 className="text-xl font-bold text-blue-400">📚 Mening Guruhim</h2>
            <p className="text-gray-400 mt-2">
              Guruhingiz haqida ma’lumot va reytinglarni ko‘rish uchun kirish
              mumkin.
            </p>
          </div>
        </Link>

        {/* Video dars card */}
        <div className="bg-transparent backdrop-blur-3xl border-2 border-gray-400 p-6 rounded-xl shadow-md cursor-pointer transition">
          <h2 className="text-xl font-bold text-green-400">🎥 Video Darslar</h2>
          <p className="text-gray-400 mt-2">
            Siz uchun tayyorlangan dars videolarini shu yerda tomosha qilishingiz
            mumkin.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
