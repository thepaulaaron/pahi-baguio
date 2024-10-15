import { getVolunteersCollection } from '$db/mongo'; // Import the function to get the volunteers collection
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    try {
        const collection = await getVolunteersCollection(); // Get the volunteers collection
        const volunteers = await collection.find({}).toArray(); // Fetch the volunteers

        // Convert ObjectId to string for serialization
        const serializableVolunteers = volunteers.map(volunteer => ({
            ...volunteer,
            _id: volunteer._id.toString() // Convert _id to string
        }));

        return json({ volunteers: serializableVolunteers });
    } catch (error) {
        console.error('Error fetching volunteers:', error);
        return json({ error: 'Failed to fetch volunteers' }, { status: 500 });
    }
};