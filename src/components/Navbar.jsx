import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Navbar = ({ userName }) => {


    // useEffect(() => {
    //     const expires = new Date();
    //     expires.setMinutes(expires.getMinutes() + 1);
    //     const fullname = sessionStorage.getItem('fullname');
    //     if (fullname) {
    //         setUserName(fullname.split(' ')[0]);
    //     } else {
    //         setUserName('เข้าสู่ระบบ');
    //     }
    // }
    //     , []);

    return (
        <div className='container d-flex justify-content-between p-3 navbar sticky-top rounded' id="nav-menu">
            <div className='d-flex align-items-center'>
                <Link to="/">
                    <FontAwesomeIcon icon={faHouse} className='font-awesome' />
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
                        {userName ? userName.split(' ')[0] : เข้าสู่ระบบ}

                    </button>
                </Link>

            </div>

            {userName !== "เข้าสู่ระบบ" &&

                <>
                    <div className='d-flex align-items-center'>
                        <Link to="/logout">
                            <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ color: 'red' }} className='font-awesome' />
                        </Link>
                    </div>

                </>

            }
        </div>
    )
}

export default Navbar