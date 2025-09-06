'use client';

import Loader from '@/componets/loader/Loader';
import { usegetMonthStudents } from '@/hooks/month';
import Cookies from 'js-cookie';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Page() {
  const { month } = useParams();
  const { data: students, isLoading, error } = usegetMonthStudents(month);
  const sortedStudents = students ? [...students].sort((a, b) => b.score - a.score) : [];

  const [monthname, setMonhName] = useState('')
  useEffect(() => {
    let resdata = localStorage.getItem('monthname')
    setMonhName(resdata)
  }, [])
  
  // Rangni ballga qarab belgilash funksiyasi
  const getPointColor = (points) => {
    if (points >= 100) return 'text-green-400';
    if (points >= 50) return 'text-blue-400';
    return 'text-red-400';
  };

  if (isLoading) return <Loader />
  if (error) return <p className="text-red-500 p-10 text-center text-xl">❌ Xatolik yuz berdi!</p>;

  return (
    <div
      className="pt-25 px-6 min-h-screen text-white"
      style={{
        background: 'url(/userProfile.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <div className="mx-12">
        <h1 className="text-3xl  mb-10 text-center drop-shadow-lg">
          {monthname && monthname}
        </h1>

        {sortedStudents.length === 0 ? (
          <p className="text-gray-300 text-center text-xl">Hozircha hech kim ball to‘plamagan.</p>
        ) : (
          <div className="space-y-5">
            {sortedStudents.map((student, index) => (
              <div
                key={student.id}
                className="flex items-center justify-between px-4 py-3 bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 hover:border-white transition"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar: bosh harf */}
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600/30 text-white text-2xl font-bold">
                    {student.name?.[0]?.toUpperCase() || "U"}
                  </div>

                  {/* Ism va tartib */}
                  <div>
                    <p className="text-xl font-semibold">{student.name}</p>
                    <p className="text-gray-400 text-sm">#{index + 1} o‘rin</p>
                  </div>
                </div>

                {/* Ball */}
                <span className={`text-xl ${getPointColor(student.score)}`}>
                  {student.score} ball
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
