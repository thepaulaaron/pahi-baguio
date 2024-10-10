import { startMongo } from '$db/mongo';

// Exported load function
export const load = async () => {
    try {
        const collection = await startMongo();
        const volunteers = await collection.find({}).toArray();

        // Convert _id to string
        const serializedVolunteers = volunteers.map((volunteer) => ({
            ...volunteer,
            _id: volunteer._id.toString() // Convert ObjectId to string
        }));

        // Return a plain object instead of a Response
        return {
            volunteers: serializedVolunteers
        };
    } catch (error) {
        console.error('Error fetching volunteers:', error);
        return {
            error: 'Failed to fetch volunteers' // Return error as part of the object
        };
    }
};
