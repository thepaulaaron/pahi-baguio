// src/routes/api/volunteers/+server.ts
import { startMongo } from '$db/mongo';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    try {
        const collection = await startMongo();
        const volunteers = await collection.find({}).toArray();
        return json({ volunteers });
    } catch (error) {
        console.error('Error fetching volunteers:', error);
        return json({ error: 'Failed to fetch volunteers' }, { status: 500 });
    }
};