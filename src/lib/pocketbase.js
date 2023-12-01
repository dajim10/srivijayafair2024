// Path: src/lib/pocketbase.js

import PocketBase from 'pocketbase';
const url = "https://sathern.rmutsv.ac.th:8077/";
export const client = new PocketBase(url);
client.autoCancellation(false)


// const username = import.meta.env.VITE_POCKETBASE_USERNAME;
// const password = import.meta.env.VITE_POCKETBASE_PASSWORD;

// const pb = new PocketBase(url, username, password);




