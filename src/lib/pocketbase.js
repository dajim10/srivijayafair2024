// Path: src/lib/pocketbase.js

import PocketBase from 'pocketbase';
// const url = "https://sathern.rmutsv.ac.th:8077/";
const url = import.meta.env.VITE_POCKETBASE_URL;
export const client = new PocketBase(url);
client.autoCancellation(false)

export async function createUser(phone, fullname, email, address) {
    const data = { phone: phone, fullname: fullname, email: email, address: address };
    await client.collection('register').create(data);
}







// const username = import.meta.env.VITE_POCKETBASE_USERNAME;
// const password = import.meta.env.VITE_POCKETBASE_PASSWORD;

// const pb = new PocketBase(url, username, password);




