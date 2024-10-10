import { MongoClient, ObjectId } from 'mongodb';

// MongoDB connection URL and database name
const uri = 'mongodb+srv://paulgapud:lprXgZ0ZjVEqRxKF@pahibaguio.sazta.mongodb.net/'; // Update with your MongoDB connection string
const dbName = 'pahi'; // Update with your database name

// Create a new MongoClient
const client = new MongoClient(uri);

let db: any;

// Function to start MongoDB connection
export async function startMongo() {
    if (!db) {
        await client.connect();
        db = client.db(dbName);
    }
    return db.collection('volunteers'); // Ensure you return the 'volunteers' collection
}

// Function to serialize MongoDB documents
export function serializeDocument(doc: any) {
    const { _id, ...rest } = doc;
    return { id: _id.toString(), ...rest }; // Serialize _id to string
}

// Export the volunteers collection
export const volunteers = () => startMongo().then(() => db.collection('volunteers'));
