import { client as pb } from '../lib/pocketbase';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLine } from '@fortawesome/free-brands-svg-icons';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


const Register = () => {
    const navigate = useNavigate();
    const [allowInput, setAllowInput] = useState(false);
    const [phone, setPhone] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [facebook, setFacebook] = useState('');
    const [line, setLine] = useState('');
    const [school, setSchool] = useState('');

    const [register_type, setRegister_type] = useState('1');


    const createMember = () => {
        pb.collection('register').create({
            phone: phone,
            fullname: fullname,
            email: email,
            register_type: register_type,
            facebook: facebook,
            line: line,
            school: school,

        })
            .then(res => {
                console.log(res);
                Swal.fire("ลงทะเบียนสำเร็จ", "ระบบกำลังพาคุณไปหน้าล็อกอิน", "success");
                navigate('/login');
            })
            .catch(err => {
                console.log(err);
            });
    };

    const checkPhone = (phone) => {

        if (phone.length !== 10) {
            Swal.fire("เบอร์โทรศัพท์ไม่ถูกต้อง", "กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก", "error");
            // document.getElementById('phone').focus();
            setPhone('');

        }


    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const existingRecord = await pb.collection('register').getFirstListItem(`phone="${phone}"`);

            if (existingRecord) {
                alert('เบอร์โทรศัพท์นี้มีผู้ใช้งานแล้ว');
                console.log(existingRecord)
                document.getElementById('phone').focus();
                return;
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
                    <option value="2">นักเรียน-นักศึกษา</option>
                    <option value="3">บุคลากรมทร.ศรีวิชัย</option>
                    <option value="4">นักศึกษามทร.ศรีวิชัย</option>

                </select>



                {/* <label htmlFor="fullname">ชื่อ-นามสกุล</label> */}
                <input type="text" className="form-control" id="fullname" placeholder="ชื่อ-นามสกุล" value={fullname} onChange={(e) => setFullname(e.target.value)}
                    required
                    autoFocus
                />


                <input type="tel" className="form-control" id="phone" placeholder="เบอร์โทรศัพท์" value={phone} onChange={(e) => setPhone(e.target.value)} onBlur={e => checkPhone(e.target.value)}
                    required
                />

                <input type="email"
                    className="form-control" id="email" placeholder="อีเมล"
                    value={email} onChange={(e) => setEmail(e.target.value)}

                />
                {register_type === '2' &&
                    <input type="text" className="form-control" id="schoolName" placeholder="ชื่อโรงเรียน" required onChange={(e) => setSchool(e.target.value)} />
                }

                <div className="form-group mt-3">
                    <h3>Social</h3>
                    <div className="form-group">
                        <FontAwesomeIcon icon={faFacebook} style={{ fontSize: '20px', color: 'blue' }} />

                        <input type="text" className="form-control" id="facebook" placeholder="Facebook" onChange={(e) => setFacebook(e.target.value)} />
                    </div>
                    <div className="form-group mt-2">
                        <FontAwesomeIcon icon={faLine} style={{ fontSize: '20px', color: 'green' }} />
                        <input type="text" className="form-control" id="line" placeholder="Line" onChange={(e) => setLine(e.target.value)} />
                    </div>


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