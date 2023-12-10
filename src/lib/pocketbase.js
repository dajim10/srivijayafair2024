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

export const fetchFirstRecord = async () => {
    const phone = sessionStorage.getItem('phone');
    try {
        const existingRecord = await client.collection('register').getFirstListItem(`phone="${phone}"`);

        if (existingRecord) {
            console.log(existingRecord);
            setScore(existingRecord.score);
            setIsLogin(true);
        } else {
            console.log('No existing record found. Proceeding to createMember...');
        }

    }
    catch (err) {
        if (err.statusCode === 404) {
            // Handle the case where the document is not found
            console.log('Document not found. Proceeding to createMember...');
        } else {
            // createMember(); // Proceed to create the member even if the document is not found
            console.error('Error:', err);
        }
    }


};







// const username = import.meta.env.VITE_POCKETBASE_USERNAME;
// const password = import.meta.env.VITE_POCKETBASE_PASSWORD;

// const pb = new PocketBase(url, username, password);




