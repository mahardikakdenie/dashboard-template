import { defineEventHandler, readBody, createError } from 'h3';
import { $fetch } from 'ofetch';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const backendUrl = useRuntimeConfig().public.apiBaseUrl;
    // console.log("🚀 ~ backendUrl:", backendUrl)

    const res = await $fetch(`${backendUrl}/auth/login`, {
      method: 'POST',
      body,
    });

    return res;
  } catch (err: any) {
    throw createError({
      statusCode: err.status || 500,
      message: err.data?.message || 'Login failed',
    });
  }
});
