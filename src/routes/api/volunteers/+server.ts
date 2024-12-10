import { startMongo } from '../../../db/mongo'; // Adjust the path if needed
import type { WithId, Document } from 'mongodb';

interface Volunteer extends Document {
  _id: string;
  Surname: string;
  Fname: string;
}

export async function GET() {
  try {
    const db = await startMongo(); // Get the database instance
    
    // Fetch all volunteers
    const data = await db.collection('moversveltecollection').find({}).toArray();

    // Serialize ObjectId to string
    const serializedData: Volunteer[] = data.map((item: WithId<Document>) => ({
      _id: item._id.toString(),
      Surname: item.Surname,
      Fname: item.Fname,
    }));

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
