import { startMongo } from '$db/mongo'; // Adjust the import path if necessary

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

        console.log(serializableData);
        return {
            data: serializableData // Return the serialized data
            
        };
    } catch (error) {
        console.error('Error loading volunteers:', error);
        return {
            data: [] // Ensure an empty array is returned in case of an error
        };
    }
}