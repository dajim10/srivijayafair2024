export const getCounter = async (counterName) => {
    if (document.cookie.indexOf(counterName) >= 0) {
        const res = await fetch(`https://api.rmutsv.ac.th/counter/${counterName}/get`);
        const data = await res.json();
        // console.log('have cookie');
        // counterGet();
        return data.counter;

    } else {
        const res = await fetch(`https://api.rmutsv.ac.th/counter/${counterName}`);
        const data = await res.json();
        let d = new Date();
        d.setTime(d.getTime() + (5 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = `${counterName}=1;${expires};path=/`;
        // counterStart();
        return data.counter;
    }

}

export const getImage = async () => {
    // const url = import.meta.VITE_POCKETBASE_URL;
    const url = `https://sathern.rmutsv.ac.th:8077/api/files/specialstar/gzmj7o982521tzg/box_50_dGYs0djkYb.png`
    const res = await fetch(url);
    console.log(res.url)
    return res.url;
}

