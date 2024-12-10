import { startMongo } from '../../../../db/mongo'; // Adjust the path if needed
import { ObjectId } from 'mongodb';

export async function GET({ params }) {
  const { id } = params;  // This is the dynamic ID from the URL
  
  try {
    const db = await startMongo(); // Get the database instance
    
    // Fetch the volunteer by _id
    const volunteer = await db.collection('moversveltecollection').findOne({ _id: new ObjectId(id) });

    if (!volunteer) {
      return new Response(
        JSON.stringify({ error: 'Volunteer not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Serialize ObjectId to string and return as JSON
    return new Response(
      JSON.stringify({
        _id: volunteer._id.toString(),
        Surname: volunteer.Surname,
        Fname: volunteer.Fname,
      }),
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
