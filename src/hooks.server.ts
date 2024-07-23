import { startMongo } from "$db/mongo";

startMongo()
    .then(() => {
        console.log('MongoDB started');
    })
    .catch((e) => {
        console.log('MongoDB failed to start');
        console.error(e);
    });
