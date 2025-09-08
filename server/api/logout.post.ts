// server/api/auth/logout.post.ts
import { setCookie } from 'h3';
import { createError } from 'h3';

export default defineEventHandler((event) => {
  try {
    // Hapus cookie auth_token dengan set expires ke masa lalu
    setCookie(event, 'auth_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: -1, // ← expired immediately
      path: '/',
      sameSite: 'lax',
    });

    return {
      success: true,
      message: 'Logout berhasil',
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Gagal logout, coba lagi nanti',
    });
  }
});
