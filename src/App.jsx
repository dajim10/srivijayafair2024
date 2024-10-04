import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import StarDown from './StarDown'
import Login from './components/Login'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Register from './components/Register'
import Songkhla from './pages/Songkhla'
import Trang from './pages/Trang'
// นำเข้าคณะต่าง ๆ เพื่อสร้าง Link ไปยังหน้าคณะ
import Architecture from './pages/Architecture' // คณะสถาปัตยกรรม
import { usePageVisibility } from 'react-page-visibility';
import Inded from './pages/Inded'
import AllFaculty from './components/AllFaculty'
import { client } from './lib/pocketbase'
import Activity from './components/Activity'
import Logo from './assets/Logo500.png'
import Program from './pages/Program'
import GiftBox from './assets/giftBox.png'

import SlotMachine from './components/SlotMachine'
import Game from './components/Game'
import Logout from './components/Logout'
import Rewards from './components/Rewards'
import { getCounter } from './lib/getCounter'
import Songkhla360 from './pages/Songkhla360'
import Trang360 from './pages/Trang360'
import Nakorn360 from './pages/Nakorn360'
import Admin from './components/Admin'
import Vr360 from './components/Vr360'
import UpdateAddressReward from './components/UpdateAddressReward'
import Gauge from './components/Gauge'
import SurveyForm from './components/SurveyForm'
import SpecialDown from './SpecialDown'
import { Modal } from 'react-bootstrap'
// import Realtime from './components/Realtime'
// import { myCounter } from './lib/mainCounter'
import Graph from './components/Graph'
import UserRewards from './components/UserRewards'
import UserSurvey from './components/UserSurvey'
import ReWardsReport from './components/ReWardsReport'
import UserRewardsByType from './components/UserRewardsByType'
import UserProgram from './components/UserProgram'





