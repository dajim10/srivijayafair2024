import React, { useState, useEffect } from 'react'
import { client } from '../lib/pocketbase'
import Slide from './Slide';



const SongkhlaFaculty = () => {
    const campusId = '01';
    const [facultyData, setFacultyData] = useState([]);


    useEffect(() => {
        async function fetchData() {
            // You can await here
            const response = await client.collection('faculty').getList(1, 100, { expand: "campus" });

            response.items.forEach(item => {
                if (item.expand.campus.campusID === campusId) {
                    console.log(item.expand.campus.campusID)
                    facultyData.push(item);
                    // setFacultyData(prevState => [...prevState, item]);
                }
                console.log(facultyData)

            }
            );
            // ...
        }
        fetchData();
    }, [campusId]); // Or [] if effect doesn't need props or state


    // useEffect(() => {
    //     // console.log('test')

    //     client.collection('faculty').getList(1, 100, { expand: "campus" })
    //         .then(res => {
    //             console.log(res);
    //             // setFacultyData(res.items);
    //             // setFacultyData(res.data.items.filter(item => item.campusId === campusId));

    //             // console.log(res.items.filter(item => item.campusId === campusId));
    //             const data = res.items;
    //             // console.log(data)
    //             for (let i = 0; i < data.length; i++) {
    //                 // console.log(data[i].expand.campus.campusID);
    //                 // console.log(data[i])
    //                 if (data[i].expand.campus.campusID === campusId) {
    //                     // setFacultyData(data[i].facultyName)
    //                     // setFacultyData(prevState => [...prevState, data[i].facultyName]);
    //                     // setFacultyData(prevState => [...prevState, data[i]]);
    //                     console.log(data[i])
    //                 }
    //                 // setFacultyData(prevState => [...prevState, data[i]]);
    //             }

    //             // console.log(facultyData);

    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }
    //     , [])

    return (
        <div>
            <Slide facultyData={facultyData} />

        </div>

    )
}

export default SongkhlaFaculty