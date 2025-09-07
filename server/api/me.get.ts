// server/api/profile.get.ts
import auth from './middleware/auth';

export default defineEventHandler(async (event) => {
  await auth(event); // ← proteksi otomatis

  // Ambil user dari context (sudah di-decode)
  const user = event.context.user;

  return {
    success: true,
    message: 'Profile fetched',
    data: {
      id: user.id,
      email: user.email,
      username: user.username,
    },
  };
});
