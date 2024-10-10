import type { RequestHandler } from '@sveltejs/kit';
import { MongoClient, ObjectId } from 'mongodb';
import { startMongo, volunteers } from '../../../../db/mongo'; // Adjust the import path as needed

export const PUT: RequestHandler = async ({ request, params }) => {
    const { id } = params;
    const updatedVolunteer = await request.json();

    try {
        const { dbError } = await startMongo(); // Ensure the database is connected

        if (dbError.hasError) {
            return new Response(JSON.stringify({ message: dbError.error }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const { _id, ...updateData } = updatedVolunteer;

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