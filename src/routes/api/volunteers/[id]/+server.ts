import type { RequestHandler } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { volunteers } from '$db/mongo'; // Import the MongoDB collection from mongo.ts

export const PUT: RequestHandler = async ({ request, params }) => {
  const { id } = params;
  const updatedVolunteer = await request.json();

  try {
    const { _id, ...updateData } = updatedVolunteer;

    // Ensure the _id is correctly handled as an ObjectId
    const result = await volunteers.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.modifiedCount === 0) {
      return new Response(JSON.stringify({ message: 'Volunteer not updated' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ message: 'Volunteer updated successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error updating volunteer:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
