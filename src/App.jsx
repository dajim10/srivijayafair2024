import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import StarDown from './StarDown'
import Login from './components/Login'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
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




const App = () => {

    const [isGamePaused, setIsGamePaused] = useState(null);

    // ตรวจสอบว่าเกมหยุดหรือไม่



    // useEffect(() => {
    //     setInterval(() => {
    //         axios.get('http://localhost:3000/api/statusgame')
    //             .then(res => {
    //                 setIsGamePaused(res.data.isGamePaused);
    //                 // console.log(res.data.isGamePaused)
    //                 const mainContent = document.getElementById('mainContent');

    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             });
    //     }
    //         , 1000);

    // }, []);

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
        , [usePageVisibility]);






    return (
        <div className='container-fluid' id="mainContent">
            <div >

                {!isGamePaused ?
                    <StarDown />

                    :
                    // ถ้า game หยุด ให้แสดงข้อความว่า เกมหยุด
                    // <div className='d-flex justify-content-center mt-3 col-lg-6 mx-auto' >
                    <div style={{ left: '0', top: '90vh !important' }}>

                        <button className="btn btn-danger ">Game Pause</button>
                    </div>
                }
            </div>
            <Navbar />


            <div className="row">
                <div className="col col-lg-3 mx-auto">
                    <h1 className='text-center bg-light border-dark rounded shadow-lg'>SRIVIJAYA FAIR</h1>
                    <h2 className='text-center btn-outline-dark '>2024</h2>

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
            </Routes>


        </div>
    )
}

export default App