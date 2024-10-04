import React, { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import { useNavigate, Link } from 'react-router-dom';
const url = import.meta.env.VITE_POCKETBASE_URL;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faHouse, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Calendar from './Calendar';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const pb = new PocketBase(url);

const Login = () => {
    const [phone, setPhone] = useState('');
    const [isLogin, setIsLogin] = useState();
    const [score, setScore] = useState(0);
    const navigate = useNavigate();




    const fetchFirstRecord = async () => {
        try {
            const record = await pb.collection('register').getFirstListItem(`phone="${phone}"`, {
                expand: 'fullname,email,phone,email,address,score,spinCount', // Add the fields you want to retrieve
            });

            console.log('First Record:', record);

            // Perform login logic based on the retrieved record
            if (record) {
                localStorage.setItem('phone', phone);
                // Example: Check if the phone and email match certain conditions
                if (record.phone === phone) {
                    // Perform successful login logic here
                    // console.log('Login successful!');
                    Swal.fire({
                        title: "Srivijaya Fair 2024",
                        text: "เข้าสู่ระบบสำเร็จ",
                        icon: "success",
                        footer: '<img src="https://dev.web.rmutsv.ac.th/assets/Logo500-KNQzDSng.png" alt="" width="100px" />'
                    });
                    setIsLogin(true);
                    setScore(record.score);
                    // try to set cookie
                    // const expires = new Date();
                    // expires.setMinutes(expires.getMinutes() + 1);
                    // document.cookie = `fullname=${record.fullname};expires=${expires.toUTCString()};path=/`;
                    // document.cookie = `email=${record.email};expires=${expires.toUTCString()};path=/`;
                    // document.cookie = `phone=${phone};expires=${expires.toUTCString()};path=/`;
                    sessionStorage.setItem('fullname', record.fullname);
                    sessionStorage.setItem('email', record.email);
                    sessionStorage.setItem('phone', phone);
                    sessionStorage.setItem('address', record.address);
                    sessionStorage.setItem('score', record.score);
                    sessionStorage.setItem('id', record.id);
                    sessionStorage.setItem('spinCounter', record.spinCounter);
                    sessionStorage.setItem('register_type', record.register_type);
                    // document.cookie = `phone=${phone};path=/`;
                    //

                    navigate('/');
                    window.location.reload();
                    // how to refresh for useEffect in app.js take an effect


                } else {
                    console.log('Login failed. Invalid phone');
                }
            } else {
                console.log('Login failed. User not found.');
            }
        } catch (error) {
            // console.error('Error fetching first record:', error);
            Swal.fire("เข้าระบบไม่สำเร็จ กรุณาตรวจสอบเบอร์โทรศัพท์อีกครั้ง", "Login Fail", "error");
            setPhone('');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        await fetchFirstRecord();
    };

    return (
        <>

            <div className='container d-flex flex-column justify-content-center ' style={{ border: '6px solid #fff', borderRadius: '20px', boxShadow: '0 0 10px #ccc', backgroundColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(2px)', height: '40vh' }}>
                {/* <h1 className='text-dark'>Logged In : {pb.authStore.isValid.toString()}</h1> */}
                <div className="h-50">
                    <div className="row">
                        <div className="col col-lg-4 col-md-6 col-sm mx-auto">
                            <form className="form-group">


                                {sessionStorage.getItem('fullname') &&
                                    <div className='text-center'>
                                        <h1>ยินดีต้อนรับ</h1>
                                        {sessionStorage.getItem('fullname')}
                                        <div className='mt-2'>

                                            <Link to="/" className='btn btn-success m-2'>
                                                <FontAwesomeIcon icon={faHouse} onClick={() => {
                                                    sessionStorage.clear();
                                                    // window.location.reload();
                                                }} /> กลับหน้าหลัก
                                            </Link>

                                            <Link to="/logout" className='btn btn-danger m-2'>
                                                <FontAwesomeIcon icon={faArrowRightFromBracket} onClick={() => {
                                                    sessionStorage.clear();
                                                    // window.location.reload();
                                                }} /> ออกจากระบบ
                                            </Link>


                                        </div>


                                    </div>


                                }




                                {!sessionStorage.getItem('fullname') ?
                                    <div className='d-flex flex-column text-center'>
                                        <h1>เข้าสู่ระบบ  </h1> <FontAwesomeIcon icon={faKey} style={{ height: 30 }} />
                                        <input type="tel" className="form-control rounded-pill" id="phone" placeholder="เบอร์โทร..." onChange={e => setPhone(e.target.value)} autoFocus />
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
            <div className="mt-3">

                <Calendar />
            </div>
        </>
    );
};

export default Login;
