import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { client } from '../lib/pocketbase';


const Calendar = () => {
    const [calendar, setCalendar] = useState([]);



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

    }
        , []);


    return (
        <div className='container p-3 rounded' id="calendar">
            <h1 className="text-center">ปฏิทินกิจกรรม</h1>
            <div className="row">
                {calendar.map((date, index) => (
                    <div className="col text-center" key={index}>


                        <div className="col text-center bg-light rounded shadow py-2">
                            <Link to={`/activity/${date.day}`}>
                                <h5 className={date.active ? 'active' : null}>{date.day}</h5>
                                {/* <p>{date.active ? 'active' : 'not active'}</p> */}
                                <p className={date.active ? 'active' : null}>{date.month}</p>
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