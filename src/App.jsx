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

import SlotMachine from './components/SlotMachine'
import Game from './components/Game'
import Logout from './components/Logout'
import Rewards from './components/Rewards'





const App = () => {

    const [isGamePaused, setIsGamePaused] = useState(null);
    // ตรวจสอบว่าเกมหยุดหรือไม่
    const [userName, setUserName] = useState(sessionStorage.getItem('fullname') || 'เข้าสู่ระบบ');
    // ตรวจสอบ user ว่าเข้าสู่ระบบหรือไม่ ถ้าเข้าสู่ระบบแล้วให้แสดงชื่อ user แทนที่จะแสดงเป็น เข้าสู่ระบบ
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (userName !== 'เข้าสู่ระบบ') {
            setUserName(sessionStorage.getItem('fullname'));
            setIsLogin(true);
        }
    }, [])


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
        }, 5000);
    }
        , [isGamePaused, usePageVisibility]);






    return (
        <div className='container-fluid' id="mainContent" >
            {!isGamePaused ?
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
                <div className="col col-lg-3 mx-auto">
                    <img src={Logo} alt="" className='img-fluid' />

                    {isLogin &&
                        <div className='text-center mb-4'>
                            <Link to='/rewards' className="button-85 mb-3">ร่วมสนุกสุ่มของรางวัล</Link>
                        </div>
                    }
                </div>
            </div>


            <Routes>
                <Route path='/' element={<Home />} />
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
            </Routes>


        </div>
    )
}

export default App