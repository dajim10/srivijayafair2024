import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { client } from '../lib/pocketbase'


const Navbar = ({ userName }) => {
    const [userScore, setUserScore] = useState(0);
    const phone = sessionStorage.getItem('phone');

    useEffect(() => {
        setInterval(async () => {
            setUserScore(sessionStorage.getItem('score'));

            try {
                const existingRecord = await client.collection('register').getFirstListItem(`phone="${phone}"`);

                if (existingRecord) {
                    console.log(existingRecord);

                    setUserScore(existingRecord.score);
                    sessionStorage.setItem('score', existingRecord.score);
                    // setIsLogin(true);
                } else {
                    console.log('No existing record found. Proceeding to createMember...');
                }

            }
            catch (err) {
                if (err.statusCode === 404) {
                    // Handle the case where the document is not found
                    console.log('Document not found. Proceeding to createMember...');
                } else {
                    // createMember(); // Proceed to create the member even if the document is not found
                    console.error('Error:', err);
                }
            }
        }
            , 1000);

    }
        , [])


    return (
        <div className='container d-flex justify-content-around  p-3 navbar sticky-top rounded' id="nav-menu">
            <div className=''>
                <Link to="/">
                    <FontAwesomeIcon icon={faHouse} className='font-awesome' />
                </Link>

            </div>

            <div className=''>
                <Link to="/register">
                    <button className={`nav-button ${userName !== 'เข้าสู่ระบบ' && 'invisible'}`}>ลงทะเบียน</button>
                </Link>

            </div>


            <div className=''>
                <Link to="/login" className='nav-button link-without-underline '>


                    {/* {userName} */}
                    {userName ? userName.split(' ')[0] : เข้าสู่ระบบ}



                </Link>
                <button className={` nav-button ${userName === 'เข้าสู่ระบบ' && 'invisible'}`}>
                    {userScore} คะแนน
                </button>

            </div>

            {/* {userName !== "เข้าสู่ระบบ" && */}

            {/* <> */}
            <div className={`  ${userName === 'เข้าสู่ระบบ' && 'invisible'}`}>
                <Link to="/logout">
                    <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ color: 'red' }} className='font-awesome' />
                </Link>
            </div>

            {/* </> */}

            {/* } */}
        </div>
    )
}

export default Navbar