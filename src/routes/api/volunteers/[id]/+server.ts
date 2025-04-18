import { startMongo } from '../../../../db/mongo';
import { ObjectId } from 'mongodb';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

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
    return json({ error: 'Failed to fetch volunteer' }, { status: 500 });
  }
}

export const PUT: RequestHandler = async ({ params, request }) => {
  const id = params.id!;
  const data = await request.json();

  console.log("Received data:", data);

  try {
    const db = await startMongo();

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return json({ error: 'Invalid ID format' }, { status: 400 });
    }

    // Remove _id if it exists in the incoming data
    delete data._id;

    // Update the volunteer in the database
    const result = await db.collection('moversveltecollection').updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );

    if (result.matchedCount === 0) {
      return json({ error: 'Volunteer not found' }, { status: 404 });
    }

    // Return the result of the update operation
    return json({ success: result.modifiedCount > 0 });
  } catch (err) {
    console.error('Server error:', err);
    return json({ error: 'Failed to update volunteer' }, { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ params }) => {
  const id = params.id!;
  try {
    const db = await startMongo();

    if (!ObjectId.isValid(id)) {
      return json({ error: 'Invalid ID format' }, { status: 400 });
    }

    const result = await db.collection('moversveltecollection').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return json({ error: 'Volunteer not found' }, { status: 404 });
    }

    return json({ success: true });
  } catch (err) {
    console.error('Error deleting volunteer:', err);
    return json({ error: 'Failed to delete volunteer' }, { status: 500 });
  }
};