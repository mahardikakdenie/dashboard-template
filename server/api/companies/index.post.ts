import z from 'zod';
import { CommonResponse } from '~/types/common.types';
import { createError } from 'h3';
import auth from '../middleware/auth';

const companiesInputSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	website_url: z.string().url('Invalid URL'),
	location: z.string().min(1),
	status: z.enum(['active', 'inactive']),
	logo: z.string().url('Logo must be a valid URL'),
});

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const endpoint = 'companies';
	const urlEndpoint = `${config.public.apiBaseUrl}?name=${endpoint}`;

	try {
		await auth(event);

		const body = await readBody(event);
		const result = companiesInputSchema.safeParse(body);

		if (!result.success) {
			const errors: Record<string, string[]> = {};
			result.error.issues.forEach((issue) => {
				const path = issue.path.join('.');
				errors[path] = errors[path] || [];
				errors[path].push(issue.message);
			});

			throw createError({
				statusCode: 400,
				statusMessage: 'Validation Error',
				data: { message: 'Invalid company data', errors },
			});
		}

		const masterData = await $fetch<CommonResponse<any>[]>(urlEndpoint);
		const companyData = masterData.find((data) => data.name === endpoint);

		if (!companyData) {
			throw createError({
				statusCode: 500,
				statusMessage: 'Server Config Error',
				data: { message: 'Companies collection not found in database.' },
			});
		}

		if (!companyData.datas) companyData.datas = [];

		const newCompany = {
			id: crypto.randomUUID(),
			created_at: new Date().toISOString(),
			default_domain_tenant: `https://${result.data.name.split(' ').join("-").toLowerCase()}.mahardikakdenie.my.id`,
			...result.data,
		};

		companyData.datas.push(newCompany);

		await $fetch(`${config.public.apiBaseUrl}/${companyData.id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(companyData), // <-- pastikan stringify
		});

		return {
			meta: {
				status: 201,
				message: 'Company created successfully',
			},
			data: newCompany,
		};
	} catch (error: any) {
		console.error('[Create Company Error]:', error);

		if (error.statusCode) throw error; // Re-throw H3 errors

		throw createError({
			statusCode: 500,
			statusMessage: 'Internal Server Error',
			data: {
				message: 'Failed to create company.',
			},
		});
	}
});
