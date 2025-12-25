import { CommonResponse, META } from "~/types/common.types";
import auth from "../middleware/auth";

export default defineEventHandler(async (event): Promise<{meta: META, data: any}> => {
  const config = useRuntimeConfig();
  const urlEndpoint = `${config.public.apiBaseUrl}/user/role`;

  try {
    await auth(event);
    const token = event.context.token;

    if (!token) {
      throw createError({ statusCode: 401, message: 'Unauthorized: Missing token' });
    }

    const { limit, page, search } = getQuery(event)

    const response = await $fetch<any>(urlEndpoint, {
      method: 'GET',
      params: {
        limit,
        page,
        search,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      meta: response.meta,
      data: response.data,
    };
  } catch (error: any) {
    console.log(error);
    
    const statusCode = error.statusCode || error.status || 500;
    const message = error.message || 'Internal Server Error';

    throw createError({
      statusCode,
      message,
    });
  }
});
