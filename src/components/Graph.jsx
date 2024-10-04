import React, { useEffect } from 'react'
import ProgramBar from './programBar'
import FacultyBar from './FacultyBar'
import RegistBar from './RegisterBar'
import { client } from '../lib/pocketbase';
import ReWardsReport from './ReWardsReport';
const Graph = () => {

    // useEffect(() => {
    //     setInterval(() => {
    //         window.location.reload();
    //     }, 30000);

    //     const fetchData = async () => {
    //         // Fetch data using pocketbase or other methods
    //         client.collection('register').getFullList().then((response) => {
    //             console.log(response);
    //             setClientRegister(response);
    //         }).catch((error) => {
    //             console.log(error);
    //         });
    //     };

    //     fetchData();
    // }, []);
    return (
        <div>
            <ReWardsReport />
            <RegistBar />
            <FacultyBar />
            <ProgramBar />
        </div>
    )
}

export default Graph