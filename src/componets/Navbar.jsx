'use client'
import { useRole } from '@/context/userContext'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

function Navbar() {
  const navigate = useRouter()
  const HomeNavigate = () => {
    navigate.push('/')
  }

  const { role } = useRole()
  const token = Cookies.get('token')

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-[#334155] shadow-md">
      <div className="max-w-[1920px] mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <h1
          onClick={HomeNavigate}
          className="text-2xl font-bold text-white cursor-pointer hover:scale-105 transition-transform"
        >
          CodeNest
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {role && token ? (
            <Link
              href={
                role === 'user'
                  ? '/user/userprofile'
                  : role === 'admin'
                  ? '/admin/profile'
                  : '/'
              }
            >
              <h1 className="text-white text-xl hover:text-blue-400 transition">
                Profile
              </h1>
            </Link>
          ) : (
            <div className="space-x-4">
              <Link href={'/auth/login'}>
                <button className="px-4 py-2 rounded-xl bg-[#374151] text-[#f9fafb] font-medium hover:bg-[#4b5563] transition">
                  Login
                </button>
              </Link>
              <Link href={'/auth/register'}>
                <button className="px-4 py-2 rounded-xl bg-[#3b82f6] text-white font-medium hover:bg-[#2563eb] transition">
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 bg-black/90 backdrop-blur-lg py-6 border-t border-[#334155]">
          {role && token ? (
            <Link
              href={
                role === 'user'
                  ? '/user/userprofile'
                  : role === 'admin'
                  ? '/admin/profile'
                  : '/'
              }
              onClick={() => setMenuOpen(false)}
            >
              <h1 className="text-white text-lg hover:text-blue-400 transition">
                Profile
              </h1>
            </Link>
          ) : (
            <>
              <Link href={'/auth/login'} onClick={() => setMenuOpen(false)}>
                <button className="w-32 py-2 rounded-xl bg-[#374151] text-[#f9fafb] font-medium hover:bg-[#4b5563] transition">
                  Login
                </button>
              </Link>
              <Link href={'/auth/register'} onClick={() => setMenuOpen(false)}>
                <button className="w-32 py-2 rounded-xl bg-[#3b82f6] text-white font-medium hover:bg-[#2563eb] transition">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
