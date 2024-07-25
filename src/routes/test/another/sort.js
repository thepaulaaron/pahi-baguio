// @ts-nocheck
// sort.js
import { writable } from 'svelte/store';

// Initialize the data array
export const array = writable([
  { id: 1, val: "helslo" },
  { id: 2, val: "world" },
  { id: 3, val: "sorted" },
  { id: 4, val: "table" }
]);

// Initialize sort state
const sortBy = writable({ col: "id", ascending: true });

// Function to update the sort state and sort the array
export function setSort(column) {
  sortBy.update(current => {
    const newAscending = current.col === column ? !current.ascending : true;
    const sortModifier = newAscending ? 1 : -1;

    // Sort the array based on the new state
    array.update(items =>
      [...items].sort((a, b) => (a[column] > b[column] ? 1 : -1) * sortModifier)
    );

    // Return the new sort state
    return { col: column, ascending: newAscending };
  });
}