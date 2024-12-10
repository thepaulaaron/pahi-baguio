// src/routes/db/+page.server.ts
import { startMongo } from '$db/mongo';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  try {
    const db = await startMongo();
    const volunteers = await db.collection('moversveltecollection').find().toArray();
    
    // Log the raw data fetched
    console.log('Received data of length:', volunteers.length);
    console.log('Serialized data type:', Array.isArray(volunteers));

    // Serialize the data to ensure it's compatible for passing to the frontend
    const serializedData = volunteers.map((volunteer) => ({
      _id: volunteer._id.toString(),
      Surname: volunteer.Surname,
      Fname: volunteer.Fname,
    }));

    console.log('Serialized data length:', serializedData.length);
    
    return { data: serializedData };
  } catch (error) {
    console.error('Error loading volunteers:', error);
    return { data: [] };
  }
};
