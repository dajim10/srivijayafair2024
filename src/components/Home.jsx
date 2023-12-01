import React, { useState, useEffect } from 'react'
import Cartoon from '../assets/cartoon.png'
import SongkhlaFaculty from '../assets/SongkhlaFaculty.png'
import TrangFaculty from '../assets/trangFaculty.png'
import NakornFaculty from '../assets/nakornFaculty.png'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Calendar from './Calendar'



const Home = () => {

    const navigate = useNavigate();
    const [IsCloseWindow, setIsCloseWindow] = useState(false)

    const handleNavigate = () => {
        const facultyname = 'songkhla'
        navigate(`/allfaculty/${facultyname}`);
    }

    const handleCloseWindow = () => {
        setIsCloseWindow(!IsCloseWindow)
    }



    return (
        <>
            <div className="row">
                {/* youtube window */}
                <div className="col col-lg text-center">
                    <div className="embed-responsive embed-responsive-16by9">
                        {/* how to make ifrme responsive */}
                        <div onClick={handleNavigate} >
                            <span>@มทร.ศรีวิชัย สงขลา</span>
                        </div>

                        <div className='container text-end w-50 sticky-top'>

                            <button className={`btn my-2 ${IsCloseWindow ? "btn-dark" : "btn-danger"}`} onClick={handleCloseWindow}>
                                {IsCloseWindow ? <FontAwesomeIcon icon={faBars} /> : <FontAwesomeIcon icon={faTimes} />}
                                {/* {IsCloseWindow ? 'เปิด' : 'ปิด'} */}
                            </button>

                        </div>

                        {/* {IsCloseWindow ? null : <iframe className="embed-responsive-item sticky-top" src="https://www.youtube.com/embed/QmpIu83Q02c?si=6AGFhTfe8df6MYrY" width={800} height={400} allow="accelerometer;autoplay;"></iframe>} */}

                        {!IsCloseWindow &&
                            <iframe className="embed-responsive-item sticky-top" src="https://www.youtube.com/embed/QmpIu83Q02c?si=6AGFhTfe8df6MYrY" width={800} height={400} allow="accelerometer;autoplay;"></iframe>
                        }
                    </div>
                </div>

            </div >

            <div className="container text-center" style={{ position: 'relative', marginTop: '-50px' }} id="cartoon-div">
                <img src={Cartoon} alt="cartoon" className='img-fluid' />
            </div>


            {/* <div className="container">
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
            </div> */}


            {!IsCloseWindow &&
                <div className="container-fluid sticky-top">
                    <Calendar />

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
            }
        </>
    )
}

export default Home