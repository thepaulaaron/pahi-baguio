// sort.js
import { derived, writable } from 'svelte/store';

export interface Volunteer {
  _id: number;
  Name: string;
  FName: string;
  Midname: string;
  Surname: string;
  Suffixname: string;
  VolType: string;
  Birthday: string;
  // Add other fields as needed
}

// Initialize the data array with a type
const initialVolunteers: Volunteer[] = []; // Initialize with empty array or your default data
export const array = writable<Volunteer[]>(initialVolunteers);