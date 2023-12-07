import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Navbar = ({ userName }) => {

    // useEffect(() => {
    //     const expires = new Date();
    //     expires.setMinutes(expires.getMinutes() + 1);
    //     const fullname = document.cookie.split(';').find(cookie => cookie.includes('fullname'));
    //     if (fullname) {
    //         setUserName(fullname.split('=')[1]);
    //     } else {
    //         setUserName('เข้าสู่ระบบ');
    //     }
    // }
    //     , []);

    return (
        <div className='container d-flex justify-content-between p-3 navbar sticky-top rounded' id="nav-menu">
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

                    <button className=' nav-button'>
                        {/* {userName} */}
                        {userName ? userName : เข้าสู่ระบบ}

                    </button>
                </Link>

            </div>

            {userName !== "เข้าสู่ระบบ" &&
                <div className='d-flex align-items-center'>
                    <Link to="/logout">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ color: 'red', height: '30px' }} />
                    </Link>
                </div>
            }
        </div>
    )
}

export default Navbar