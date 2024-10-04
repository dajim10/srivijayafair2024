import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import PocketBase from 'pocketbase';
const url = import.meta.env.VITE_POCKETBASE_URL;
const pb = new PocketBase(url);

const SurveyForm = () => {


    const [formData, setFormData] = useState({
        fullname: '',
        address: '',
        phone: '',
        education: '', // ระดับการศึกษา
        gender: '', // เพศ
        ageGroup: '', // ช่วงอายุ
        region: '', // ภูมิภาค
        prScore: '5', // การประชาสัมพันธ์
        loginScore: '5', // ความสะดวกในการลงชื่อเข้าใช้งาน
        exhibitionGuideScore: '5', // การแนะนำขั้นตอนการเยี่ยมชม
        designScore: '5', // ความเหมาะสมในการออกแบบหน้าต่าง
        timeEventScore: '5', // ความเหมาะสมของช่วงเวลาในการจัดงาน
        timeEventFormat: '5', // ความพึงพอใจในการเยี่ยมชม
        knowledgeScore: '5', // ความรู้เกี่ยวกับหลักสูตรที่ได้รับจากกิจกรรม
        presentationScore: '5', // ความน่าสนใจของรูปแบบการนำเสนอ
        accessScore: '5', // ความสะดวกในการเข้าถึงของบูธคณะ/วิทยาลัย
        chatScore: '5', // ความเหมาะสมของการตอบข้อซักถามจาก Chat/Call
        satisfactionScore: '5', // ภาพรวมความพึงพอใจของการจัดงานรูปแบบ Virtual Exhibition Platform
        comments: '', // ข้อเสนอแนะเพิ่มเติม
    });

    // useEffect(() => {
    //     const fetchData = async () => {
    //         let url = 'https://api.sheety.co/fa2fa9feec931d47c52fbdcfc21c571f/survey/sheet1';
    //         fetch(url)
    //             .then((response) => response.json())
    //             .then(json => {
    //                 // Do something with the data
    //                 console.log(json.sheet1S);
    //             });
    //     };
    //     fetchData();
    // }, []);


    useEffect(() => {
        const phone = sessionStorage.getItem('phone');
        if (phone) {
            setFormData((prevData) => ({
                ...prevData,
                fullname: sessionStorage.getItem('fullname'),
                phone: phone,
            }));
            const address = document.querySelector('input[name="address"]');
            // set focus to address input
            // address.focus();
        }
        if (!phone) {
            Swal.fire({
                title: 'กรุณา login ก่อนทำแบบประเมินเพื่อรับคะแนนพิเศษ',
                icon: 'info',
                confirmButtonText: 'ตกลง'
            })
            const fullname = document.querySelector('input[name="fullname"]');
            // set focus to fullname input
            // fullname.focus();
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSatisfactionChange = (issue, rating) => {
        setFormData((prevData) => ({
            ...prevData,
            satisfactionLevels: {
                ...prevData.satisfactionLevels,
                virtualExhibition: {
                    ...prevData.satisfactionLevels.virtualExhibition,
                    [issue]: rating,
                },
            },
        }));
    };


    const fetchFirstRecord = async () => {
        const phone = sessionStorage.getItem('phone');
        try {
            const record = await pb.collection('register').getFirstListItem(`phone="${phone}"`, {
                expand: 'fullname,email,phone,email,address,score,spinCount', // Add the fields you want to retrieve
            });



            console.log('First Record:', record);

            // Perform login logic based on the retrieved record
            if (record && record.survey === false) {
                const id = record.id;
                console.log('id from register collection', id);
                pb.collection('register').update(id, {
                    score: record.score + 50,
                    survey: true

                }).then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                });



            } else {
                console.log('User not found.');
            }
        } catch (error) {
            console.log(err)
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('searching for id from register collection')
        await pb.collection('survey').create(formData).then((res) => {
            // console.log(res);
            Swal.fire({
                title: 'ส่งแบบประเมินสำเร็จ',
                text: 'ขอบคุณสำหรับความร่วมมือ',
                icon: 'success',
                confirmButtonText: 'ตกลง'
            })
            fetchFirstRecord();
        }).catch((err) => {
            console.log(err);
        });



        setFormData({

            fullname: '',
            address: '',
            phone: '',
            education: '', // ระดับการศึกษา
            gender: '', // เพศ
            ageGroup: '', // ช่วงอายุ
            region: '', // ภูมิภาค
            prScore: '5', // การประชาสัมพันธ์
            loginScore: '5', // ความสะดวกในการลงชื่อเข้าใช้งาน
            exhibitionGuideScore: '5', // การแนะนำขั้นตอนการเยี่ยมชม
            designScore: '5', // ความเหมาะสมในการออกแบบหน้าต่าง
            timeEventScore: '5', // ความเหมาะสมของช่วงเวลาในการจัดงาน
            timeEventFormat: '5', // ความพึงพอใจในการเยี่ยมชม
            knowledgeScore: '5', // ความรู้เกี่ยวกับหลักสูตรที่ได้รับจากกิจกรรม
            presentationScore: '5', // ความน่าสนใจของรูปแบบการนำเสนอ
            accessScore: '5', // ความสะดวกในการเข้าถึงของบูธคณะ/วิทยาลัย
            chatScore: '5', // ความเหมาะสมของการตอบข้อซักถามจาก Chat/Call
            satisfactionScore: '5', // ภาพรวมความพึงพอใจของการจัดงานรูปแบบ Virtual Exhibition Platform
            comments: '', // ข้อเสนอแนะเพิ่มเติม
        })


        // Add your fetch or axios request here to send data to the server
    };

    return (
        <div className='container mt-3 glass d-flex  flex-column justify-content-center align-items-center'>
            <p className='mt-3 text-center btn-green text-light rounded-pill shadow' style={{ border: '5px solid #fff' }}>แบบประเมินความพึงพอใจการจัดงาน<br />ราชมงคลศรีวิชัยแฟร์ 2567 (2024)</p>

            <form onSubmit={handleSubmit}>
                {/* General Information */}
                <p className='mt-3 mb-2'>ข้อมูลทั่วไปของผู้ตอบ</p>
                <div className='form-control'>
                    <label>
                        ชื่อ - นามสกุล :
                        <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} autoFocus />
                    </label>

                    <label>
                        ที่อยู่ :
                        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                    </label>

                    <label>
                        เบอร์โทรศัพท์ :
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className='form-control' />
                    </label>

                    {/* ... Add other fields similarly */}
                    <p>วุฒิการศึกษา</p>
                    <label>
                        <input
                            type="radio"
                            name="education"
                            value="มัธยมต้น"
                            checked={formData.education === 'มัธยมต้น'}
                            onChange={handleChange}
                        />
                        มัธยมต้น
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="education"
                            value="มัธยมปลาย"
                            checked={formData.education === 'มัธยมปลาย'}
                            onChange={handleChange}
                        />
                        มัธยมปลาย
                    </label>
                    {/* ... Add other education levels similarly */}

                    <label>
                        <input
                            type="radio"
                            name="education"
                            value="ปวช."
                            checked={formData.education === 'ปวช.'}
                            onChange={handleChange}
                        />
                        ปวช.
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="education"
                            value="ปวส."
                            checked={formData.education === 'ปวส.'}
                            onChange={handleChange}
                        />
                        ปวส.
                    </label>

                    <label>

                        <input
                            type="radio"
                            name="education"
                            value="ปริญญาตรี"
                            checked={formData.education === 'ปริญญาตรี'}
                            onChange={handleChange}
                        />
                        ปริญญาตรี
                    </label>

                    <label>

                        <input
                            type="radio"
                            name="education"
                            value="ปริญญาโท"
                            checked={formData.education === 'ปริญญาโท'}
                            onChange={handleChange}
                        />
                        ปริญญาโท
                    </label>

                    <label>

                        <input
                            type="radio"
                            name="education"
                            value="ปริญญาเอก"
                            checked={formData.education === 'ปริญญาเอก'}
                            onChange={handleChange}
                        />
                        ปริญญาเอก
                    </label>

                    <label>

                        <input
                            type="radio"
                            name="education"
                            value="อื่นๆ"
                            checked={formData.education === 'อื่นๆ'}
                            onChange={handleChange}
                        />
                        อื่นๆ
                    </label>

                    {/* Region */}

                    <p>เพศ</p>
                    <label>

                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={formData.gender === 'Male'}
                            onChange={handleChange}
                        />
                        ชาย
                    </label>

                    <label>

                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={formData.gender === 'Female'}
                            onChange={handleChange}
                        />
                        หญิง
                    </label>
                    <label>

                        <input
                            type="radio"
                            name="gender"
                            value="nogender"
                            checked={formData.gender === 'nogender'}
                            onChange={handleChange}
                        />
                        อื่น ๆ
                    </label>



                    {/* Age Group */}
                    <p>ช่วงอายุ</p>
                    <label>

                        <input
                            type="radio"
                            name="ageGroup"
                            value="12-14"
                            checked={formData.ageGroup === '12-14'}
                            onChange={handleChange}
                        />
                        12-14
                    </label>
                    <label>

                        <input
                            type="radio"
                            name="ageGroup"
                            value="15-17"
                            checked={formData.ageGroup === '15-17'}
                            onChange={handleChange}
                        />
                        15-17
                    </label>

                    <label>

                        <input
                            type="radio"
                            name="ageGroup"
                            value="18-25"
                            checked={formData.ageGroup === '18-25'}
                            onChange={handleChange}
                        />
                        18-25
                    </label>

                    <label>

                        <input
                            type="radio"
                            name="ageGroup"
                            value="26-30"
                            checked={formData.ageGroup === '26-30'}
                            onChange={handleChange}
                        />
                        26-30
                    </label>

                    <label>

                        <input
                            type="radio"
                            name="ageGroup"
                            value="31-40"
                            checked={formData.ageGroup === '31-40'}
                            onChange={handleChange}
                        />
                        31-40
                    </label>

                    <label>

                        <input
                            type="radio"
                            name="ageGroup"
                            value="41-50"
                            checked={formData.ageGroup === '41-50'}
                            onChange={handleChange}
                        />
                        41-50
                    </label>

                    <label>

                        <input
                            type="radio"
                            name="ageGroup"
                            value="51 ปีขึ้นไป"
                            checked={formData.ageGroup === '51 ปีขึ้นไป'}
                            onChange={handleChange}
                        />
                        51 ปีขึ้นไป
                    </label>
                    <p>อาศัยอยู่ภาคใด</p>
                    <label>
                        <input
                            type="radio"
                            name="region"
                            value="ภาคเหนือ"
                            checked={formData.region === 'ภาคเหนือ'}
                            onChange={handleChange}
                        />
                        ภาคเหนือ
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="region"
                            value="ภาคตะวันออกเฉียงเหนือ"
                            checked={formData.region === 'ภาคตะวันออกเฉียงเหนือ'}
                            onChange={handleChange}
                        />
                        ภาคตะวันออกเฉียงเหนือ
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="region"
                            value="ภาคกลาง"
                            checked={formData.region === 'ภาคกลาง'}
                            onChange={handleChange}
                        />
                        ภาคกลาง
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="region"
                            value="ภาคตะวันออก"
                            checked={formData.region === 'ภาคตะวันออก'}
                            onChange={handleChange}
                        />
                        ภาคตะวันออก
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="region"
                            value="ภาคใต้"
                            checked={formData.region === 'ภาคใต้'}
                            onChange={handleChange}
                        />
                        ภาคใต้
                    </label>




                </div>

                {/* ... Add other age groups similarly */}
                <hr />

                {/* Gender */}

                {/* Satisfaction Levels */}
                <p className='mt-3'>กรุณาให้คะแนน</p>
                <div className="mt-3 p-2 glass" >
                    <p>1.1 การประชาสัมพันธ์สำหรับการเยี่ยมชมนิทรรศการวิชาการออนไลน์: prScore</p>
                    <label>

                        <input type="radio" name="prScore" value="5" checked={formData.prScore === '5'} onChange={handleChange} />
                        5-มากที่สุด
                    </label>

                    <label>

                        <input type="radio" name="prScore" value="4" checked={formData.prScore === '4'} onChange={handleChange} />
                        4-มาก
                    </label>

                    <label>

                        <input type="radio" name="prScore" value="3" checked={formData.prScore === '3'} onChange={handleChange} />
                        3-ปานกลาง
                    </label>

                    <label>

                        <input type="radio" name="prScore" value="2" checked={formData.prScore === '2'} onChange={handleChange} />
                        2-น้อย
                    </label>

                    <label>

                        <input type="radio" name="prScore" value="1" checked={formData.prScore === '1'} onChange={handleChange} />
                        1-น้อยที่สุด
                    </label>



                </div>

                <div className="mt-2 glass p-2">
                    <p>1.2 ความสะดวกในการลงชื่อเข้าใช้งานแพลตฟอร์ม (Platform) : loginScore </p>
                    <label>
                        <input type="radio" name="loginScore" value="5" checked={formData.loginScore === '5'} onChange={handleChange} />
                        5-มากที่สุด
                    </label>

                    <label>
                        <input type="radio" name="loginScore" value="4" checked={formData.loginScore === '4'} onChange={handleChange} />
                        4-มาก
                    </label>

                    <label>
                        <input type="radio" name="loginScore" value="3" checked={formData.loginScore === '3'} onChange={handleChange} />
                        3-ปานกลาง
                    </label>

                    <label>
                        <input type="radio" name="loginScore" value="2" checked={formData.loginScore === '2'} onChange={handleChange} />
                        2-น้อย
                    </label>

                    <label>
                        <input type="radio" name="loginScore" value="1" checked={formData.loginScore === '1'} onChange={handleChange} />
                        1-น้อยที่สุด
                    </label>


                </div>
                {/* 1.3 การแนะนำขั้นตอนการเยี่ยมชมนิทรรศการวิชาการออนไลน์ */}
                <div className="mt-2 glass p-2">
                    <p>1.3 การแนะนำขั้นตอนการเยี่ยมชมนิทรรศการวิชาการออนไลน์ : exhibitionGuideScore</p>
                    <label>
                        <input type="radio" name="exhibitionGuideScore" value="5" checked={formData.exhibitionGuideScore === '5'} onChange={handleChange} />
                        5-มากที่สุด

                    </label>
                    <label>
                        <input type="radio" name="exhibitionGuideScore" value="4" checked={formData.exhibitionGuideScore === '4'} onChange={handleChange} />
                        4-มาก
                    </label>
                    <label>
                        <input type="radio" name="exhibitionGuideScore" value="3" checked={formData.exhibitionGuideScore === '3'} onChange={handleChange} />
                        3-ปานกลาง
                    </label>
                    <label>
                        <input type="radio" name="exhibitionGuideScore" value="2" checked={formData.exhibitionGuideScore === '2'} onChange={handleChange} />
                        2-น้อย
                    </label>
                    <label>
                        <input type="radio" name="exhibitionGuideScore" value="1" checked={formData.exhibitionGuideScore === '1'} onChange={handleChange} />
                        1-น้อยที่สุด
                    </label>

                </div>
                {/* 1.4 ความเหมาะสมในการออกแบบหน้าต่างใช้งานนิทรรศการวิชาการออนไลน์ */}


                <div className="mt-2 glass p-2">
                    <p>1.4 ความเหมาะสมในการออกแบบหน้าต่างใช้งานนิทรรศการวิชาการออนไลน์ : designScore</p>
                    <label>

                        <input type="radio" name="designScore" value="5" checked={formData.designScore === '5'} onChange={handleChange} />
                        5-มากที่สุด

                    </label>
                    <label>
                        <input type="radio" name="designScore" value="4" checked={formData.designScore === '4'} onChange={handleChange} />
                        4-มาก
                    </label>
                    <label>
                        <input type="radio" name="designScore" value="3" checked={formData.designScore === '3'} onChange={handleChange} />
                        3-ปานกลาง
                    </label>
                    <label>
                        <input type="radio" name="designScore" value="2" checked={formData.designScore === '2'} onChange={handleChange} />
                        2-น้อย
                    </label>
                    <label>
                        <input type="radio" name="designScore" value="1" checked={formData.designScore === '1'} onChange={handleChange} />
                        1-น้อยที่สุด
                    </label>
                </div>


                <div className="mt-2 glass p-2">
                    <p>1.5 ความเหมาะสมของช่วงเวลาในการจัดกิจกรรม : timeEventScore</p>
                    <label>

                        <input type="radio" name="timeEventScore" value="5" checked={formData.timeEventScore === '5'} onChange={handleChange} />
                        5-มากที่สุด
                    </label>
                    <label>
                        <input type="radio" name="timeEventScore" value="4" checked={formData.timeEventScore === '4'} onChange={handleChange} />
                        4-มาก
                    </label>
                    <label>
                        <input type="radio" name="timeEventScore" value="3" checked={formData.timeEventScore === '3'} onChange={handleChange} />
                        3-ปานกลาง
                    </label>
                    <label>
                        <input type="radio" name="timeEventScore" value="2" checked={formData.timeEventScore === '2'} onChange={handleChange} />
                        2-น้อย
                    </label>
                    <label>
                        <input type="radio" name="timeEventScore" value="1" checked={formData.timeEventScore === '1'} onChange={handleChange} />
                        1-น้อยที่สุด
                    </label>

                </div>

                <div className="mt-2 glass p-2">
                    <p>1.6 ความรู้เกี่ยวกับหลักสูตรที่ได้รับจากกิจกรรม : knowledgeScore</p>

                    <label>
                        <input type="radio" name="knowledgeScore" value="5" checked={formData.knowledgeScore === '5'} onChange={handleChange} />
                        5-มากที่สุด
                    </label>

                    <label>
                        <input type="radio" name="knowledgeScore" value="4" checked={formData.knowledgeScore === '4'} onChange={handleChange} />
                        4-มาก
                    </label>

                    <label>
                        <input type="radio" name="knowledgeScore" value="3" checked={formData.knowledgeScore === '3'} onChange={handleChange} />
                        3-ปานกลาง
                    </label>

                    <label>
                        <input type="radio" name="knowledgeScore" value="2" checked={formData.knowledgeScore === '2'} onChange={handleChange} />
                        2-น้อย
                    </label>

                    <label>
                        <input type="radio" name="knowledgeScore" value="1" checked={formData.knowledgeScore === '1'} onChange={handleChange} />
                        1-น้อยที่สุด
                    </label>


                </div>

                <div className="mt-2 glass p-2">
                    <p>1.7 ความน่าสนใจของรูปแบบการนำเสนอ : presentationScore </p>
                    <label>
                        <input type="radio" name="presentationScore" value="5" checked={formData.presentationScore === '5'} onChange={handleChange} />
                        5-มากที่สุด
                    </label>
                    <label>
                        <input type="radio" name="presentationScore" value="4" checked={formData.presentationScore === '4'} onChange={handleChange} />
                        4-มาก
                    </label>
                    <label>
                        <input type="radio" name="presentationScore" value="3" checked={formData.presentationScore === '3'} onChange={handleChange} />
                        3-ปานกลาง
                    </label>
                    <label>
                        <input type="radio" name="presentationScore" value="2" checked={formData.presentationScore === '2'} onChange={handleChange} />
                        2-น้อย
                    </label>
                    <label>
                        <input type="radio" name="presentationScore" value="1" checked={formData.presentationScore === '1'} onChange={handleChange} />
                        1-น้อยที่สุด
                    </label>

                </div>

                <div className="mt-2 p-2 glass">
                    <p>1.8 ความสะดวกในการเข้าถึงของบูธคณะ/วิทยาลัย : accessScore</p>
                    <label>
                        <input type="radio" name="accessScore" value="5" checked={formData.accessScore === '5'} onChange={handleChange} />
                        5-มากที่สุด
                    </label>
                    <label>
                        <input type="radio" name="accessScore" value="4" checked={formData.accessScore === '4'} onChange={handleChange} />
                        4-มาก
                    </label>
                    <label>
                        <input type="radio" name="accessScore" value="3" checked={formData.accessScore === '3'} onChange={handleChange} />
                        3-ปานกลาง
                    </label>
                    <label>
                        <input type="radio" name="accessScore" value="2" checked={formData.accessScore === '2'} onChange={handleChange} />
                        2-น้อย
                    </label>
                    <label>
                        <input type="radio" name="accessScore" value="1" checked={formData.accessScore === '1'} onChange={handleChange} />
                        1-น้อยที่สุด
                    </label>
                </div>

                <div className="mt-2 p-2 glass">
                    <p>1.9 ความเหมาะสมของการตอบข้อซักถามจาก Chat/Call : chatScore</p>
                    <label>
                        <input type="radio" name="chatScore" value="5" checked={formData.chatScore === '5'} onChange={handleChange} />
                        5-มากที่สุด
                    </label>
                    <label>
                        <input type="radio" name="chatScore" value="4" checked={formData.chatScore === '4'} onChange={handleChange} />
                        4-มาก
                    </label>
                    <label>
                        <input type="radio" name="chatScore" value="3" checked={formData.chatScore === '3'} onChange={handleChange} />
                        3-ปานกลาง
                    </label>
                    <label>
                        <input type="radio" name="chatScore" value="2" checked={formData.chatScore === '2'} onChange={handleChange} />
                        2-น้อย
                    </label>
                    <label>
                        <input type="radio" name="chatScore" value="1" checked={formData.chatScore === '1'} onChange={handleChange} />
                        1-น้อยที่สุด
                    </label>


                </div>

                <div className="mt-2 p-2 glass">
                    <p>1.10 ภาพรวมความพึงพอใจของการจัดงานรูปแบบ Virtual Exhibition Platform : satisfactionScore</p>
                    <label>
                        <input type="radio" name="satisfactionScore" value="5" checked={formData.satisfactionScore === '5'} onChange={handleChange} />
                        5-มากที่สุด
                    </label>
                    <label>
                        <input type="radio" name="satisfactionScore" value="4" checked={formData.satisfactionScore === '4'} onChange={handleChange} />
                        4-มาก
                    </label>
                    <label>
                        <input type="radio" name="satisfactionScore" value="3" checked={formData.satisfactionScore === '3'} onChange={handleChange} />
                        3-ปานกลาง
                    </label>
                    <label>
                        <input type="radio" name="satisfactionScore" value="2" checked={formData.satisfactionScore === '2'} onChange={handleChange} />
                        2-น้อย
                    </label>
                    <label>
                        <input type="radio" name="satisfactionScore" value="1" checked={formData.satisfactionScore === '1'} onChange={handleChange} />
                        1-น้อยที่สุด
                    </label>

                </div>



                <div className="form-control mt-2">
                    <p>รูปแบบการจัดงานศรีวิชัยแฟร์ครั้งต่อไปท่านเห็นว่าควรจัดรูปแบบใด</p>
                    <label >

                        <select name="timeEventFormat" value={formData.timeEventFormat} onChange={handleChange} required>
                            <option value=""></option>
                            <option value="Virtual">Virtual</option>
                            <option value="Onsite">Onsite</option>
                            <option value="Virtual+Onsite">Virtual + Onsite</option>
                        </select>
                    </label>

                    {/* Comments */}
                    <p>ข้อเสนอแนะและความคิดเห็น</p>
                    <label>

                        <textarea
                            name="comments"
                            value={formData.comments}
                            onChange={handleChange}
                            rows="4"
                            cols="50"
                        />
                    </label>
                </div>
                <small className='text-danger'>*** ผู้ที่ประเมินจะได้รับคะแนนพิเศษ 50 คะแนน จากการประเมินครั้งแรกเพียงครั้งเดียวเท่านั้น *** </small>

                <div className="text-center">
                    <button type="submit" className='button-85 my-2 mx-auto'>ส่งแบบประเมิน</button>
                </div>
            </form>
        </div >
    );
};

export default SurveyForm;
