'use client'

import { usecreateGroupsMonth, usedeleteMonth, usefinishedMonth, usegetMonth } from '@/hooks/month'
import { useParams } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import { Plus, Trash2, Eye, CheckCheck } from 'lucide-react'
import Loader from '@/componets/loader/Loader'
import Tooltip from '@mui/material/Tooltip'

function Page() {
  const { id } = useParams()
  const { data, isLoading, error } = usegetMonth(id)
  const createGroupsMonthMutation = usecreateGroupsMonth()
  const deleteMonthMutation = usedeleteMonth()
  const finishedMutation = usefinishedMonth()

  const handleCreate = () => {
    const oylar = [
      "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
      "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"
    ]
    const date = new Date()
    const year = date.getFullYear()
    const datemonth = date.getMonth()
    const monthData = { name: `${year} ${oylar[datemonth]}` }
    createGroupsMonthMutation.mutate({ groupId: id, monthData })
  }

  const handleUpdate = (month) => {
    let topStudent = localStorage.getItem('toptudent')
    const updatedata = {
      monthId: month?.id,
      topStudent,
      finished: true
    }
    finishedMutation.mutate(updatedata)
  }

  const handleDelete = (id) => {
    deleteMonthMutation.mutate(id)
  }

  if (isLoading) return <Loader />
  if (error) return <div className="text-center pt-20 text-red-500">❌ Xatolik: {error.message}</div>

  return (
    <div
      style={{ background: 'url(/userProfile.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      className="pt-20 px-4 sm:px-6 md:px-10 text-white min-h-screen"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 mt-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
          📅 Guruh {id} — Oylik bo‘limlar
        </h1>
        <button
          onClick={handleCreate}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl shadow-md font-medium w-full sm:w-auto"
        >
          <Plus size={18} /> Oy yaratish
        </button>
      </div>

      {/* Oylar */}
      {!data || data?.length === 0 ? (
        <p className="text-center text-gray-300">Hali oylar mavjud emas</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.map((month) => (
            <div
              key={month?.id}
              className="relative bg-black/40 backdrop-blur-2xl border border-gray-400 p-5 rounded-xl shadow-lg transition hover:border-white"
            >
              {/* Status badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black text-xs sm:text-sm font-semibold px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                {month?.finished
                  ? (month?.topStudent ? `🏆 ${month?.topStudent} — 1-o‘rin` : '✅ Tugagan')
                  : '⏳ Davom etmoqda'}
              </div>

              <h2 className="text-lg sm:text-xl font-semibold">{month?.name}</h2>
              <p className="text-sm text-gray-400 mt-1">
                {month?.finished ? '✅ Tugagan' : '⏳ Davom etmoqda'}
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-5 pt-4 border-t border-gray-600">
                <Link href={`/admin/groups/${id}/${month?.id}`} className="w-full sm:w-auto">
                  <button className="w-full flex items-center justify-center gap-1 text-blue-400 hover:text-blue-300 transition">
                    <Eye size={18} /> Ko‘rish
                  </button>
                </Link>

                <p className="text-xs text-gray-400 text-center sm:text-right">id: {month?.id}</p>

                <div className="flex justify-center sm:justify-end gap-3">
                  <Tooltip title="G'olibni aniqlash" arrow>
                    <button
                      onClick={() => handleUpdate(month)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                    >
                      <CheckCheck size={18} />
                    </button>
                  </Tooltip>

                  <Tooltip title="Oyni o'chirish" arrow>
                    <button
                      onClick={() => handleDelete(month?.id)}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  </Tooltip>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Page
