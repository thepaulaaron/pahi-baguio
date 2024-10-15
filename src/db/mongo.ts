import { MongoClient, Db } from 'mongodb';

// const uri = 'mongodb+srv://paulgapud:lprXgZ0ZjVEqRxKF@pahibaguio.sazta.mongodb.net/'; // Connection string from MongoDB Atlas

const uri = 'mongodb+srv://paulgapud:oc9I69pj0WCljX59@moversveltecluster.80qss.mongodb.net'
let client: MongoClient;

export async function startMongo(): Promise<Db> {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
    }
    return client.db('pahi'); // Replace with your actual database name
}

// Optionally, export the collection directly (if you need it)
export async function getVolunteersCollection() {
    const db = await startMongo();
    return db.collection('volunteers'); // Returns the volunteers collection
}

export { client };