// src/db/mongo.ts
import { MongoClient, Db } from 'mongodb';

let client: MongoClient | null = null;

export const startMongo = async (): Promise<Db> => {
    if (!client) {
        const uri = 'mongodb+srv://paulgapud:lprXgZ0ZjVEqRxKF@pahibaguio.sazta.mongodb.net/';
        if (!uri) {
            throw new Error('MONGODB_URI is not defined');
        }
        client = new MongoClient(uri);
        await client.connect();
    }
    return client.db('pahi');
};

export const volunteers = async () => {
    const db = await startMongo();
    return db.collection('volunteers'); // Assuming this is the collection name
};

// Optionally, you could export connectToDatabase if you need it elsewhere
export const connectToDatabase = async (): Promise<Db> => {
    return startMongo();
};