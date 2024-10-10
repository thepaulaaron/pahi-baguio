// src/db/mongo.ts
import { MongoClient, Collection } from 'mongodb';

let client: MongoClient | null = null; // Initialize as null
let collection: Collection | null = null; // Initialize as null

const uri = 'mongodb+srv://paulgapud:lprXgZ0ZjVEqRxKF@pahibaguio.sazta.mongodb.net/'; // Replace with your actual MongoDB connection string

export const startMongo = async () => {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
        collection = client.db('pahi').collection('volunteers'); // Replace with your actual DB and collection
    }
    return collection!;
};

export const closeMongo = async () => {
    if (client) {
        await client.close();
        client = null; // Reset client to null
        collection = null; // Reset collection to null
    }
};