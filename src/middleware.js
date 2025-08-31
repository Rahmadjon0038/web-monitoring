// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  // Cookiesni olish
  const cookies = req.headers.get('cookie') || '';
  const token = cookies.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1] || null;
  const role = cookies.split(';').find(c => c.trim().startsWith('role='))?.split('=')[1] || null;

  const url = req.nextUrl.clone(); // URLni klonlash, redirect uchun

  // ===== User sahifalari tekshiruv =====
  if (url.pathname.startsWith("/user")) {
    if (!token) {
      // Agar foydalanuvchi login qilmagan bo‘lsa
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    if (role !== "user") {
      // Agar foydalanuvchi admin bo‘lsa user sahifaga kira olmaydi
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // ===== Admin sahifalari tekshiruv =====
  if (url.pathname.startsWith("/admin")) {
    if (!token) {
      // Agar foydalanuvchi login qilmagan bo‘lsa
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    if (role !== "admin") {
      // Agar foydalanuvchi user bo‘lsa admin sahifaga kira olmaydi
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Agar barcha shartlar o‘tgan bo‘lsa, davom etish
  return NextResponse.next();
}

// Middleware qaysi yo‘llar uchun ishlashini belgilash
export const config = {
  matcher: ["/user/:path*", "/admin/:path*"],
};
