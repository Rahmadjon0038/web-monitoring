'use client'

import { usecreateGroupsMonth, usedeleteMonth, usegetMonth } from '@/hooks/month'
import { useParams } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, ArrowRight, Eye } from 'lucide-react' // yangi icon qo‘shildi
import Loader from '@/componets/loader/Loader'

function Page() {
    const { id } = useParams()
    // get month
    const { data, isLoading, error } = usegetMonth(id)
    // create month
    const createGroupsMonthMutation = usecreateGroupsMonth();
    // delete month
    const deleteMonthMutation = usedeleteMonth()



    const handleCreate = () => {
        const oylar = [
            "Yanvar",
            "Fevral",
            "Mart",
            "Aprel",
            "May",
            "Iyun",
            "Iyul",
            "Avgust",
            "Sentabr",
            "Oktabr",
            "Noyabr",
            "Dekabr"
        ];
        const date = new Date()
        const year = date.getFullYear()
        const datemonth = date.getMonth()
        const monthData = { name: `${year} ${oylar[datemonth]}` }
        createGroupsMonthMutation.mutate({ groupId: id, monthData })
    }

    const handleUpdate = (month) => {
        console.log("✏️ Update bosildi:", month)
    }

    const handleDelete = (id) => {
        deleteMonthMutation.mutate(id)
    }


    if (isLoading) return <Loader />
    if (error) return <div className="text-center pt-20 text-red-500">❌ Xatolik: {error.message}</div>

    return (
        <div
            style={{ background: 'url(/userProfile.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            className="pt-20 px-6 text-white min-h-screen"
        >
            <div className="flex justify-between items-center mb-10 mt-12">
                <h1 className="text-2xl font-bold">📅 Guruh {id} — Oylik bo‘limlar</h1>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl shadow-md font-medium"
                >
                    <Plus size={18} /> Oy yaratish
                </button>
            </div>

            {!data || data?.length === 0 ? "Hali oylar mavjud emas" :
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {data?.map((month) => (
                        <div
                            key={month?.id}
                            className="relative bg-transparent backdrop-blur-3xl border-2 p-5 rounded-xl shadow-md border-gray-400 transition hover:border-white"
                        >
                            {/* Status badge */}
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                                {month?.finished
                                    ? (month?.topStudent ? `🏆 ${month?.topStudent} — 1-o‘rin` : '✅ Tugagan')
                                    : '⏳ Davom etmoqda'}
                            </div>

                            <h2 className="text-xl font-semibold">{month?.name}</h2>
                            <p className="text-sm text-gray-400 mt-2">
                                {month?.finished ? '✅ Tugagan' : '⏳ Davom etmoqda'}
                            </p>

                            {/* Action tugmalar */}
                            <div className="flex justify-between mt-4 items-center">
                                {/* Ichiga kirish tugmasi */}
                                <Link
                                    href={`/admin/groups/${id}/${month?.id}`}
                                >
                                    <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition ">
                                        <Eye size={18} /> Ko‘rish
                                    </button>
                                </Link>
                                <p>id: {month?.id}</p>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleUpdate(month)}
                                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(month?.id)}
                                        className="p-2 bg-red-600 hover:bg-red-700 rounded-lg"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default Page
