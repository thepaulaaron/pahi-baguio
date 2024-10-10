// src/routes/api/volunteers/[id]/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { createMongoClient } from '$db/mongo';

export const PUT: RequestHandler = async ({ request, params }) => {
    const { id } = params;
    const updatedVolunteer = await request.json();

    try {
        const collection = await createMongoClient();  // Ensure the collection is retrieved
        const { _id, ...updateData } = updatedVolunteer;

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
