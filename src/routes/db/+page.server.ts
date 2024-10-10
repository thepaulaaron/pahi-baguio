// src/routes/test/another/+page.server.ts
import { volunteers } from "$db/mongo";
import type { PageServerLoad } from './$types';
import { serializeDocument } from '$lib/utils'; // Adjust the path as necessary

export const load: PageServerLoad = async () => {
    const volunteersCollection = await volunteers();
    const volunteersList = await volunteersCollection.find({}).toArray();
    
    return {
        volunteers: serializeDocument(volunteersList) // Assuming you want to serialize the documents
    };
};