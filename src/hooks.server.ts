// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { connectToDatabase } from '$db/mongo';

export const handle: Handle = async ({ event, resolve }) => {
    try {
        const db = await connectToDatabase();
        event.locals.db = db; // Assign the db to locals
    } catch (error) {
        console.error('Database connection error:', error);
        return new Response('Database connection error', { status: 500 });
    }

    const response = await resolve(event);
    return response;
};