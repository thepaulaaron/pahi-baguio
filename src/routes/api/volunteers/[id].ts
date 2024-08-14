import type { RequestHandler } from '@sveltejs/kit';
import { MongoClient, ObjectId } from 'mongodb';
import { MONGO_URL } from '$env/static/private';

const client = new MongoClient(MONGO_URL);
const db = client.db('pahi');
const collection = db.collection('volunteers');

export const put: RequestHandler = async ({ request, params }) => {
    const { id } = params;
    const updatedVolunteer = await request.json();

    console.log('Received PUT request for ID:', id);
    console.log('Updated Volunteer:', updatedVolunteer);

    try {
        await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedVolunteer });
        
        return new Response(JSON.stringify({ message: 'Volunteer updated successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error updating volunteer:', error);
        return new Response(JSON.stringify({ message: 'Failed to update volunteer' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};