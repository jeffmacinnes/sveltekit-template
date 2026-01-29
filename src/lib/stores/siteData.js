import { browser, dev } from '$app/environment';
import { writable } from 'svelte/store';

export const data = writable(null);
export const debugging = writable(dev);

// --- Authentication
const initialAuthenticated = browser
	? sessionStorage.getItem('authenticated') === 'true' || dev
	: false;
export const authenticated = writable(initialAuthenticated);

// Subscribe to changes and update sessionStorage
if (browser) {
	authenticated.subscribe((value) => {
		sessionStorage.setItem('authenticated', value);
	});
}
