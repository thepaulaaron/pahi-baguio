import { startMongo } from "$db/mongo";

startMongo()
    .then(() => {
        console.log('MongoDB started');
    })
    .catch((e) => {
        console.log('MongoDB failed to start');
        console.error(e);
    });


import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  console.log('Handling request:', event.request.url);

  try {
    const response = await resolve(event);
    console.log('Response status:', response.status);
    return response;
  } catch (error) {
    console.error('Error handling request:', error);
    throw error; // Re-throw error to be caught by SvelteKit
  }
};
