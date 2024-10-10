import type { RequestHandler } from '@sveltejs/kit';
import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient('mongodb+srv://paulgapud:lprXgZ0ZjVEqRxKF@pahibaguio.sazta.mongodb.net/');
const db = client.db('pahi');
const collection = db.collection('volunteers');

export const PUT: RequestHandler = async ({ request, params }) => {
  const { id } = params;
  const updatedVolunteer = await request.json();

  try {
    const { _id, ...updateData } = updatedVolunteer;

    // Ensure the _id is used correctly
    const result = await collection.updateOne(
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