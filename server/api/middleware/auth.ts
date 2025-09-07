// server/middleware/auth.ts
import { getHeader } from 'h3';
import jwt from 'jsonwebtoken';
import { createError } from 'h3';

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();

  // Ambil token dari header Authorization
  const authHeader = getHeader(event, 'authorization');
  if (!authHeader) {
    throw createError({ statusCode: 401, message: 'Unauthorized: Token required' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    throw createError({ statusCode: 401, message: 'Unauthorized: Invalid token format' });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, config.jwtSecret) as {
      id: string;
      email: string;
      username: string;
    };

    // Attach user ke context (bisa dipakai di handler)
    event.context.user = decoded;
  } catch (err) {
    throw createError({ statusCode: 401, message: 'Unauthorized: Invalid or expired token' });
  }
});
