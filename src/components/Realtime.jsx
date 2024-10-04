import PocketBase from 'pocketbase';

const pb = new PocketBase(`${import.meta.env.VITE_POCKETBASE_URL}`);

// (Optionally) authenticate
// await pb.collection('users').authWithPassword(import.meta.env.VITE_POCKETBASE_USERNAME, import.meta.env.VITE_POCKETBASE_PASSWORD);

// Subscribe to changes in any record in the collection
pb.collection('register').subscribe('*', function (e) {
    console.log(e.action);
    console.log(e.record);
}, { /* other options like expand, custom headers, etc. */ });


// Subscribe to changes only in the specified record
// pb.collection('example').subscribe('RECORD_ID', function (e) {
//     console.log(e.action);
//     console.log(e.record);
// }, { /* other options like expand, custom headers, etc. */ });


// Unsubscribe
pb.collection('example').unsubscribe('RECORD_ID'); // remove all 'RECORD_ID' subscriptions
pb.collection('example').unsubscribe('*'); // remove all '*' topic subscriptions
pb.collection('example').unsubscribe(); // remove all subscriptions in the collection

const Realtime = () => {
    return (
        <div>
            <h1>Realtime</h1>
        </div>
    )
}

export default Realtime

