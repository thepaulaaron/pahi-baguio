import { writable } from "svelte/store";

export const openModal = writable(false);
export const isDialogOpen = writable(false);
export const activeTab = writable('editor'); //

export const showAddUserModal = writable(false);