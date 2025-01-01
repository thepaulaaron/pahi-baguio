import { startMongo } from '../../../db/mongo';
import type { WithId, Document } from 'mongodb';

export async function GET() {
  try {
    const db = await startMongo(); // Get the database instance

    // Fetch all volunteers
    const data = await db.collection('moversveltecollection').find({}).toArray();

    // Serialize ObjectId to string and include all metadata dynamically
    const serializedData = data.map((item: WithId<Document>) => {
      const { _id, ...rest } = item; // Exclude _id for conversion
      return { _id: _id.toString(), ...rest }; // Convert _id and spread the rest
    });

    // Return response as JSON
    return new Response(JSON.stringify(serializedData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error loading volunteers:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to load volunteers' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
