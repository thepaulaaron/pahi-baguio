// sort.js
import { writable } from 'svelte/store';

interface Volunteer {
  id: number;
  Name: string;
  Birthday: string;
  // Add other fields as needed
}

// Initialize the data array with a type
export const array = writable<Volunteer[]>([]);

// Initialize sort state with a type
interface SortState {
  col: keyof Volunteer;
  ascending: boolean;
}

const sortBy = writable<SortState>({ col: "id", ascending: true });

// Function to update the sort state and sort the array
export function setSort(column: keyof Volunteer) {
  // Update the sort state
  sortBy.update(current => {
    const newAscending = current.col === column ? !current.ascending : true;
    return { col: column, ascending: newAscending };
  });

  // Update the sorted array
  sortBy.subscribe(current => {
    array.update(items => {
      const sortModifier = current.ascending ? 1 : -1;
      return [...items].sort((a, b) => (a[current.col] > b[current.col] ? 1 : -1) * sortModifier);
    });
  })();
}