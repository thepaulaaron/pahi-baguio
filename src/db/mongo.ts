import { MongoClient, Db } from 'mongodb';

const client = new MongoClient('mongodb+srv://paulgapud:oc9I69pj0WCljX59@moversveltecluster.80qss.mongodb.net/?retryWrites=true&w=majority&appName=moversveltecluster');
// const client = new MongoClient('mongodb+srv://paulgapud:lprXgZ0ZjVEqRxKF@pahibaguio.sazta.mongodb.net/');
const dbName = 'moversveltedatabase';

export async function startMongo() {
    try {
        // Connect to the MongoDB server
        await client.connect();
        
        // List all databases to check if the dbName exists
        const databases = await client.db().admin().listDatabases();
        
        // Check if the specified dbName exists in the list
        const dbExists = databases.databases.some(db => db.name === dbName);
        
        if (!dbExists) {
            console.error(`Database "${dbName}" does not exist.`);
            throw new Error(`Database "${dbName}" does not exist.`);
        } else {
            console.warn(`Database "${dbName}" does exist!`);
        }

        // Return the database instance
        const db: Db = client.db(dbName);
        return db;

    } catch (error: any) {
        console.error('Database connection error:', error.message);
        throw new Error('Failed to connect to MongoDB');
    }
}
