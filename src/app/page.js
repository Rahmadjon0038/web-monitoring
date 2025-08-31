import Link from "next/link";
import React from "react";

function Home() {
  return (
    <div style={{
      background: 'url(/userProfile.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center'
    }} className="min-h-screen pt-12   text-gray-100 flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-4">
        Web Dasturlash Kursi Platformasi
      </h1>
      <p className="text-lg md:text-xl text-gray-400 text-center max-w-2xl mb-8">
        Ushbu platforma o‘quvchilar uchun mo‘ljallangan bo‘lib,
        dasturlashni o‘rganish, o‘zlashtirish jarayonini kuzatish va
        reyting tizimi orqali o‘z o‘rnini bilib borish imkonini yaratadi.
        Shuningdek, ustozlar tomonidan tayyorlangan video darslar
        va testlar yordamida bilimlarni mustahkamlash mumkin.
      </p>

      {/* Action Buttons */}
      {/* <div className="flex gap-4">
        <Link href={'/auth/register'}>
          <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition text-white font-semibold shadow-lg">
            Ro‘yxatdan o‘tish
          </button>
        </Link>
        <Link href={'/auth/login'}>
          <button className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition text-gray-200 font-semibold shadow-lg">
            Kirish
          </button>
        </Link>
      </div> */}

      {/* Info Section */}
      <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-5xl w-full">
        <div className="border border-gray-600 p-6 rounded-2xl shadow-md hover:border-white transition">
          <h2 className="text-xl font-bold mb-2">📊 Ballar va Reyting</h2>
          <p className="text-gray-400">
            O‘quvchilar test va topshiriqlar orqali ball to‘plab,
            guruh ichida o‘z o‘rnini bilib boradilar.
          </p>
        </div>
        <div className="border border-gray-600 p-6 rounded-2xl shadow-md hover:border-white transition">
          <h2 className="text-xl font-bold mb-2">🎓 Profil va Status</h2>
          <p className="text-gray-400">
            Har bir o‘quvchining shaxsiy profili mavjud bo‘lib, unda
            darajalari va erishgan yutuqlari ko‘rinadi.
          </p>
        </div>
        <div className="border border-gray-600 p-6 rounded-2xl shadow-md hover:border-white transition">
          <h2 className="text-xl font-bold mb-2">📚 Video Darslar</h2>
          <p className="text-gray-400">
            Ustoz tomonidan joylashtirilgan video darslar orqali
            bilimlarni mustaqil o‘rganish imkoniyati mavjud.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
