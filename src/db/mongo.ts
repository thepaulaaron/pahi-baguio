import { MongoClient, Db } from 'mongodb';

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

// Optionally, export the collection directly (if you need it)
export async function getVolunteersCollection() {
    const db = await startMongo();
    return db.collection('volunteers'); // Returns the volunteers collection
}

export { client };