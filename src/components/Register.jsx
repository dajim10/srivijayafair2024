import { client as pb } from '../lib/pocketbase';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const Register = () => {
    const navigate = useNavigate();
    const [allowInput, setAllowInput] = useState(false);
    const [phone, setPhone] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [homeNumber, setHomeNumber] = useState('');
    const [soi, setSoi] = useState('');
    const [road, setRoad] = useState('');
    const [tambol, setTambol] = useState('');
    const [ampur, setAmpur] = useState('');
    const [province, setProvince] = useState('');
    const [postCode, setPostCode] = useState('');
    const [schoolName, setSchoolName] = useState('');

    const [register_type, setRegister_type] = useState('1');


    const createMember = () => {
        pb.collection('register').create({
            phone: phone,
            fullname: fullname,
            email: email,
            address: address,
            register_type: register_type,
            homeNumber: homeNumber,
            soi: soi,
            road: road,
            tambol: tambol,
            ampur: ampur,
            province: province,
            postCode: postCode,
            schoolName: schoolName,

        })
            .then(res => {
                console.log(res);
                alert('ลงทะเบียนเรียบร้อยแล้ว');
                navigate('/login');
            })
            .catch(err => {
                console.log(err);
            });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const existingRecord = await pb.collection('register').getFirstListItem(`phone="${phone}"`);

            if (existingRecord) {
                alert('เบอร์โทรศัพท์นี้มีผู้ใช้งานแล้ว');
                console.log(existingRecord)
            } else {
                console.log('No existing record found. Proceeding to createMember...');
            }
        } catch (err) {
            // console.log(err)
            if (err.statusCode === 404) {
                // Handle the case where the document is not found
                console.log('Document not found. Proceeding to createMember...');
            } else {
                createMember(); // Proceed to create the member even if the document is not found
                // console.error('Error:', err);

            }
        }
    };










    return (
        <div className="container    d-flex flex-column align-items-center justify-content-center sticky-top" style={{ border: '6px solid #fff', borderRadius: '20px', boxShadow: '0 0 10px #ccc', backgroundColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(2px)' }} >
            <form onSubmit={handleSubmit} className='form-group'>
                {/* <div className="form-group"> */}


                {/* </div> */}
                {/* <div className="form-group"> */}
                <h1 className="text-center mt-3" >ลงทะเบียน</h1>
                <label htmlFor="register_type">คุณคือ?...</label>

                <select className="form-control rounded-pill" id="register_type" required style={{ fontSize: '20px' }} onChange={e => setRegister_type(e.target.value)} >
                    <option value="1">บุคคลทั่วไป</option>
                    <option value="2">บุคลากรมหาวิทยาลัย</option>
                    {/* <option value="3">ศิษย์เก่า</option> */}
                </select>

                {register_type === '1' &&
                    <input type="text" className="form-control" id="schoolName" placeholder="ชื่อโรงเรียน" autoFocus required onChange={(e) => setSchoolName(e.target.value)} />
                }

                {/* <label htmlFor="fullname">ชื่อ-นามสกุล</label> */}
                <input type="text" className="form-control" id="fullname" placeholder="ชื่อ-นามสกุล" value={fullname} onChange={(e) => setFullname(e.target.value)}
                    required

                />

                {/* </div> */}

                {/* <div className="form-group"> */}
                {/* <label htmlFor="phone">เบอร์โทรศัพท์</label> */}
                <input type="text" className="form-control" id="phone" placeholder="เบอร์โทรศัพท์" value={phone} onChange={(e) => setPhone(e.target.value)}
                    required
                />
                {/* </div> */}
                {/* <div className="form-group"> */}
                {/* <label htmlFor="email">E-mail</label> */}
                <input type="email"
                    className="form-control" id="email" placeholder="อีเมล"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {/* </div> */}
                <div className="form-group mt-3">

                    {/* <textarea type="text" className="form-control" id="address" placeholder="ที่อยู่"
                        value={address} onChange={(e) => setAddress(e.target.value)}
                        required
                    /> */}
                    <label htmlFor="address">ที่อยู่</label>
                    <input type="text" className="form-control" id="homeNumber" placeholder="บ้านเลขที่"
                        value={homeNumber} onChange={(e) => setHomeNumber(e.target.value)}
                        required
                    />
                    <input type="text" className="form-control" id="soi" placeholder="ซอย"
                        value={soi} onChange={(e) => setSoi(e.target.value)}
                        required
                    />
                    <input type="text" className="form-control" id="road" placeholder="ถนน"
                        value={road} onChange={(e) => setRoad(e.target.value)}
                        required
                    />
                    <input type="text" className="form-control" id="tambol" placeholder="ตำบล"
                        value={tambol} onChange={(e) => setTambol(e.target.value)}
                        required
                    />
                    <input type="text" className="form-control" id="ampur" placeholder="อำเภอ"
                        value={ampur} onChange={(e) => setAmpur(e.target.value)}
                        required
                    />
                    <input type="text" className="form-control" id="province" placeholder="จังหวัด"
                        value={province} onChange={(e) => setProvince(e.target.value)}
                        required
                    />
                    <input type="text" className="form-control" id="postCode" placeholder="รหัสไปรษณีย์"
                        value={postCode} onChange={(e) => setPostCode(e.target.value)}
                        required
                    />


                    <small>*** กรุณาระบุข้อมูลตามความเป็นจริงเพื่อประโยชน์ในการติดต่อกลับในกรณีที่ได้รับของรางวัล</small>
                </div>
                <div className="form-group mt-3">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="allowInput" checked={allowInput} onChange={(e) => setAllowInput(e.target.checked)} />
                        <label className="form-check-label" htmlFor="allowInput" style={{ fontSize: '15px' }}>
                            ข้าพเจ้ายินยอมในการเก็บข้อมูลส่วนบุคคล...
                        </label>
                        <div className="form-group text-center ">
                            <button type="submit" className="btn-green rounded-pill mt-3" disabled={allowInput ? false : true}>ตกลง</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register