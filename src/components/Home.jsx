import React, { useState, useEffect } from 'react'
import Cartoon from '../assets/cartoon.png'
import SongkhlaFaculty from '../assets/SongkhlaFaculty.png'
import TrangFaculty from '../assets/trangFaculty.png'
import NakornFaculty from '../assets/nakornFaculty.png'
import starCute from '../assets/starCute.png'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faEye } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Calendar from './Calendar'
import { client } from '../lib/pocketbase'
import BgIsland from '../assets/bgIsland.png'





const Home = ({ counter }) => {

    const navigate = useNavigate();
    const [IsCloseWindow, setIsCloseWindow] = useState(false)
    const [linkUrl, setLinkUrl] = useState('')


    const styles = {
        backgroundImage: `url(${BgIsland})`,
        backgroundSize: 'cover', // Adjust as needed
        backgroundPosition: 'center', // Adjust as needed
        width: '100vw',
        height: '500px',
        margin: '0 auto'


        // Add more background-related styles if necessary
    };

    const handleNavigate = () => {
        const facultyname = 'songkhla'
        navigate(`/allfaculty/${facultyname}`);
    }

    const handleCloseWindow = () => {
        setIsCloseWindow(!IsCloseWindow)
    }



    useEffect(() => {
        setInterval(async () => {
            client.collection('live').getList(1)
                .then(res => {
                    setLinkUrl(res.items[0].linkUrl);
                })
                .catch(err => {
                    console.log(err);
                });
        }, 1000);
    }
        , [linkUrl]);




    return (
        <>
            <div className="row">
                {/* youtube window */}
                <div className="col col-lg text-center">
                    <div className="embed-responsive embed-responsive-16by9">
                        {/* how to make ifrme responsive */}


                        <div className='container float-right w-50 sticky-top'>

                            {/* <button className={`btn my-2 ${IsCloseWindow ? "btn-dark" : "btn-danger"}`} onClick={handleCloseWindow}>
                                {IsCloseWindow ? <FontAwesomeIcon icon={faBars} /> : <FontAwesomeIcon icon={faTimes} />}
                            </button> */}
                            {/* {IsCloseWindow ? 'เปิด' : 'ปิด'} */}

                        </div>

                        <div className='container d-flex justify-content-end' style={{ marginTop: '-50px' }}>
                            <img src={starCute} alt="star cute" width={50} />
                        </div>

                        {!IsCloseWindow &&
                            // <iframe className="embed-responsive-item sticky-top" src="https://www.youtube.com/embed/QmpIu83Q02c?si=6AGFhTfe8df6MYrY" width={800} height={400} allow="accelerometer;autoplay;"></iframe>

                            <>
                                <iframe className="embed-responsive-item " src={`${linkUrl}&autoplay=1&mute=1`} allow="autoplay;fullscreen; encrypted-media" id="main-live"></iframe>

                                {/* <iframe width="1440" height="762" src={linkUrl}

                                    frameborder="0" allow="autoplay; encrypted-media"
                                    barColor="black"
                                    controls
                                    allowfullscreen>

                                </iframe> */}




                                {/* <FacebookLiveEmbed /> */}
                            </>

                        }
                    </div>
                </div>

            </div >

            <div className="container text-center" style={{ position: 'relative', marginTop: '-50px' }} id="cartoon-div">
                <img src={Cartoon} alt="cartoon" className='img-fluid' />
            </div>




            <Calendar />
            {/* {!IsCloseWindow && */}
            <div className="container-fluid "    >


                <div className="row">
                    <div className="col text-center">
                        <Link to="/allfaculty/songkhla">
                            <img src={SongkhlaFaculty} alt="songkhla" className='img-fluid' width={600} />
                        </Link>
                    </div>


                </div>

                <div className="row">


                    <div className="col text-center">
                        <Link to="/allfaculty/trang">
                            <img src={TrangFaculty} alt="trang" className='img-fluid' width={600} />
                        </Link>
                    </div>
                    <div className="col text-center">
                        <Link to="/allfaculty/nakorn">
                            <img src={NakornFaculty} alt="nakorn" className='img-fluid' width={600} />
                        </Link>
                    </div>
                </div>

            </div>
            {/* } */}
            <div className="d-flex justify-content-end align-items-center text-center">
                {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, et.</p> */}
                <FontAwesomeIcon icon={faEye} className='text-dark p-2' />{"  "}{counter}
            </div>
        </>
    )
}

export default Home