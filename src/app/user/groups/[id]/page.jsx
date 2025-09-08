'use client'

import Loader from '@/componets/loader/Loader'
import { usegetMonth } from '@/hooks/month'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Page() {
    const { id } = useParams()
    const { data: months, isLoading, error } = usegetMonth(id)

    const setMonthName = (monthname) => {
        localStorage.setItem('monthname', monthname)
    }

    const [groupname, setGroupname] = useState('')
    useEffect(() => {
        let resdata = localStorage.getItem('groupname')
        setGroupname(resdata)
    }, [])

    console.log(months, 'student')


    if (isLoading) return <Loader />
    if (error) return <div className="text-center pt-20 text-red-500">❌ Xatolik: {error.message}</div>
    if (!months || months.length === 0) return <div className="text-center pt-20 text-gray-400">⚠️ Hali oylar mavjud emas</div>

    return (
        <div style={{
            background: 'url(/userProfile.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center'
        }} className="pt-20 px-6 text-white min-h-screen">
            <h1 className="text-2xl font-bold mb-6 mt-12 text-center">{groupname && groupname}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
                {months?.map((month) => (
                    <Link href={`/user/groups/${id}/${month?.id}`} key={month?.id}>
                        <div onClick={() => setMonthName(month?.name)}
                            className="relative bg-transparent backdrop-blur-3xl border-2 p-5 rounded-xl shadow-md  border-gray-400 cursor-pointer transition hover:border-white">
                            {/* Tepadagi status */}
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                                {month?.finished
                                    ? `🏆 ${month?.topStudent} — 1-o‘rin`
                                    : '🏆 Golib kutilyapti'}
                            </div>
                            <h2 className="text-xl font-semibold">{month?.name}</h2>
                            <p className="text-sm text-gray-400 mt-2">
                                {month?.finished ? '✅ Tugagan' : '⏳ Davom etmoqda'}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Page
