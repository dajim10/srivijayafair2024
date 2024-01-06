// YourQaForm.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './gauge.css'; // Import your custom CSS file

const Gauge = () => {
    const [formData, setFormData] = useState({
        platformConvenience: '',
        virtualExhibitionSatisfaction: '',
        centralStageSatisfaction: '',
        marketBoothSatisfaction: '',
        openHouseSatisfaction: '',
    });

    const handleChange = (category, value) => {
        setFormData({
            ...formData,
            [category]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your logic to handle form submission here
    };

    return (
        <form className="your-qa-form" onSubmit={handleSubmit}>
            <h2>ความพึงพอใจของผู้ใช้</h2>

            {/* Platform Satisfaction */}
            <div className="form-group">
                <label>ความพึงพอใจของการจัดงานรูปแบบ Virtual Exhibition Platform</label>
                {[5, 4, 3, 2, 1].map((level) => (
                    <div key={level} className="form-check form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            id={`platformConvenience_${level}`}
                            name="platformConvenience"
                            value={level}
                            checked={formData.platformConvenience === level.toString()}
                            onChange={() => handleChange('platformConvenience', level.toString())}
                        />
                        <label className="form-check-label" htmlFor={`platformConvenience_${level}`}>
                            {level}
                        </label>
                    </div>
                ))}
            </div>

            {/* Virtual Exhibition Satisfaction */}
            {/* ... Repeat the above structure for other satisfaction categories ... */}

            <button type="submit" className="btn btn-primary">
                Submit
            </button>
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
