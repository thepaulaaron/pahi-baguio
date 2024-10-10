// src/hooks.server.ts
import { createMongoClient } from "$db/mongo";

let isMongoInitialized = false;

export const handle = async ({ event, resolve }) => {
    console.log('hooks: Handling request:', event.request.url);

    if (!isMongoInitialized) {
        try {
            await createMongoClient();
            isMongoInitialized = true;
            console.log('MongoDB initialized in hooks');
        } catch (error) {
            console.error('MongoDB failed to initialize', error);
        }
    }

    const response = await resolve(event);
    console.log('hooks: Response status:', response.status);
    return response;
};