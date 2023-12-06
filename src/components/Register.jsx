import React, { useState, useEffect } from 'react'
import { client } from '../lib/pocketbase'
import { useNavigate } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faKey } from '@fortawesome/free-solid-svg-icons'

const Register = () => {
    const navigate = useNavigate();

    const [phone, setPhone] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        client.collection('register').create({
            phone: phone,
            fullname: fullname,
            email: email,
            address: address
        })
            .then(res => {
                console.log(res);
                alert('ลงทะเบียนเรียบร้อยแล้ว');
                navigate('/login');

            })
            .catch(err => {
                console.log(err);
            });
    }



    return (
        <div className="container  h-50  d-flex flex-column align-items-center justify-content-center sticky-top" style={{ border: '6px solid #fff', borderRadius: '20px', boxShadow: '0 0 10px #ccc', backgroundColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(2px)' }} >
            <h1 className="text-center" >ลงทะเบียน</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    {/* <label htmlFor="fullname">ชื่อ-นามสกุล</label> */}
                    <input type="text" className="form-control" id="fullname" placeholder="ชื่อ-นามสกุล" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                </div>
                <div className="form-group">
                    {/* <label htmlFor="phone">เบอร์โทรศัพท์</label> */}
                    <input type="text" className="form-control" id="phone" placeholder="เบอร์โทรศัพท์" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="form-group">
                    {/* <label htmlFor="email">E-mail</label> */}
                    <input type="email"
                        className="form-control" id="email" placeholder="อีเมล"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group mt-3">

                    <textarea type="text" className="form-control" id="address" placeholder="ที่อยู่"
                        value={address} onChange={(e) => setAddress(e.target.value)}

                    />
                </div>
                <div className="form-group text-center">
                    <button type="submit" className="btn-green rounded-pill mt-3">ตกลง</button>
                </div>
            </form>
        </div>
    )
}

export default Register