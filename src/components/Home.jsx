import React, { useState, useEffect } from 'react'
import Cartoon from '../assets/cartoon.png'
import SongkhlaFaculty from '../assets/SongkhlaFaculty.png'
import TrangFaculty from '../assets/trangFaculty.png'
import NakornFaculty from '../assets/nakornFaculty.png'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


const Home = () => {

    const navigate = useNavigate();

    const handleNavigate = () => {
        const facultyname = 'songkhla'
        navigate(`/allfaculty/${facultyname}`);
    }

    const [calendar, setCalendar] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/api/calendar')
            .then(res => {
                setCalendar(res.data.day)
                console.log(res.data.day)
            })
            .catch(err => {
                console.log(err);
            });
    }
        , []);

    return (
        <>
            <div className="row">
                {/* youtube window */}
                <div className="col col-lg text-center">
                    <div className="embed-responsive embed-responsive-16by9">
                        {/* how to make ifrme responsive */}
                        <div onClick={handleNavigate} >
                            <span>มทร.ศรีวิชัย</span>
                            <h3>สงขลา</h3>
                        </div>
                        <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/QmpIu83Q02c?si=6AGFhTfe8df6MYrY" width={800} height={400}></iframe>
                    </div>
                </div>

            </div>
            <div className="container text-center" style={{ position: 'relative', marginTop: '-50px' }} id="cartoon-div">
                <img src={Cartoon} alt="cartoon" className='img-fluid' />
            </div>

            <div className="container">
                <div className="card rounded shadow" >
                    <div className="card-body">
                        <h4 className='text-center text-green'>ปฏิทินกิจกรรม</h4>
                        <hr />
                        <div className="row" id="calendar">
                            {calendar.map((day, index) => {
                                return (
                                    <div className="col text-center" key={index}>
                                        <h1 className={day.active ? 'active' : null}>{day}</h1>
                                        <h4 className={day.active ? 'text-green' : 'text-secondary'} style={{ position: 'relative', top: '-25px' }}>มค</h4>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>



            <div className="container-fluid">
                <div className="row">
                    <div className="col text-center">
                        <Link to="/allfaculty/songkhla">
                            <img src={SongkhlaFaculty} alt="songkhla" className='img-fluid' width={600} />
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Link to="/allfaculty/trang">
                            <img src={TrangFaculty} alt="trang" className='img-fluid' width={600} />
                        </Link>
                    </div>
                    <div className="col">
                        <Link to="/allfaculty/nakorn">
                            <img src={NakornFaculty} alt="nakorn" className='img-fluid' width={600} />
                        </Link>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Home