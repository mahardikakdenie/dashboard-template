// server/api/profile.get.ts
import { User } from '~/types/user.type';
import auth from './middleware/auth';

export default defineEventHandler(async (event): Promise<{
  success: boolean;
  message: string;
  data: User;
}> => {
  console.log("Fetching profile.... ", event);
  
  await auth(event); // ← proteksi otomatis

  // Ambil user dari context (sudah di-decode)
  const user = event.context.user;
  console.log("User from context:", user);
  

  return {
    success: true,
    message: 'Profile fetched',
    data: user,
  };
});
