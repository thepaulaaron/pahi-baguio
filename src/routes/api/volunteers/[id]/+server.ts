import { startMongo } from '../../../../db/mongo';
import { ObjectId } from 'mongodb';

export async function GET({ params }: { params: { id: string } }) {
  const { id } = params; // Dynamic ID from the URL
  
  try {
    const db = await startMongo(); // Get the database instance

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({ error: 'Invalid ID format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Fetch the volunteer by _id
    const volunteer = await db.collection('moversveltecollection').findOne({ _id: new ObjectId(id) });

    if (!volunteer) {
      return new Response(
        JSON.stringify({ error: 'Volunteer not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Serialize ObjectId to string and include all metadata dynamically
    const { _id, ...rest } = volunteer; // Destructure _id and keep other fields
    const serializedVolunteer = {
      _id: _id.toString(),
      ...rest, // Add the rest of the fields without re-adding _id
    };

    return new Response(
      JSON.stringify(serializedVolunteer),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error fetching volunteer:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch volunteer' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
