import { NextResponse } from "next/server"

export function middleware(req) {
  // Cookiesni olish
  const cookies = req.headers.get('cookie') || '';
  const token = cookies.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1] || null;
  const role = cookies.split(';').find(c => c.trim().startsWith('role='))?.split('=')[1] || null;

  const url = req.nextUrl;

  // Agar token bo‘lmasa, foydalanuvchini login sahifasiga yo‘naltirish
  if (!token) {
    // Agar foydalanuvchi login qilmagan bo‘lsa
    if (url.pathname.startsWith("/user") || url.pathname.startsWith("/user")) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  // Agar foydalanuvchi admin bo‘lmasa, admin sahifasiga kira olmaydi
  if (url.pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url)); // Asosiy sahifaga yo‘naltirish
  }

  // Agar hamma shartlar o‘tkazilsa, davom etish
  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/admin/:path*"], // /user va /admin yo‘llari uchun middleware
}
