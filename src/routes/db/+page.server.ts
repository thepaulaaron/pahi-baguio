import { startMongo } from "$db/mongo"; // Import startMongo to get the collection

export const load = async () => {
    try {
        const collection = await startMongo();
        const volunteers = await collection.find({}).toArray();

        // Convert _id to string
        const serializedVolunteers = volunteers.map((volunteer: { _id: { toString: () => any; }; }) => ({
            ...volunteer,
            _id: volunteer._id.toString() // Convert ObjectId to string
        }));

        return {
            volunteers: serializedVolunteers
        };
    } catch (error) {
        console.error('Error fetching volunteers:', error);
        return {
            error: 'Failed to fetch volunteers'
        };
    }
};