import Link from "next/link";
import React from "react";

function Home() {
  return (
    <div
      style={{
        background: "url(/userProfile.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen pt-30 pb-20 md:pt-20 text-gray-100 flex flex-col items-center justify-center px-4 sm:px-6"
    >
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-center mb-4 ">
        Web Dasturlash Kursi Platformasi
      </h1>

      {/* Description */}
      <p className="text-base sm:text-lg md:text-xl text-gray-300 text-center max-w-2xl mb-8">
        Ushbu platforma o‘quvchilar uchun mo‘ljallangan bo‘lib,
        dasturlashni o‘rganish, o‘zlashtirish jarayonini kuzatish va
        reyting tizimi orqali o‘z o‘rnini bilib borish imkonini yaratadi.
        Shuningdek, ustozlar tomonidan tayyorlangan video darslar
        va testlar yordamida bilimlarni mustahkamlash mumkin.
      </p>

      {/* Action Buttons */}
      {/* <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mb-12">
        <Link href={"/auth/register"} className="w-full sm:w-auto">
          <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition text-white font-semibold shadow-lg">
            Ro‘yxatdan o‘tish
          </button>
        </Link>
        <Link href={"/auth/login"} className="w-full sm:w-auto">
          <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition text-gray-200 font-semibold shadow-lg">
            Kirish
          </button>
        </Link>
      </div> */}

      {/* Info Section */}
      <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl w-full">
        <div className="border border-gray-600 p-6 rounded-2xl shadow-md hover:border-white transition bg-black/40">
          <h2 className="text-lg sm:text-xl font-bold mb-2">📊 Ballar va Reyting</h2>
          <p className="text-gray-300 text-sm sm:text-base">
            O‘quvchilar test va topshiriqlar orqali ball to‘plab,
            guruh ichida o‘z o‘rnini bilib boradilar.
          </p>
        </div>
        <div className="border border-gray-600 p-6 rounded-2xl shadow-md hover:border-white transition bg-black/40">
          <h2 className="text-lg sm:text-xl font-bold mb-2">🎓 Profil va Status</h2>
          <p className="text-gray-300 text-sm sm:text-base">
            Har bir o‘quvchining shaxsiy profili mavjud bo‘lib, unda
            darajalari va erishgan yutuqlari ko‘rinadi.
          </p>
        </div>
        <div className="border border-gray-600 p-6 rounded-2xl shadow-md hover:border-white transition bg-black/40">
          <h2 className="text-lg sm:text-xl font-bold mb-2">📚 Video Darslar</h2>
          <p className="text-gray-300 text-sm sm:text-base">
            Ustoz tomonidan joylashtirilgan video darslar orqali
            bilimlarni mustaqil o‘rganish imkoniyati mavjud.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
