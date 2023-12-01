import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { client } from '../lib/pocketbase';



const Activiry = () => {
    const [activity, setActivity] = useState([]);
    const { day } = useParams();


    const [activityDate, setActivityDate] = useState(day);

    useEffect(() => {

        client.collection('activity').getOne(day)
            .then(res => {
                console.log(res.items)
                setActivity(res.items);
                // console.log(res.items)
                // setActivityDate(res.items[0].activityDate);
                // console.log(res.items[0].activityDate);
                // const mainContent = document.getElementById('mainContent');

            })
            .catch(err => {
                console.log(err);
            });

    }
        , []);

    return (
        <div>{activity ? { activityDate } : null}</div>
    )
}

export default Activiry