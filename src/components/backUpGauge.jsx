// YourQaForm.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './gauge.css'; // Import your custom CSS file
import { client } from '../lib/pocketbase';

const Gauge = () => {
    const [formData, setFormData] = useState({
        phone: '',
        name: '',
        gender: '',
        ageRange: '',
        education: '',
        activities: [],
        platformConvenience: '',
        virtualExhibitionSatisfaction: '',
        centralStageSatisfaction: '',
        marketBoothSatisfaction: '',
        openHouseSatisfaction: '',
    });

    // const handleChange = (category, value) => {
    //     setFormData({
    //         ...formData,
    //         [category]: value,
    //     });
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your logic to handle form submission here
    };


    // Handle form input changes
    const handleChange = (e) => {

        const { name, value } = e.target;
        console.log(name, value)
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle checkbox changes for activities
    const handleActivitiesChange = (e) => {
        const { value, checked } = e.target;
        const updatedActivities = checked
            ? [...formData.activities, value]
            : formData.activities.filter((activity) => activity !== value);

        setFormData({
            ...formData,
            activities: updatedActivities,
        });
    };

    const handlePhoneChange = async (e) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            phone: value,
        });
        const phone = value;


    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your logic to handle form submission here
        const phone = formData.phone;
        try {
            const existingRecord = await client.collection('register').getFirstListItem(`phone="${phone}"`);

            if (existingRecord) {
                const dataUpdate = {
                    score: existingRecord.score + 1
                }
                console.log(existingRecord.score);
                await client.collection('register').update(existingRecord.id, dataUpdate);
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
        setFormData({
            name: '',
            gender: '',
            ageRange: '',
            education: '',
            activities: [],
            platformConvenience: '',
            virtualExhibitionSatisfaction: '',
            centralStageSatisfaction: '',
            marketBoothSatisfaction: '',
            openHouseSatisfaction: '',
            phone: '',
        });


    };

    // const value = formData.phone;





    // client.collection('register').getList(1, {
    //     filter: {
    //         phone: value
    //     }
    // }).then(res => {
    //     console.log(res)
    // }).catch(err => {
    //     console.log(err)
    // })


    return (
        <form className="your-qa-form" onSubmit={handleSubmitForm}>
            <h2>แบบประเมินความพึงพอใจ</h2>

            <div className="form-control mt-2 mb-2">
                <label htmlFor="">เบอร์โทร</label>
                <input type="text" id="phone" name="phone" className=''
                    value={formData.phone} onChange={handleChange} />
            </div>

            <div className="form-control mt-2 mb-2">
                {/* ข้อมูลส่วนบุคคล */}

                <label>
                    ชื่อ - สกุล:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>

                <label>
                    เพศ:
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">เลือกเพศ</option>
                        <option value="ชาย">ชาย</option>
                        <option value="หญิง">หญิง</option>
                    </select>
                </label>

                <label>
                    ช่วงอายุ:
                    <select name="ageRange" value={formData.ageRange} onChange={handleChange} required>
                        <option value="">เลือกช่วงอายุ</option>
                        <option value="น้อยกว่า 25 ปี">น้อยกว่า 25 ปี</option>
                        <option value="25 - 40 ปี">25 - 40 ปี</option>
                        <option value="41 - 50 ปี">41 - 50 ปี</option>
                        <option value="50 ปีขึ้นไป">50 ปีขึ้นไป</option>
                    </select>
                </label>

                <label>
                    คุณวุฒิการศึกษา:
                    <select name="education" value={formData.education} onChange={handleChange} required>
                        <option value="">เลือกคุณวุฒิการศึกษา</option>
                        <option value="มัธยมศึกษา / ปวช. / ปวส.">มัธยมศึกษา / ปวช. / ปวส.</option>
                        <option value="ปริญญาตรี">ปริญญาตรี</option>
                        <option value="ปริญญาโท">ปริญญาโท</option>
                        <option value="ปริญญาเอก">ปริญญาเอก</option>
                    </select>
                </label>
            </div>

            <div className="form-control mt-2 mb-2">
                <label>
                    กิจกรรมที่เข้าร่วม (ตอบได้มากกว่า 1 ข้อ):
                    <div>
                        <input
                            type="checkbox"
                            name="activities"
                            value="เวทีกลาง"
                            checked={formData.activities.includes('เวทีกลาง')}
                            onChange={handleActivitiesChange}
                        />
                        <label>เวทีกลาง</label>
                    </div>

                    <div>
                        <input
                            type="checkbox"
                            name="activities"
                            value="Open House"
                            checked={formData.activities.includes('Open House')}
                            onChange={handleActivitiesChange}
                        />
                        <label>Open House</label>
                    </div>

                    <div>
                        <input
                            type="checkbox"
                            name="activities"
                            value="ตลาดนัดหลักสูตร"
                            checked={formData.activities.includes('ตลาดนัดหลักสูตร')}
                            onChange={handleActivitiesChange}
                        />
                        <label>ตลาดนัดหลักสูตร</label>
                    </div>
                </label>
            </div>


            {/* ข้อมูลส่วนบุคคล */}

            <div className="form-group glass p-2">
                <label htmlFor="exhibition">ความพึงพอใจของการจัดงานรูปแบบ Virtual Exhibition Platform</label>
                <div className='form-check '>

                    <input type="radio" value="5" name="toppic1" className='m-2' />
                    <label htmlFor="1">5</label>
                    <input type="radio" value="4" name="toppic1" className='m-2' />
                    <label htmlFor="2">4</label>
                    <input type="radio" value="3" name="toppic1" className='m-2' />
                    <label htmlFor="3">3</label>
                    <input type="radio" value="2" name="toppic1" className='m-2' />
                    <label htmlFor="4">2</label>
                    <input type="radio" value="1" name="toppic1" className='m-2' />
                    <label htmlFor="5">1</label>
                </div>

            </div>

            {/* Platform Satisfaction */}
            {/* <div className="form-group form-control">
                <label>ความพึงพอใจของการจัดงานรูปแบบ Virtual Exhibition Platform</label>
                {[5, 4, 3, 2, 1].map((level) => (
                    <div key={level} className="form-check form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            id={`platformConvenience_${level}`}
                            name="platformConvenience"
                            value={level}
                            checked={"5"}
                            onChange={(e) => {
                                // const { value } = e.target;
                                // console.log(value)
                                // handleChange('platformConvenience', level)
                                handleChange(e);
                            }
                            }
                        />
                        <label className="form-check-label" htmlFor={`platformConvenience_${level}`}>
                            {level}
                        </label>
                    </div>
                ))}
            </div> */}




            {/* Virtual Exhibition Satisfaction */}
            {/* ... Repeat the above structure for other satisfaction categories ... */}
            <div className="justify-content-center d-flex">
                <button type="submit" className="button-85" >
                    บันทึก
                </button>
            </div>
        </form>
    );
};

