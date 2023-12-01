import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='container d-flex justify-content-between p-3 navbar sticky-top' id="nav-menu">
            <div className='d-flex align-items-center'>
                <Link to="/">
                    <FontAwesomeIcon icon={faHouse} style={{ height: 30 }} />
                </Link>

            </div>
            <div className='d-flex align-items-center'>
                <Link to="/register">
                    <button className=' nav-button'>ลงทะเบียน</button>
                </Link>

            </div>
            <div className='d-flex align-items-center'>
                <Link to="/login">

                    <button className=' nav-button'>เข้าสู่ระบบ</button>
                </Link>

            </div>
        </div>
    )
}

export default Navbar