import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { client } from '../lib/pocketbase';


const Calendar = () => {
    const [calendar, setCalendar] = useState([]);



    useEffect(() => {
        client.collection('calendar').getList(1, 100)
            .then(res => {
                // console.log(res.items)
                setCalendar(res.items);
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
        <div className='container-fluid  rounded-4' id="calendar">
            <h1 className="text-center">ปฏิทินกิจกรรม</h1>
            <hr />
            <div className="row">
                {calendar.map((date, index) => (
                    <div className="col text-center align-items-center" key={index}>


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
    )
}

export default Calendar