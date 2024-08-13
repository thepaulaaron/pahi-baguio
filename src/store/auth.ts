// src/stores/auth.ts
import { writable } from 'svelte/store';

const initialAuth = false; // Default to not authenticated on server

export const isAuthenticated = writable(initialAuth);

if (typeof window !== 'undefined') {
  const storedAuth = localStorage.getItem('isAuthenticated') === 'true';
  isAuthenticated.set(storedAuth);

  isAuthenticated.subscribe(value => {
    localStorage.setItem('isAuthenticated', value ? 'true' : 'false');
  });
}