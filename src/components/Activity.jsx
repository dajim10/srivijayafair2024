import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { client } from '../lib/pocketbase';




const Activiry = () => {
    const [calendar, setCalendar] = useState([]);
    const [activity, setActivity] = useState([]);
    const { day } = useParams();

    const navigate = useNavigate();


    const [activityDate, setActivityDate] = useState(day);

    const handleNavigate = (e) => {

        navigate(`/activity/${e}`);
        setActivityDate(day);
    }



    useEffect(() => {
        client.collection('calendar').getList(1, 100)
            .then(res => {
                console.log(res.items)
                setCalendar(res.items);
                // console.log(res.items)
                // setActivityDate(res.items[0].activityDate);
                // console.log(res.items[0].activityDate);
                // const mainContent = document.getElementById('mainContent');

            })
            .catch(err => {
                console.log(err);
            });
        client.collection('register').getList(1, 100)
            .then(res => {
                console.log('register', res.items[0].phone);
            })
            .catch(err => {
                console.log(err);
            });
    }
        , []);

    const getActivity = () => {
        client.collection(day).getList(1, 100)
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

    useEffect(() => {

        getActivity(day);

    }
        , [day]);

    return (
        <div>
            {/* calendar */}
            <div className='container p-3 rounded ' id="calendar">
                <h1 className="text-center">ปฏิทินกิจกรรม</h1>
                <div className="row">
                    {calendar.map((date, index) => (
                        <div className="col text-center" key={index}>


                            <div className="col p-2 shadow my-2 rounded bg-light text-center" >
                                <Link to={`/activity/${date.day}`} className='link-without-underline'>
                                    <h2 className={date.active ? 'active' : null} style={{ fontWeight: '700' }}>{date.day}</h2>
                                    {/* <p>{date.active ? 'active' : 'not active'}</p> */}
                                    <span className={date.active ? 'active' : null}>{date.month}</span>
                                </Link>
                            </div>

                        </div>
                    ))
                    }

                </div>

                {/* {activityDate.map((date, index) => (
                <div className="row" key={index}>
                    <div className="col text-center">
                        <h1 className={date.active ? 'active' : null}>{date.day}</h1>
                        <p>{date.month}</p>
                    </div>
                </div>
            ))
            } */}
            </div>

            {/* end calendar */}
            <div className="container p-3 rounded" id="activity">
                <h1 className="text-center">กิจกรรมวันที่ {day}</h1>
                <div className="row">
                    <div className="col text-center" >
                        {activity.map((activity, index) => (

                            <div className="card m-2 p-2 " key={index}>
                                <h5 className={activity.active ? 'active' : null}>{activity.event}</h5>
                                <p>{activity.time}</p>

                            </div>

                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Activiry