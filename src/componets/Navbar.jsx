'use client'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

function Navbar() {
  const navigate = useRouter()
  const HomeNavigate = () => {
    navigate.push('/')
  }

  const role = Cookies.get('role')
  console.log(role)

  return (
    <nav className=" flex fixed max-w-[1920px] w-full justify-between items-center px-6 py-4 bg-transparent backdrop-blur-xs border-b border-[#334155] shadow-md">
      <h1 onClick={HomeNavigate} className="text-2xl font-bold text-white cursor-pointer hover:scale-105 transition-transform">
        CodeNest
      </h1>

      {role ?
        <Link href={'/userprofile'}><h1 className='text-white text-xl'>Profile</h1></Link>
        :
        <div className="space-x-4">
          <Link href={'/auth/login'}
          ><button className="px-4 py-2 rounded-xl bg-[#374151] text-[#f9fafb] font-medium hover:bg-[#4b5563] transition">
              Login
            </button>
          </Link>

          <Link href={'/auth/register'}>
            <button className="px-4 py-2 rounded-xl bg-[#3b82f6] text-white font-medium hover:bg-[#2563eb] transition">
              Register
            </button>
          </Link>
        </div>}

    </nav>
  )
}

export default Navbar
