import { dev } from '$app/environment';
import { writable } from 'svelte/store';

export const data = writable(null);
export const debugging = writable(dev);
