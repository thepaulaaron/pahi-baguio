// sort.js
import { writable } from 'svelte/store';

export interface Volunteer {
  _id: number;
  Name: string;
  Birthday: string;
  // Add other fields as needed
}

// Initialize the data array with a type
export const array = writable<Volunteer[]>([]);