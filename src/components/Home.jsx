import React, { useState, useEffect } from 'react'
import Cartoon from '../assets/cartoon.png'
import SongkhlaFaculty from '../assets/songkhlaIsland.png'
import TrangFaculty from '../assets/trangIsland.png'
import NakornFaculty from '../assets/nakorn_island.png'
import starCute from '../assets/starCute.png'
import LogoLive from '../assets/logolive.png'

import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faEye, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Calendar from './Calendar'
import { client } from '../lib/pocketbase'
import BgIsland from '../assets/bgIsland.png'
import AllFaculty from './AllFaculty'
import GifImage from '../assets/12.gif'
import Check from '../assets/check.png'
import { Modal } from 'react-bootstrap'
import calendar from '../assets/calendar.png'





const Home = ({ counter }) => {

    const navigate = useNavigate();
    const [IsCloseWindow, setIsCloseWindow] = useState(false)
    const [linkUrl, setLinkUrl] = useState('')
    const [showModal, setShowModal] = useState(false)

    /// create drag and drop


    const handleDragStart = (e) => {
        const target = e.target;
        e.dataTransfer.setData('text/plain', target.id);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        const draggedElement = document.getElementById(data);

        // Update the position of the dragged element
        draggedElement.style.left = `${e.clientX - draggedElement.width / 2}px`;
        draggedElement.style.top = `${e.clientY - draggedElement.height / 2}px`;
    };

    ////



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

    const handleShowModal = () => {
        setShowModal(!showModal)
    }


    useEffect(() => {
        // setInterval(async () => {
        client.collection('live').getList(1)
            .then(res => {
                setLinkUrl(res.items[0].linkUrl);
            })
            .catch(err => {
                console.log(err);
            });
        // }, 1000);
    }
        , [linkUrl]);




    return (
        <div className='container'>
            <div className="row">
                {/* youtube window */}
                <div className="col col-lg text-center">
                    <div className="embed-responsive embed-responsive-16by9">
                        {/* how to make ifrme responsive */}

                        {/* <div className="bg-primary" style={{ position: 'absolute', left: '200px', top: '200px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '20px', padding: '10px', boxShadow: '0 0 5px #ccc', cursor: 'pointer' }}>
                            <FontAwesomeIcon icon={faCalendarDays} className='text-light' />
                            <p className='text-light'>ปฏิทินกิจกรรม</p>
                        </div> */}

                        <div className='container d-flex justify-content-between' style={{ marginTop: '-50px' }}>
                            <img src={LogoLive} alt="logo live" height={20} className='mt-3' />
                            <img src={starCute} alt="star cute" width={50} />
                        </div>

                        {!IsCloseWindow &&
                            // <iframe className="embed-responsive-item sticky-top" src="https://www.youtube.com/embed/QmpIu83Q02c?si=6AGFhTfe8df6MYrY" width={800} height={400} allow="accelerometer;autoplay;"></iframe>
                            <>

                                {/* <iframe className="embed-responsive-item " src={`${linkUrl}&autoplay=1&mute=1`} allow="autoplay;fullscreen; encrypted-media" id="main-live"></iframe> */}
                                <iframe src={`${linkUrl}&autoplay=1&mute=1`} allow="fullscreen" id="main-live"></iframe>
                                {/* <iframe src="https://www5.cbox.ws/box/?boxid=948718&boxtag=4HHBBC" width="80%" height="250" allowtransparency="yes" allow="autoplay" frameBorder="0" marginHeight="0" marginWidth="0" scrolling="auto" ></iframe> */}
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

            {/* <div className="container text-center" style={{ position: 'relative', marginTop: '-50px', display: 'flex' }} id="cartoon-div"> */}
            {/* <img src={Cartoon} alt="cartoon" className='img-fluid' /> */}
            <div className="container text-center" style={{ position: 'relative', marginTop: '-20px' }}>


                <div className="row mt-3">
                    <div className="col">
                        <img src={GifImage} alt="" className='img-fluid' />
                    </div>
                </div>







            </div>
            {/* </div> */}


            <Calendar />
            {/* <div className='container-fluid fixed-bottom'>
                <div className="row">
                    <div className="col mx-auto" style={{ margin: '0', padding: '0' }}>

                        <AllFaculty />
                    </div>

                </div>

            </div> */}
            {/* {!IsCloseWindow && */}
            <div className="container-fluid "    >


                {/* <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 text-center  mx-auto">
                        <Link to="/allfaculty/songkhla">
                            <img src={SongkhlaFaculty} alt="songkhla" className='img-fluid' width={400} />
                        </Link>
                    </div>
                </div> */}

                <div className="row mt-3">



                    <div className="col">
                        <div className="row">
                            <div className="col  mx-auto">
                                <Link to="/allfaculty/songkhla">
                                    <img src={SongkhlaFaculty} alt="songkhla" className='img-fluid' width={400} />
                                </Link>
                            </div>
                            <div className="col text-center">
                                <Link to="/allfaculty/trang">
                                    <img src={TrangFaculty} alt="trang" className='img-fluid' width={400} />
                                </Link>
                            </div>

                            <div className="col text-center">
                                <Link to="/allfaculty/nakorn">
                                    <img src={NakornFaculty} alt="nakorn" className='img-fluid' width={400} />
                                </Link>
                            </div>
                        </div>
                    </div>





                </div>

            </div>
            {/* } */}

            <div className="d-flex justify-content-center align-items-center text-center">

                {/* <Link to="/gauge">
                    
                    
                    <img src={Check} alt="" id="check" />
                </Link> */}
                <Link to="/survey">
                    <img
                        src={Check}
                        alt=""
                        id="check"
                    // draggable="true"
                    // onDragStart={(e) => handleDragStart(e)}
                    // onDragOver={(e) => handleDragOver(e)}
                    // onDrop={(e) => handleDrop(e)}
                    // style={{ position: 'absolute', cursor: 'move' }}
                    />
                </Link>
                <a href="#calendar">
                    <img src={calendar} alt="calendar" id="calendar2" />
                </a>


                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Body>
                        <div className="row">
                            <div className="col text-center">
                                <form className="form-group">
                                    <h4>ประเมินความถึงพอใจ</h4>
                                    <small className='text-muted'>ระดับความพึงพอใจ 5 = มากที่สุด 4 = มาก 3 = ปานกลาง 2 = น้อย <br />และ 1 = น้อยที่สุด</small>


                                    <button className='btn-green mt-3 rounded-pill'>ตกลง</button>
                                </form>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>


                {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, et.</p> */}
                {/* <FontAwesomeIcon icon={faEye} className='text-dark p-2' />{"  "}{counter} */}
            </div>
        </div>
    )
}

export default Home