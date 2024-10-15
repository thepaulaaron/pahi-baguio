import { startMongo } from '../../../db/mongo'; // Adjust the path as necessary

export async function load() {
    try {
        const db = await startMongo(); // Get the database instance

        // Fetch data from the volunteers collection
        const data = await db.collection('volunteers').find({}).toArray();

        // Convert ObjectId to string for serialization
        const serializableData = data.map(item => ({
            ...item,
            _id: item._id.toString() // Convert _id to string
        }));

        return {
            data: serializableData // Return the serialized data
        };
    } catch (error) {
        console.error('Error loading volunteers:', error);
        return {
            data: [], // Return an empty array in case of error
            error: 'Failed to load volunteers' // Optional: return an error message
        };
    }
}