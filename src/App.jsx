import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import StarDown from './StarDown'
import Login from './components/Login'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Home from './components/Home'
import About from './components/About'
import Songkhla from './pages/Songkhla'
// นำเข้าคณะต่าง ๆ เพื่อสร้าง Link ไปยังหน้าคณะ
import Architecture from './pages/Architecture' // คณะสถาปัตยกรรม
import Inded from './pages/Inded'
const App = () => {

    const [isGamePaused, setIsGamePaused] = useState(null);

    useEffect(() => {
        setInterval(() => {
            axios.get('http://localhost:3000/api/statusgame')
                .then(res => {
                    setIsGamePaused(res.data.isGamePaused);
                    // console.log(res.data.isGamePaused)
                    const mainContent = document.getElementById('mainContent');

                })
                .catch(err => {
                    console.log(err);
                });
        }
            , 1000);

    }, []);



    return (
        <div className='container-fluid' id="mainContent">

            {!isGamePaused ?
                <StarDown />
                : null
            }
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
                <Route path='/about' element={<About />} />
                <Route path="/songkhla" element={<Songkhla />} />
                <Route path="/architecture" element={<Architecture />} />
                <Route path="/inded" element={<Inded />} />
            </Routes>
        </div>
    )
}

export default App