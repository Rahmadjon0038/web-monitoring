'use client'

import { useParams } from 'next/navigation'
import React from 'react'

function Page() {
  const { month } = useParams()

  const students = [
    { id: 1, name: 'Rahmadjon', points: 120 },
    { id: 2, name: 'Azizbek', points: 85 },
    { id: 3, name: 'Nilufar', points: 95 },
    { id: 4, name: 'Oybek', points: 110 },
    { id: 5, name: 'Oybek', points: 11 },
  ]

  const sortedStudents = [...students].sort((a, b) => b.points - a.points)

  // Rangni ballga qarab belgilash funksiyasi
  const getPointColor = (points) => {
    if (points >= 100) return 'text-green-400'
    if (points >= 80) return 'text-blue-400'
    return 'text-red-400'
  }

  return (
    <div
      style={{
        background: 'url(/userProfile.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="pt-20 px-6 text-white min-h-screen"
    >
      <h1 className="text-2xl font-bold mb-6 mt-12 text-center" >📊 {month} oyi — Guruh reytingi</h1>

      {sortedStudents.length === 0 ? (
        <p className="text-gray-400">Hozircha hech kim ball to‘plamagan.</p>
      ) : (
        <div className="space-y-4 mt-12">
          {sortedStudents.map((student, index) => (
            <div
              key={student.id}
              className="flex justify-between items-center p-4 rounded-xl shadow-md bg-transparent backdrop-blur-3xl border-2 border-gray-400 transition hover:border-white"
            >
              <span className="font-medium">
                {index + 1}. {student.name}
              </span>
              <span className={`${getPointColor(student.points)} font-semibold`}>
                {student.points} ball
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Page
