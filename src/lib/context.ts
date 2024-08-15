// src/lib/context.ts
import { writable } from 'svelte/store';

const selectedVolunteerId = writable<string | undefined>(undefined);

export { selectedVolunteerId };
