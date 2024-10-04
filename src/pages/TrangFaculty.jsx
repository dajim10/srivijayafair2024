import React, { useState, useEffect } from 'react'
import { client } from '../lib/pocketbase'
import { getScore, myCounter } from '../lib/getCounter';
import Slide from './Slide';



const SongkhlaFaculty = () => {
    const campusId = '02';
    const [facultyData, setFacultyData] = useState([]);



    useEffect(() => {
        // getScore();
        myCounter('Visit:Trang Faculty')
        async function fetchData() {
            // You can await here
            const response = await client.collection('faculty').getList(1, 100, { expand: "campus,program" });
            // ... how to expand more field
            // const response = await client.collection('faculty').getList(1, 100, { expand: "campus, program" });

            response.items.forEach(item => {
                if (item.expand.campus.campusID === campusId) {
                    // console.log(item.expand.campus.campusID)
                    facultyData.push(item);
                    // setFacultyData(prevState => [...prevState, item]);
                }
                // console.log(facultyData)

            }
            );
            // ...
        }
        fetchData();
    }, [campusId]); // Or [] if effect doesn't need props or state



    return (
        <>
            <Slide facultyData={facultyData} key={facultyData.id} />

        </>

    )
}

export default SongkhlaFaculty