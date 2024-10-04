
import { client } from "./pocketbase";

export const getScore = async () => {
    // const userId = sessionStorage.getItem('id');
    // console.log(userId)
    // const res = await client.collection('register').getFirstListItem(`userId="${userId}"`);
    // if (res) {
    //     await client.collection('register').update(res.id, { score: res.score + 1 }).then(() => { console.log('update score') });
    // }

    const userId = sessionStorage.getItem('id');

    if (userId || userId !== '') {


        const score = await client.collection('register').getFirstListItem(`id="${userId}"`, {
            expand: 'score',
        }).then(res => {
            // console.log(res)
            return res.score;
        })

        await client.collection('register').update(userId, {
            score: score + 1
        }).then(res => console.log(res))
            .catch(err => console.log(err))

    }


}

// export const counterSrivijaya = async () => {
//     const res = await fetch(`https://sathern.rmutsv.ac.th:8077/api/counter/srivijaya`);
//     const data = await res.json();
//     return data.counter;
// }

export const myCounter = async (name) => {
    const counterName = name;
    const registerType = sessionStorage.getItem('register_type');
    console.log(counterName)

    // const phone = sessionStorage.getItem('phone');
    try {
        const existingRecord = await client.collection('counter1').getFirstListItem(`name="${counterName}"`);

        if (existingRecord) {

            switch (registerType) {

                case '1':
                    const dataUpdate = {
                        counter1: existingRecord.counter1 + 1
                    }
                    await client.collection('counter1').update(existingRecord.id, dataUpdate);
                    break;
                case '2':
                    const dataUpdate2 = {
                        counter2: existingRecord.counter2 + 1
                    }
                    await client.collection('counter1').update(existingRecord.id, dataUpdate2);
                    break;
                case '3':
                    const dataUpdate3 = {
                        counter3: existingRecord.counter3 + 1
                    }
                    await client.collection('counter1').update(existingRecord.id, dataUpdate3);
                    break;
                case '4':
                    const dataUpdate4 = {
                        counter4: existingRecord.counter4 + 1
                    }
                    await client.collection('counter1').update(existingRecord.id, dataUpdate4);
                    break;
                default:
                    const dataUpdate5 = {
                        counter5: existingRecord.counter5 + 1
                    }
                    await client.collection('counter1').update(existingRecord.id, dataUpdate5);
                    break;



            }

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

    // check counter name from pocketbase







}



export const mainCounter = async (counterName) => {

    const res = await fetch(`https://api.rmutsv.ac.th/counter/${counterName}`);
    const data = await res.json();
    return data.counter;
}


export const getCounter = async (counterName) => {
    // if (document.cookie.indexOf(counterName) >= 0) {
    //     const res = await fetch(`https://api.rmutsv.ac.th/counter/${counterName}/get`);
    //     const data = await res.json();
    //     // console.log('have cookie');
    //     // counterGet();
    //     return data.counter;

    // } else {
    //     const res = await fetch(`https://api.rmutsv.ac.th/counter/${counterName}`);
    //     const data = await res.json();
    //     // ยกเลิกการใช้งาน
    //     let d = new Date();
    //     d.setTime(d.getTime() + (1 * 60 * 1000));
    //     let expires = "expires=" + d.toUTCString();
    //     document.cookie = `${counterName}=1;${expires};path=/`;
    //     console.log('no cookie');
    //     counterStart();
    const res = await fetch(`https://api.rmutsv.ac.th/counter/${counterName}`);
    const data = await res.json();
    console.log('counter get')
    return data.counter;

}




export const getImage = async () => {
    // const url = import.meta.VITE_POCKETBASE_URL;
    const url = `https://sathern.rmutsv.ac.th:8077/api/files/specialstar/gzmj7o982521tzg/box_50_dGYs0djkYb.png`
    const res = await fetch(url);
    console.log(res.url)
    return res.url;
}