const App = () => {

    const [isGamePaused, setIsGamePaused] = useState(null);
    const [isSpecialPaused, setIsSpecialPaused] = useState(null);
    const [counter, setCounter] = useState(0);
    const [score, setScore] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    // ตรวจสอบว่าเกมหยุดหรือไม่
    const [userName, setUserName] = useState(sessionStorage.getItem('fullname') || 'เข้าสู่ระบบ');
    // ตรวจสอบ user ว่าเข้าสู่ระบบหรือไม่ ถ้าเข้าสู่ระบบแล้วให้แสดงชื่อ user แทนที่จะแสดงเป็น เข้าสู่ระบบ
    const [isLogin, setIsLogin] = useState(false);

    // async function countDown() {
    //     var countDownDate = new Date("Jan 14, 2024 23:59:00").getTime();

    //     // Update the count down every 1 second
    //     var x = setInterval(function () {

    //         // Get today's date and time
    //         var now = new Date().getTime();

    //         // Find the distance between now and the count down date
    //         var distance = countDownDate - now;

    //         // Time calculations for days, hours, minutes and seconds
    //         var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //         var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //         var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //         var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    //         if (days <= 9) {
    //             var dayCount = '0' + days
    //             //   document.getElementById("demo").innerHTML = "0"+days + " " + hours + " "
    //             //   + minutes + "m " + seconds + "s ";
    //         } else {
    //             dayCount = days
    //         }

    //         if (hours < 9) {
    //             var hoursCount = '0' + hours
    //         } else {
    //             var hoursCount = hours
    //         }

    //         if (minutes < 9) {
    //             var minutesCount = '0' + minutes
    //         } else {
    //             var minutesCount = minutes
    //         }

    //         if (seconds < 9) {
    //             var secondCount = '0' + seconds
    //         } else {
    //             var secondCount = seconds
    //         }



    //         document.getElementById('countDown').innerHTML = `<button class="btn" id="btn" name="btn"><span style="font-size:30px;">${dayCount}</span> <span style="font-size:16px;">DAYS</span> </button> <button class="btn"><span style="font-size:30px;">${hoursCount}</span> <span style="font-size:16px;">HRS</span></button> <button class="btn"><span style="font-size:30px;">${minutesCount}</span> <span style="font-size:16px;">MINS</span></button> <button class="btn"> <span style="font-size:30px;">${secondCount}</span> <span style="font-size:16px;">SECS</span></button>`

    //         if (distance < 0) {
    //             clearInterval(x);
    //             client.collection('openweb').update(1, { isOpen: true }).then(res => {
    //                 setIsOpen(true);
    //             }).catch(err => {
    //                 console.log(err);
    //             }
    //             );

    //         }
    //     }, 1000);

    //     return (
    //         <>
    //             <p className='text-center text-light bg-danger p-2 rounded-pill shadow-lg' id='countDown'>


    //             </p>
    //         </>
    //     )
    // }



    // useEffect(() => {
    //     setInterval(() => {
    //         countDown();
    //     }
    //         , 1000);
    // }
    //     , []);


    // useEffect(() => {

    //     // create function countdown to srivijaya fair 2024





    //     async function openWeb() {
    //         // let res = await fetch("https://api.rmutsv.ac.th/counter/srivijayafair");
    //         // let count = await res.json();

    //         // setIsOpen(true);
    //         await client.collection('openweb').getList(1)
    //             .then(res => {
    //                 setIsOpen(res.items[0].isOpen);
    //                 // console.log(res.items[0].isOpen);
    //                 // const mainContent = document.getElementById('mainContent');

    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             }); // ตรวจสอบว่าเว็บเปิดอยู่หรือไม่



    //     }
    //     openWeb();
    // }, []);





    useEffect(() => {
        if (userName !== 'เข้าสู่ระบบ') {
            setUserName(sessionStorage.getItem('fullname'));
            setIsLogin(true);
        }

        // const pageCounter = getCounter('srivijayafair').then(res => {
        //     setCounter(res);
        // }
        // );

        // fetch("https://api.rmutsv.ac.th/counter/counter1");
        // let count = await res.json();
        // document.getElementById("counter").innerHTML = count.counter;
        const pageCounter = async () => {
            const res = await fetch(`https://api.rmutsv.ac.th/counter/srivijayafair`);
            const data = await res.json();
            setCounter(data.counter);
        }

    }, [])




    // useEffect(() => {

    //     async function counterStart() {
    //         let res = await fetch("https://api.rmutsv.ac.th/counter/srivijayafair");
    //         let count = await res.json();
    //         setCounter(count.counter);
    //     }

    //     async function counterGet() {
    //         let res = await fetch("https://api.rmutsv.ac.th/counter/srivijayafair/get");
    //         let count = await res.json();

    //         setCounter(count.counter);
    //     }
    //     // check cookie ars if have cookie not count up
    //     if (document.cookie.indexOf('srivijayafair') >= 0) {
    //         // console.log('have cookie');
    //         counterGet();
    //     } else {
    //         // console.log('not have cookie');
    //         // set cookie timeout
    //         let d = new Date();
    //         d.setTime(d.getTime() + (5 * 60 * 1000));
    //         let expires = "expires=" + d.toUTCString();
    //         document.cookie = `srivijayafair=1;${expires};path=/`;
    //         counterStart();
    //     }
    // }
    //     , []);

    // useEffect(() => {
    //     const testCounter = getCounter('srivijayafair');
    //     console.log(testCounter)
    //     // setCounter(counter);

    // }, []);

    useEffect(() => {
        client.collection('statusgame').getList(1)
            .then(res => {
                // setIsGamePaused(res.data.isGamePaused);
                setIsGamePaused(res.items[0].isGamePaused);
                // console.log(res.items[0].isGamePaused);
                // const mainContent = document.getElementById('mainContent');

            })
            .catch(err => {
                console.log(err);
            });

    }, []);


    useEffect(() => {
        setInterval(() => {
            client.collection('statusgame').getList(1)
                .then(res => {
                    // setIsGamePaused(res.data.isGamePaused);
                    setIsGamePaused(res.items[0].isGamePaused);
                    setIsSpecialPaused(res.items[0].isSpecialPaused);
                    // console.log(res.items[0].isGamePaused);
                    // const mainContent = document.getElementById('mainContent');

                })
                .catch(err => {
                    console.log(err);
                });

            // query from pocketbase and get score from collection with phone number user in collection register






        }, 5000);
    }
        , [isGamePaused, isSpecialPaused, usePageVisibility]);
    // , [isGamePaused, isSpecialPaused]);






    return (
        <div className='container-fluid' id="mainContent" >
            {!isGamePaused && isLogin ?
                <StarDown />

                : null
                // ถ้า game หยุด ให้แสดงข้อความว่า เกมหยุด ใช้สำหรับเวลาที่เรากดหยุดเกมเพื่อทดสอบ
                // <div className='d-flex justify-content-center mt-3 col-lg-6 mx-auto' >
                // <div style={{ position: 'absolute', top: '0', zIndex: '9999' }}>

                //     <p className='bg-danger text-light p-2 mt-2 rounded-pill shadow-lg'>{"<"}Game Pause {"/>"}</p>
                // </div>
            }
            {!isSpecialPaused && isLogin ?
                <SpecialDown />
                : null
            }

            <Navbar userName={userName} />


            <div className="row">
                <div className="col text-center mx-auto mt-3">
                    <img src={Logo} alt="" className='img-fluid' id="mainLogo" />


                </div>

            </div>
            <div className="row">
                <div className=" mx-auto ">
                    {isLogin &&
                        <div className='text-center mb-3'>



                            <Link to='/rewards' className="button-85 " style={{ textDecoration: 'none' }}>ร่วมกิจกรรมรับของรางวัล
                                {/* <img src={GiftBox} alt="" width={100} height={100} /> */}
                            </Link>






                        </div>
                    }
                </div>
            </div>


            <Routes>
                <Route path='/' element={<Home counter={counter} />} />
                <Route path='/login' element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path='/about' element={<About />} />
                <Route path="/songkhla" element={<Songkhla />} />
                <Route path="/architecture" element={<Architecture />} />
                <Route path="/trang" element={<Trang />} />
                <Route path="/inded" element={<Inded />} />
                <Route to="/allfaculty">
                    <Route path="/allfaculty/songkhla" element={<AllFaculty faculty='songkhla' />} />
                    <Route path="/allfaculty/trang" element={<AllFaculty faculty='trang' />} />
                    <Route path="/allfaculty/nakorn" element={<AllFaculty faculty='nakorn' />} />
                </Route>
                <Route path="/activity/:day" element={<Activity />} />

                <Route path="/slotmachine" element={<SlotMachine />} />
                <Route path="/game" element={<Game />} />X
                <Route path="/logout" element={<Logout />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/songkhla360" element={<Songkhla360 />} />
                <Route path="/trang360" element={<Trang360 />} />
                <Route path="/nakorn360" element={<Nakorn360 />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/vr360/:faculty" element={<Vr360 />} />
                <Route path="/program" element={<Program />} />
                <Route path="/updateaddressreward" element={<UpdateAddressReward />} />
                <Route path="/survey" element={<SurveyForm />} />
                <Route path="/graph" element={<Graph />} />
                <Route path="/userrewards" element={<UserRewards />} />
                <Route path="/usersurvey" element={<UserSurvey />} />
                <Route path="/rewardsreport" element={<ReWardsReport />} />
                <Route path="/userrewardsbytype" element={<UserRewardsByType />} />
                <Route path="/userprogram" element={<UserProgram />} />
                {/* <Route path="/realtime" element={<Realtime />} /> */}

            </Routes>
            {/* <Modal show={!isOpen} centered style={{ backdropFilter: 'blur(5px)' }}>
                <Modal.Body>
                    <div className="row">
                        <div className="col text-center">
                            <h1 className='text-danger'>นับถอยหลัง</h1>
                            <div id="countDown"></div>
                            <h3 className='text-danger'>เริ่มเวลา 15-19 มกราคม 2564</h3>
                        </div>
                    </div>
                </Modal.Body>
            </Modal> */}

            <footer className='fixed mt-3 bg-light rounded-pill shadow d-flex flex-column'>
                {/* <div className="row"> */}
                <div className="col text-center align-items-center">
                    <p className='text-dark'>© 2024 Srivijaya Fair  15-19 January 2024</p>
                    {/* </div> */}
                </div>
            </footer>
        </div>
    )
}

export default App