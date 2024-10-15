// src/db/mongo.ts
import { MongoClient, Collection } from 'mongodb';

const mongoURI = 'mongodb+srv://paulgapud:oc9I69pj0WCljX59@moversveltecluster.80qss.mongodb.net/?retryWrites=true&w=majority&appName=moversveltecluster';
const client = new MongoClient(mongoURI);
const dbName = 'moversveltedatabase';
const collName = 'moversveltecollection';

// Function to create and return the volunteers collection
export async function createMongoClient(): Promise<Collection> {
    // Connect to the client if not already connected
    try {
        await client.connect();
        console.log('MongoDB connected: ' + dbName);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; // Re-throw to handle it in the caller
    }
    return client.db(dbName).collection(collName);
}

// Optional: Close MongoDB connection on server shutdown
process.on('SIGINT', async () => {
    console.log('Closing MongoDB connection...');
    await client.close();
    process.exit(0);
});

// Export the collection directly if needed
export const volunteers = client.db(dbName).collection(collName);