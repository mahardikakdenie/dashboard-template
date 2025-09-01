import z from 'zod';
import { defineEventHandler, readBody, createError } from 'h3';
import { ThemeDatas, Themes } from '~/types/themes.types';

const themeItemSchema = z.object({
	name: z.string(),
	image: z.string(),
	author: z.string(),
});

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const result = themeItemSchema.safeParse(body);

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

	try {
		const masterData = await $fetch<Themes[]>(
			`${config.public.apiBaseUrl}?name=themes`,
			{
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			}
		);

		const themesData: Themes | undefined = masterData.find(
			(data) => data.name === 'themes'
		);

		if (!themesData) {
			throw createError({
				statusCode: 404,
				statusMessage: 'Not Found',
				data: {
					message: 'Data themes tidak ditemukan',
				},
			});
		}

		const newItem: ThemeDatas = {
			id: crypto.randomUUID(),
            created_at: new Date().toString(),
			...result.data,
		};

		themesData.datas.push(newItem);

		const updatedThemes: Themes = await $fetch(
			`${config.public.apiBaseUrl}/${themesData.id}`,
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: themesData,
			}
		);

		return {
			success: true,
			data: updatedThemes,
		};
	} catch (error: any) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Internal Server Error',
			data: {
				message: 'Gagal memperbarui data',
				error: error.message || String(error),
			},
		});
	}
});
