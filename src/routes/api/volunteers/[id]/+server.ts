// src/routes/api/volunteers/+server.ts
import { startMongo } from '$db/mongo'; // Ensure this matches the export from mongo.ts
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    try {
        const db = await startMongo(); // This should return the database instance
        const collection = db.collection('volunteers'); // Get the volunteers collection
        const volunteers = await collection.find({}).toArray(); // Fetch the volunteers
        return json({ volunteers });
    } catch (error) {
        console.error('Error fetching volunteers:', error);
        return json({ error: 'Failed to fetch volunteers' }, { status: 500 });
    }
};