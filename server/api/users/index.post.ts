import { hash, compare } from 'bcryptjs';
import z from 'zod';
import { createError } from 'h3';
import { CommonResponse } from '~/types/common.types';
import { User } from '~/types/user.type';

const userInputSchema = z.object({
	username: z.string().min(3),
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(6), // minimal 6 karakter
});

const config = useRuntimeConfig();
const masterEndpoint = 'users';

export default defineEventHandler(async (event) => {
	try {
		const body = await readBody(event);
		const result = userInputSchema.safeParse(body);

		if (!result.success) {
			const errors: Record<string, string[]> = {};
			result.error.issues.forEach((issue) => {
				const path = issue.path.join('.');
				if (!errors[path]) {
					errors[path] = [];
				}
				errors[path].push(issue.message);
			});

			throw createError({
				statusCode: 400,
				statusMessage: 'Bad Request',
				data: {
					message: 'Validasi gagal',
					errors,
				},
			});
		}

		// Ambil data master
		const masterDatas = await $fetch<CommonResponse<User[]>[]>(
			`${config.public.apiBaseUrl}?name=${masterEndpoint}`,
			{
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			}
		).then((res) => res[0] ?? null);

		// Cek duplikasi username/email
		const searchUsers = masterDatas?.datas?.filter(
			(user) =>
				user.username === result.data.username ||
				user.email === result.data.email
		);

		if (searchUsers && searchUsers.length > 0) {
			throw createError({
				statusCode: 409,
				statusMessage: 'Conflict',
				data: {
					message: 'Username atau email sudah digunakan',
				},
			});
		}

		// ✅ HASH PASSWORD SEBELUM DISIMPAN
		const hashedPassword = await hash(result.data.password, 12); // salt rounds = 12

		// Duplicate & push data baru
		const masterPayloads = JSON.parse(JSON.stringify(masterDatas || {}));
		const userPayloads = JSON.parse(JSON.stringify(masterDatas?.datas || []));

		userPayloads.push({
			id: crypto.randomUUID(),
			created_at: new Date().toISOString(),
			username: result.data.username,
			name: result.data.name,
			email: result.data.email,
			password: hashedPassword,
			status: 'inactive',
		});

		masterPayloads.datas = userPayloads;

		// Simpan ke backend
		const users = await $fetch(
			`${config.public.apiBaseUrl}/${masterPayloads.id}`,
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: masterPayloads,
			}
		);

		return {
			success: true,
			message: 'User berhasil dibuat',
			data: users,
		};
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Internal Server Error',
			data: {
				message: 'Terjadi kesalahan pada server',
				error: (error as Error).message,
			},
		});
	}
});
