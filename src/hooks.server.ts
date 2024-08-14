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
  console.log('hooks: Handling request:', event.request.url);

  try {
    const response = await resolve(event);
    console.log('hooks: Response status:', response.status);
    return response;
  } catch (error) {
    console.error('hooks: Error handling request:', error);
    throw error; // Re-throw error to be caught by SvelteKit
  }
};

// export async function handle({ event, resolve }) {
//     // Custom logic here
//     return await resolve(event);
// }