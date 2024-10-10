import { MongoClient, Collection } from 'mongodb';
import dotenv from 'dotenv'; // Import dotenv
dotenv.config(); // Load environment variables from .env file

// Use the environment variable for MongoDB connection string
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://default-uri';
const client = new MongoClient(MONGO_URI);
const dbName = 'pahi';
const collName = 'volunteers';

// The collection used in the app
const collection: Collection = client.db(dbName).collection(collName);

// Function to start MongoDB client connection
export async function startMongo() {
    let dbError = {
        hasError: false,
        error: ''
    };

    try {
        await client.connect();
        console.log('MongoDB connected successfully');
    } catch (error: any) {
        dbError.hasError = true;
        dbError.error = error.message ?? "Error Connecting to DB";
        console.error('Error connecting to MongoDB:', error.message);
    }

    return { dbError };
}

// Utility function to retrieve URLs
export async function returnURLsList(collection: Collection) {
    try {
        const urlList = await collection.find().toArray();
        const serializedUrls = urlList.map(item =>
            JSON.parse(JSON.stringify(item, (key, value) => key === '_id' ? value.toString() : value))
        );
        return serializedUrls;
    } catch (error: any) {
        console.error('Error retrieving URL List:', error.message);
        throw error;
    }
}

// Export the collection for use in other files
export { collection as volunteers };