export default Gauge;





// import React, { useState } from 'react';
// import './Gauge.css';


// const Gauge = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         gender: '',
//         ageRange: '',
//         education: '',
//         activities: [],
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleActivitiesChange = (e) => {
//         const { value, checked } = e.target;
//         const updatedActivities = checked
//             ? [...formData.activities, value]
//             : formData.activities.filter((activity) => activity !== value);

//         setFormData({
//             ...formData,
//             activities: updatedActivities,
//         });
//         // if formData insert into pocketbase
//         client.collection('gauge').create(formData).then(res => {
//             console.log(res)
//         }).catch(err => {
//             console.log(err)
//         }
//         )



//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Form submitted:', formData);
//     };

//     return (
//         <div className="row">
//             <div className="col-lg-6 mx-auto">
//                 <form className="form-group " onSubmit={handleSubmit}>
//                     <label>
//                         ชื่อ - สกุล:
//                         <input type="text" name="name" value={formData.name} onChange={handleChange} required className='form-control' />
//                     </label>

//                     <label>
//                         เพศ:
//                         <select name="gender" value={formData.gender} onChange={handleChange} required className='form-control'>
//                             <option value="" className='form-control'>เลือกเพศ</option>
//                             <option value="ชาย" className='form-control'>ชาย</option>
//                             <option value="หญิง" className='form-control'>หญิง</option>
//                         </select>
//                     </label>

//                     <label>
//                         ช่วงอายุ:
//                         <select name="ageRange" value={formData.ageRange} onChange={handleChange} required>
//                             <option value="">เลือกช่วงอายุ</option>
//                             <option value="น้อยกว่า 25 ปี">น้อยกว่า 25 ปี</option>
//                             <option value="25 - 40 ปี">25 - 40 ปี</option>
//                             <option value="41 - 50 ปี">41 - 50 ปี</option>
//                             <option value="50 ปีขึ้นไป">50 ปีขึ้นไป</option>
//                         </select>
//                     </label>

//                     <label>
//                         คุณวุฒิการศึกษา:
//                         <select name="education" value={formData.education} onChange={handleChange} required>
//                             <option value="">เลือกคุณวุฒิการศึกษา</option>
//                             <option value="มัธยมศึกษา / ปวช. / ปวส.">มัธยมศึกษา / ปวช. / ปวส.</option>
//                             <option value="ปริญญาตรี">ปริญญาตรี</option>
//                             <option value="ปริญญาโท">ปริญญาโท</option>
//                             <option value="ปริญญาเอก">ปริญญาเอก</option>
//                         </select>
//                     </label>

//                     <label>
//                         กิจกรรมที่เข้าร่วม (ตอบได้มากกว่า 1 ข้อ):
//                         <div>
//                             <input
//                                 type="checkbox"
//                                 name="activities"
//                                 value="เวทีกลาง"
//                                 checked={formData.activities.includes('เวทีกลาง')}
//                                 onChange={handleActivitiesChange}
//                             />
//                             <label>เวทีกลาง</label>
//                         </div>

//                         <div>
//                             <input
//                                 type="checkbox"
//                                 name="activities"
//                                 value="Open House"
//                                 checked={formData.activities.includes('Open House')}
//                                 onChange={handleActivitiesChange}
//                             />
//                             <label>Open House</label>
//                         </div>

//                         <div>
//                             <input
//                                 type="checkbox"
//                                 name="activities"
//                                 value="ตลาดนัดหลักสูตร"
//                                 checked={formData.activities.includes('ตลาดนัดหลักสูตร')}
//                                 onChange={handleActivitiesChange}
//                             />
//                             <label>ตลาดนัดหลักสูตร</label>
//                         </div>
//                     </label>

//                     <button type="submit">Submit</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Gauge;
