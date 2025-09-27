// server/api/auth.post.ts
import { compare } from 'bcryptjs';
import { createError } from 'h3';
import jwt, { Secret } from 'jsonwebtoken';
import { CommonResponse } from '~/types/common.types';
import { User } from '~/types/user.type';

const config = useRuntimeConfig();
const masterEndpoint = 'users';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const { email, password } = body;

	// Ambil data master
	const masterDatas = await $fetch<CommonResponse<User[]>[]>(
		`${config.public.apiBaseUrl}?name=${masterEndpoint}`,
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		}
	).then((res) => res[0] ?? null);

	// Cari user berdasarkan email
	const user = masterDatas?.datas?.find((u: User) => u.email === email);

	if (!user) {
		throw createError({
			statusCode: 401,
			message: 'Email atau password salah',
		});
	}

	if (!config.jwtSecret) {
		throw createError({
			statusCode: 500,
			message: 'JWT Secret not configured',
		});
	}

	// Bandingkan password
	const isValid = await compare(password, user.password ?? '');

	if (!isValid) {
		throw createError({
			statusCode: 401,
			message: 'Email atau password salah',
		});
	}

	// ✅ Generate JWT Token
	console.log("config.jwtExpiresIn ||  : ", config.jwtExpiresIn);
	
	const token = jwt.sign(
		user as User,
		(config.jwtSecret! as Secret) ?? 'default_secret',
		{
			expiresIn: '7d',
		}
	);

	// ✅ Kembalikan token + user info (tanpa password)
	return {
		success: true,
		message: 'Login berhasil',
		token,
		user: {
			password: undefined,
			...user,
			id: user.id,
			name: user.name,
			email: user.email,
			username: user.username,
		},
	};
});
