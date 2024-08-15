// src/stores/dataStore.ts
import { writable } from 'svelte/store';
import type { Volunteer } from '../routes/db/sort'; // Adjust the path to where your Volunteer type is defined

// Create a writable store for the data
export const dataStore = writable<Volunteer[]>([]);
