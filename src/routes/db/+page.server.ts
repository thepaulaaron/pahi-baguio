import { volunteers } from "$db/mongo";
import type { PageServerLoad } from './$types';
import { serializeDocument } from '$lib/utils'; // Adjust the path as necessary

export const load: PageServerLoad = async function() {
    // Fetch the data from MongoDB
    const data = await volunteers.find().toArray();

    // Serialize the data
    const serializedData = data.map(serializeDocument);

    console.log('data', serializedData);

    return {
        volunteers: serializedData
    };
}
