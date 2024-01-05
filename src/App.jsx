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





const App = () => {

    const [isGamePaused, setIsGamePaused] = useState(null);
    const [counter, setCounter] = useState(0);
    const [score, setScore] = useState(0);
    // ตรวจสอบว่าเกมหยุดหรือไม่
    const [userName, setUserName] = useState(sessionStorage.getItem('fullname') || 'เข้าสู่ระบบ');
    // ตรวจสอบ user ว่าเข้าสู่ระบบหรือไม่ ถ้าเข้าสู่ระบบแล้วให้แสดงชื่อ user แทนที่จะแสดงเป็น เข้าสู่ระบบ
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (userName !== 'เข้าสู่ระบบ') {
            setUserName(sessionStorage.getItem('fullname'));
            setIsLogin(true);
        }
        const pageCounter = getCounter('srivijayafair').then(res => {
            setCounter(res);
        }
        );

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
                    // console.log(res.items[0].isGamePaused);
                    // const mainContent = document.getElementById('mainContent');

                })
                .catch(err => {
                    console.log(err);
                });

            // query from pocketbase and get score from collection with phone number user in collection register






        }, 5000);
    }
        , [isGamePaused, usePageVisibility]);






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
            <Navbar userName={userName} />


            <div className="row">
                <div className="col text-center mx-auto mt-5">
                    <img src={Logo} alt="" className='img-fluid' id="mainLogo" />


                </div>

            </div>
            <div className="row">
                <div className="col mx-auto">
                    {isLogin &&
                        <div className='text-center mb-4'>
                            <Link to='/rewards' className="button-85 mb-3 " style={{ textDecoration: 'none' }}>ร่วมสนุกสุ่มของรางวัล </Link>
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
                    <Route path="/allfaculty/trang" element={<AllFaculty faculty={'trang'} />} />
                    <Route path="/allfaculty/nakorn" element={<AllFaculty faculty={'nakorn'} />} />
                </Route>
                <Route path="/activity/:day" element={<Activity />} />

                <Route path="/slotmachine" element={<SlotMachine />} />
                <Route path="/game" element={<Game />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/songkhla360" element={<Songkhla360 />} />
                <Route path="/trang360" element={<Trang360 />} />
                <Route path="/nakorn360" element={<Nakorn360 />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/vr360/:faculty" element={<Vr360 />} />
                <Route path="/program" element={<Program />} />
                <Route path="/updateaddressreward" element={<UpdateAddressReward />} />
                <Route path="/gauge" element={<Gauge />} />

            </Routes>


        </div>
    )
}

export default App