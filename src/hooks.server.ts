// src/hooks.server.ts
import { startMongo } from '$db/mongo';

export const handle = async ({ event, resolve }) => {
    console.log('hooks: Handling request:', event.request.url);

    // Ensure MongoDB is connected
    await startMongo().catch((e) => {
        console.error('MongoDB failed to start:', e);
    });

    const response = await resolve(event);
    console.log('hooks: Response status:', response.status);
    return response;
};