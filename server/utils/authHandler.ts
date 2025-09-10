import { EventHandler, H3Event } from 'h3';
import { createError } from 'h3';
import auth from '../../middleware/auth';

interface AuthenticatedHandler<T = any> {
  (event: H3Event, user: any): Promise<T>;
}

export function createAuthHandler<T = any>(
  handler: AuthenticatedHandler<T>
): EventHandler {
  return defineEventHandler(async (event) => {
    // try {
      await auth(event);
      const user = event.context.user;
      if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthorized' });
      }

      const result = await handler(event, user);

      return {
        meta: { status: 200, message: 'Success' },
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
         result,
      };
    // } catch (error: any) {
    //   throw createError({
    //     statusCode: error.statusCode || 500,
    //     message: error.message || 'Internal Server Error',
    //   });
    // }
  });
}
