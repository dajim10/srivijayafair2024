import React, { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import { useNavigate, Link } from 'react-router-dom';
const url = import.meta.env.VITE_POCKETBASE_URL;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Calendar from './Calendar';

const pb = new PocketBase(url);

const Login = () => {
    const [phone, setPhone] = useState('');
    const [isLogin, setIsLogin] = useState();
    const navigate = useNavigate();




    const fetchFirstRecord = async () => {
        try {
            const record = await pb.collection('register').getFirstListItem(`phone="${phone}"`, {
                expand: 'fullname,email', // Add the fields you want to retrieve
            });

            console.log('First Record:', record);

            // Perform login logic based on the retrieved record
            if (record) {
                // Example: Check if the phone and email match certain conditions
                if (record.phone === phone) {
                    // Perform successful login logic here
                    console.log('Login successful!');
                    setIsLogin(true);
                    // try to set cookie
                    // const expires = new Date();
                    // expires.setMinutes(expires.getMinutes() + 1);
                    // document.cookie = `fullname=${record.fullname};expires=${expires.toUTCString()};path=/`;
                    // document.cookie = `email=${record.email};expires=${expires.toUTCString()};path=/`;
                    // document.cookie = `phone=${phone};expires=${expires.toUTCString()};path=/`;
                    sessionStorage.setItem('fullname', record.fullname);
                    sessionStorage.setItem('email', record.email);
                    sessionStorage.setItem('phone', phone);

                    window.location.reload();
                    navigate('/');
                    // how to refresh for useEffect in app.js take an effect


                } else {
                    console.log('Login failed. Invalid phone');
                }
            } else {
                console.log('Login failed. User not found.');
            }
        } catch (error) {
            console.error('Error fetching first record:', error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        await fetchFirstRecord();
    };

    return (
        <>

            <div className='container d-flex flex-column justify-content-center sticky-top' style={{ border: '6px solid #fff', borderRadius: '20px', boxShadow: '0 0 10px #ccc', backgroundColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(2px)', height: '40vh' }}>
                {/* <h1 className='text-dark'>Logged In : {pb.authStore.isValid.toString()}</h1> */}
                <div className="h-50">
                    <div className="row">
                        <div className="col col-lg-4 col-md-6 col-sm mx-auto">
                            <form className="form-group">

                                <h1 className='text-center' style={{ textShadow: '0 4px 3px #fff, 0 0 5px #fff' }}>
                                    {sessionStorage.getItem('fullname') &&
                                        <>
                                            <h1>ยินดีต้อนรับ</h1>
                                            {sessionStorage.getItem('fullname')}
                                            <div className='mt-3'>

                                                <Link to="/logout" className='btn btn-danger'>
                                                    <FontAwesomeIcon icon={faArrowRightFromBracket} onClick={() => {
                                                        sessionStorage.clear();
                                                        // window.location.reload();
                                                    }} /> ออกจากระบบ
                                                </Link>
                                            </div>
                                        </>


                                    }


                                </h1>

                                {!sessionStorage.getItem('fullname') ?
                                    <div className='d-flex flex-column text-center'>
                                        <h1>เข้าสู่ระบบ  </h1> <FontAwesomeIcon icon={faKey} style={{ height: 30 }} />
                                        <input type="text" className="form-control rounded-pill" id="phone" placeholder="เบอร์โทร..." onChange={e => setPhone(e.target.value)} autoFocus />
                                        <div className="d-flex justify-content-center align-items-center mx-auto">
                                            <button onClick={handleLogin} className='btn-green mt-3 rounded-pill'>ตกลง</button>
                                        </div>

                                    </div> : null
                                }

                            </form>

                        </div>
                    </div>
                </div>

            </div>
            <div className="mt-3 p-5">

                <Calendar />
            </div>
        </>
    );
};

export default Login;
