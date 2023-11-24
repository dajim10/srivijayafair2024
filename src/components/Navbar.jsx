import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='container d-flex justify-content-between p-3 navbar sticky-top'>
            <div className='d-flex align-items-center'>
                <Link to="/">

                    <FontAwesomeIcon icon={faHouse} style={{ height: 30 }} />
                </Link>

            </div>
            <div className='d-flex align-items-center'>
                <button className=' nav-button'>ลงทะเบียน</button>

            </div>
            <div className='d-flex align-items-center'>
                <button className=' nav-button'>เข้าสู่ระบบ</button>

            </div>
        </div>
    )
}

export default Navbar