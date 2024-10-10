import { MongoClient, Collection } from 'mongodb';

// Hardcoded MongoDB connection string
const uri = 'mongodb+srv://paulgapud:lprXgZ0ZjVEqRxKF@pahibaguio.sazta.mongodb.net/pahi?retryWrites=true&w=majority';
const client = new MongoClient(uri);

const dbName = 'pahi';
const collName = 'volunteers';
const collection = client.db(dbName).collection(collName);

let isConnected = false; // Track the connection state

// Function to start the MongoDB client
export async function startMongo() {
    let dbError = {
        hasError: false,
        error: ''
    };

    try {
        if (!isConnected) {
            await client.connect();
            isConnected = true; // Update connection state
            console.log('MongoDB connected');
        }
    } catch (error: any) {
        dbError.hasError = true;
        dbError.error = error.message ?? "Error Connecting to DB";
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

// Export the collection for direct use
export { collection as volunteers };