import React, { useState, useEffect } from 'react';
import seedrandom from 'seedrandom';
import reward1 from '../assets/reward1.png';
import reward2 from '../assets/reward2.png';
import reward3 from '../assets/reward3.png';
import boyCry from '../assets/boyCry.png';
import boom from '../assets/boom.jpg';
import tryagain from '../assets/tryagain.jpg';
import { client } from '../lib/pocketbase'
// import PocketBase from 'pocketbase';
import Swal from 'sweetalert2/dist/sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { myCounter } from '../lib/getCounter';




const Rewards = () => {

    const navigate = useNavigate();
    const [rotations, setRotations] = useState([]);
    const [currentRotationIndex, setCurrentRotationIndex] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [score, setScore] = useState(0);
    const [spinCount, setSpinCount] = useState(0);
    const [getRewards, setGetRewards] = useState(0);
    const [arrowVisible, setArrowVisible] = useState(false);
    const [userName, setUserName] = useState(sessionStorage.getItem('fullname') || 'เข้าสู่ระบบ');
    const phone = useState(sessionStorage.getItem('phone'));
    const [stockId, setStockId] = useState([0]);

    const [spinCounter, setSpinCouter] = useState(parseInt(sessionStorage.getItem('spinCounter')));

    // const userId = useState(sessionStorage.getItem('id'));
    // กำหนด array ของรางวัล
    const stock = [];
    const [isLogin, setIsLogin] = useState(false);
    const [spinning, setSpinning] = useState(false);
    const [starPoint, setStarPoint] = useState(0);
    const [existingReward, setExistingReward] = useState(null);
    const [house, setHouse] = useState('');
    const [road, setRoad] = useState('');
    const [zip_code, setZipCode] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [arrayReward, setArrayReward] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [province, setProvince] = useState('');
    const [tambon, setTambon] = useState('');
    const [amphure, setAmphure] = useState('');




    // สร้าง Dropdown จังหวัด
    const handleProvinceChange = (e) => {
        const selectedProvince = e.target.value;
        setProvince(selectedProvince);
        // Reset amphure and tambon when province changes
        setAmphure('');
        setTambon('');
    };

    const handleAmphureChange = (e) => {
        const selectedAmphure = e.target.value;
        setAmphure(selectedAmphure);
        // Reset tambon when amphure changes
        setTambon('');
    };

    const handleTambonChange = (e) => {
        const selectedTambon = e.target.value;
        setTambon(selectedTambon);
    };
    // ***** สร้าง Dropdown จังหวัด *****




    useEffect(() => {
        if (showMessage === false) {
            Swal.fire({
                title: "กติกาการเล่น",
                text: `ใช้ 50 คะเเนนในการหมุนวงล้อ ผู้โชคดี...กรุณากรอกที่อยู่เพื่อจัดส่งของรางวัล `,
                icon: "info",
                confirmButtonText: "ตกลง",
            });
            setShowMessage(true);
            myCounter('Reward:')
        }
    }, [showMessage]);

    useEffect(() => {
        (() => {
            fetch(
                "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json"
            )
                .then((response) => response.json())
                .then((result) => {
                    setProvinces(result);

                });
        })();
    }, []);

    useEffect(() => {
        // Assuming you have a selectedTambon object with a zip_code property
        const selectedTambon = provinces
            .find((p) => p.name_th === province)
            ?.amphure.find((a) => a.name_th === amphure)
            ?.tambon.find((t) => t.name_th === tambon);

        if (selectedTambon) {
            setZipCode(selectedTambon.zip_code);
        } else {
            setZipCode('');
        }
    }, [province, amphure, tambon]);


    const checkRewards = async () => {
        const phone = sessionStorage.getItem('phone');

        await fetch(`${import.meta.env.VITE_POCKETBASE_URL}api/collections/userRewards/records?filter=phone='${phone}'`).then((res) => res.json())
            .then((data) => {
                // console.log(data.items);
                if (data.items.length > 0) {
                    // console.log(data)
                    console.log('มีรางวัลแล้ว')
                    setExistingReward(true);
                }
                else {
                    setExistingReward(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });


    };

    // บันทึกรายที่อยู่เพื่อรับรางวัล

    const handleSubmit = async (e) => {
        e.preventDefault();
        await client.collection('userRewards').create({
            userId: sessionStorage.getItem('id'),
            rewardId: stockId,
            phone: sessionStorage.getItem('phone'),
            fullname: sessionStorage.getItem('fullname'),
            house: house,
            road: road,
            tambon: tambon,
            amphure: amphure,
            province: province,
            zip_code: zip_code,
        });
        setModalShow(false);
        myCounternter('get reward:')
        // clear state
        setHouse('');
        setRoad('');
        setTambon('');
        setAmphure('');
        setProvince('');

        setZipCode('');
        Swal.fire({
            title: "บันทึกข้อมูลสำเร็จ",
            text: "ขอบคุณที่ใช้บริการ",
            icon: "success"
        });

    };

    // fetch score and spinCounter from pocketbase

    useEffect(() => {
        setInterval(() => {
            setScore(sessionStorage.getItem('score'));
            setSpinCouter(sessionStorage.getItem('spinCounter'));
        }, 1000);
    }, []);



    const fetchFirstRecord = async () => {
        const phone = sessionStorage.getItem('phone');
        try {
            const existingRecord = await client.collection('register').getFirstListItem(`phone="${phone}"`);


            if (existingRecord) {
                // console.log('user=>   ', existingRecord);
                setScore(existingRecord.score);
                setSpinCouter(existingRecord.spinCounter);
                setIsLogin(true);
                // console.log(existingRecord)
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


    };




    useEffect(() => {
        if (userName !== 'เข้าสู่ระบบ') {
            setUserName(sessionStorage.getItem('fullname'));
            fetchFirstRecord();
            setIsLogin(true);
            generateRandomRotations();
        } else {
            'กรุณาเข้าสู่ระบบ'
        }
    }, []);

    // fetch starPoint from pocketbase fetch ทุกๆ 1 วินาที
    useEffect(() => {
        setInterval(() => {
            client.collection('statusgame').getList(1)
                .then(res => {

                    setStarPoint(res.items[0].starPoint);
                    sessionStorage.setItem('starPoint', res.items[0].starPoint);
                    // console.log('starPoint : ', res.items[0].starPoint);


                })
                .catch(err => {
                    console.log(err);
                });
        }, 1000);


    }, [])

    // กำหนดค่าต่าง ๆ ในการหมุนวงล้อ
    const generateRandomRotations = () => {
        const numRotations = 10000;
        // const weights = [0, 0, 0, 0, 0, 0.05, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        // const weights = [0, 0, 0, 0, 0, 0.1, 0, 0, 0.1, 0, 0.1, 0, 0, 0, 0, 0, 0, 0];
        const weights = [1, 1, 1, 0.1, 0.1, 0.1];


        const rng = seedrandom('yourSeed');
        const weightedRotations = weights.reduce((acc, weight, index) => {
            return acc.concat(Array.from({ length: Math.floor(numRotations * weight.length) }, () => rng() * 600000));
        }, []);

        const shuffledRotations = weightedRotations.sort(() => rng() - 0.5);

        setRotations(shuffledRotations);

    };


    const handleSpin = async () => {

        // fetch stock status = true
        fetch(`${import.meta.env.VITE_POCKETBASE_URL}api/collections/stock/records?filter=(status=true)`).then((response) => response.json())
            .then((data) => {
                const result = data.items;

                stock.push(result);
                console.log('stock : ', stock);


            }
            )
            .catch((error) => {
                console.error('Error fetching spin result:', error);
            });

        // console.log(stock);
        // ดึงค่าจาก stock มาแสดงเฉพาะที่เปิดใช้งานอยู่เท่านั้น


        setScore(sessionStorage.getItem('score'));
        console.log(typeof (score));

        // if (score < starPoint) {
        //     // alert('คะแนนของคุณไม่เพียงพอ');
        //     Swal.fire({
        //         title: "คะแนนของคุณไม่เพียงพอ",
        //         text: "กรุณาเก็บดาวหรือแลกคะแนนก่อน",
        //         icon: "warning"
        //     });
        //     return;
        // }





        if (score < starPoint) {
            // exit, can't spin
            // alert('คะแนนของคุณหมดแล้ว');
            Swal.fire({
                title: "คะแนนของคุณหมดแล้ว",
                text: "กรุณาเก็บดาวหรือแลกคะแนนก่อน",
                icon: "warning",
                footer: '<img src="https://dev.web.rmutsv.ac.th/assets/Logo500-KNQzDSng.png" alt="" width="100px" />'
            });

            setArrowVisible(false);
            return;
        } else {
            setScore((prevScore) => prevScore - starPoint);
            setSpinCouter((prevSpinCounter) => parseInt(prevSpinCounter) + 1);
            client.collection('register').update(sessionStorage.getItem('id'), {
                score: score - starPoint,
                spinCounter: parseInt(spinCounter) + 1,

            });

            // before spin check user get reward first before spin

            checkRewards(sessionStorage.getItem('phone'));
            // console.log('existingReward: ตรวจสอบการได้รางวัล', existingReward);
            // test set existingReward === true
            // setExistingReward(true);






            if (existingReward === true || existingReward === null) { // ไม่มีสิทธิลุ้นรางวัล ใช้ Array ของรางวัลที่ไม่มีรางวัล
                setArrowVisible(true);
                // setGetRewards(true);
                await fetch(`${import.meta.env.VITE_POCKETBASE_URL}api/collections/gamecontrol/records`)
                    .then((response) => response.json())
                    .then((data) => {
                        const result = data.items[1].stopposition;
                        const weights = [1, 3, 3, 0.1, 0.1, 0.1];
                        const nextRotation = result[Math.floor(Math.random() * weights.length)];
                        // find nextRotation in stock 
                        console.log('ไม่น่าจะได้รางวัล')
                        setRotation(0); // Reset rotation to start from the first position

                        const spinDuration = 3000; // Adjust the spinDuration based on your preferences

                        // Calculate the spinStep based on the duration and nextRotation
                        const spinStep = (nextRotation / spinDuration) * 25; // 16ms is 
                        const animateSpin = () => {
                            setRotation((prevRotation) => {
                                const newRotation = prevRotation + spinStep;

                                // Use the updated state (newRotation) in the condition
                                if (newRotation < nextRotation) {
                                    setTimeout(animateSpin, 16); // Schedule the next frame
                                } else {
                                    // Snap to the exact stop position

                                    setRotation(nextRotation);



                                    // Spin is complete
                                    setGetRewards((prevReward) => prevReward + nextRotation);
                                    setSpinCount((prevCount) => prevCount + 1);



                                }
                                // setSpinning(false);
                                return newRotation;
                            });
                        };

                        animateSpin();
                    })
                    .catch((error) => {
                        console.error('Error fetching spin result:', error);
                    });

                // Use nextRotation and update state accordingly


            } else {
                // console.log(existingReward);
                // Request spin result from the server
                await fetch(`${import.meta.env.VITE_POCKETBASE_URL}api/collections/gamecontrol/records`)
                    .then((response) => response.json())
                    .then((data) => {
                        const result = data.items[0].stopposition;
                        console.log(result)
                        const nextRotation = result[Math.floor(Math.random() * result.length)];
                        // find nextRotation in stock collection
                        console.log(nextRotation);

                        // setSpinning(false);



                        // Use nextRotation and update state accordingly
                        setRotation(0); // Reset rotation to start from the first position

                        const spinDuration = 3000; // Adjust the spinDuration based on your preferences

                        // Calculate the spinStep based on the duration and nextRotation
                        const spinStep = (nextRotation / spinDuration) * 25; // 16ms is approximately one frame
                        // const spinStep = spinDuration * 16;

                        // console.log(spinStep);
                        console.log('มีสิทธิ์ลุ้นรางวัล')

                        // test spinStep


                        //
                        const animateSpin = () => {
                            setRotation((prevRotation) => {
                                const newRotation = prevRotation + spinStep;

                                // Use the updated state (newRotation) in the condition
                                if (newRotation < nextRotation) {
                                    setTimeout(animateSpin, 16); // Schedule the next frame
                                } else {
                                    // Snap to the exact stop position
                                    // setSpinning(false);
                                    setRotation(nextRotation);

                                    // Spin is complete
                                    setGetRewards((prevReward) => prevReward + nextRotation);
                                    setSpinCount((prevCount) => prevCount + 1);

                                }

                                return newRotation;
                            });
                        };

                        animateSpin();

                        client.collection('stock').getFirstListItem(`stopposition=${nextRotation}`)
                            .then((res) => {
                                // console.log(res);
                                const stock = res.amount;
                                const stockId = res.id;
                                setStockId(stockId);



                                if (stock > 0) {

                                    client.collection('stock').update(res.id, {

                                        amount: stock - 1,
                                    });

                                    // client.collection('userRewards').create({
                                    //     userId: sessionStorage.getItem('id'),
                                    //     rewardId: stockId,
                                    //     phone: sessionStorage.getItem('phone'),
                                    //     fullname: sessionStorage.getItem('fullname'),
                                    // });

                                    console.log(res.type)


                                    if (res.type === 1) {
                                        setTimeout(() => {
                                            Swal.fire({
                                                title: "ยินดีด้วยคุณได้รับ",
                                                text: res.name,
                                                icon: "success",
                                                confirmButtonText: "ตกลง",
                                                html: `<img src="${import.meta.env.VITE_POCKETBASE_FILE_URL}${res.collectionId}/${res.id}/${res.image}" width="200px" />`,
                                            });
                                            const id = sessionStorage.getItem('id');
                                            // Open the modal

                                            setModalShow(true);

                                            // navigate(`/updateaddressreward/`);
                                        }, 5000);
                                        setSpinning(false);
                                        setExistingReward(true);

                                    }

                                }
                                else {
                                    // console.log('stock < 0');
                                    // update stock
                                    client.collection('stock').update(res.id, {
                                        amount: 0,
                                    });
                                }


                            })
                            .catch((err) => {
                                console.log(err);
                            });


                    })
                    .catch((error) => {
                        console.error('Error fetching spin result:', error);
                    });



            }

            // ************** check user get reward first before spin **************


        }




    };







    return (


        <>

            <div className={`${arrowVisible ? 'stoper' : 'd-none'}`} style={{ marginTop: '20px' }}></div>
            <div className="container-reward" style={{ transform: `rotate(${rotation}deg)` }}>
                <div className="one">
                    <img src={reward1} alt="" width={100} />
                </div>
                <div className="two">
                    <img src={boyCry} alt="" width={200} />
                </div>

                <div className="three">
                    <img src={reward2} alt="" width={70} />
                </div>
                <div className="four">
                    <img src={tryagain} alt="" width={150} />

                </div>
                <div className="five">
                    <img src={reward3} alt="" width={100} />
                </div>
                <div className="six">
                    <img src={boom} alt="" width={175} />

                </div>


            </div>


            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '30px' }}>

                <button id="spin" className="button-container-reward" onClick={handleSpin}>
                    {!spinning ? 'หมุนวงล้อ' : 'กำลังหมุน...'}

                </button>
            </div>
            {modalShow && <Modal
                show={modalShow}
                // onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <h5 className='text-center my-3'>กรุณากรอกที่อยู่เพื่อรับรางวัล</h5>
                <form onSubmit={handleSubmit} className='p-3'>
                    <div className="form-group">

                        <input
                            type="text"
                            className="form-control"
                            id="house"
                            placeholder="บ้านเลขที่"
                            value={house}
                            onChange={(e) => setHouse(e.target.value)}
                            required
                        />

                    </div>
                    <div className="form-group">

                        <input
                            type="text"
                            className="form-control"
                            id="road"
                            placeholder="ถนน"
                            value={road}
                            onChange={(e) => setRoad(e.target.value)}
                            required
                        />
                    </div>



                    <div className="form-group">
                        <select
                            className="form-control"
                            id="province"
                            value={province}
                            onChange={handleProvinceChange}
                            required
                            style={{ borderRadius: '50px', marginTop: '10px', fontSize: '21px' }}
                        >
                            <option value="">เลือกจังหวัด</option>
                            {provinces.map((province) => (
                                <option key={province.id} value={province.name_th}>
                                    {province.name_th}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <select
                            className="form-control"
                            id="amphure"
                            value={amphure}
                            onChange={handleAmphureChange}
                            required
                            disabled={!province}
                            style={{ borderRadius: '50px', marginTop: '10px', fontSize: '21px' }}
                        >
                            <option value="">เลือกอำเภอ</option>
                            {provinces
                                .find((p) => p.name_th === province)
                                ?.amphure.map((amphure) => (
                                    <option key={amphure.id} value={amphure.name_th}>
                                        {amphure.name_th}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <select
                            className="form-control "
                            id="tambon"
                            value={tambon}
                            onChange={handleTambonChange}
                            required
                            disabled={!amphure}
                            style={{ borderRadius: '50px', marginTop: '10px', fontSize: '21px' }}
                        >
                            <option value="">เลือกตำบล</option>
                            {provinces
                                .find((p) => p.name_th === province)
                                ?.amphure.find((a) => a.name_th === amphure)
                                ?.tambon.map((tambon) => (
                                    <option key={tambon.id} value={tambon.name_th}>
                                        {tambon.name_th}
                                    </option>
                                ))}
                        </select>
                    </div>


                    {/*  */}
                    <div className="form-group">

                        <input
                            type="text"
                            className="form-control"
                            id="zip_code"
                            placeholder="รหัสไปรษณีย์"
                            value={zip_code}
                            onChange={(e) => setZipCode(e.target.value)}
                            required
                            readOnly
                        />
                    </div>
                    <div className="form-group mt-2">
                        <input type="submit" value="ตกลง" className='btn btn-primary' />
                    </div>
                </form>

            </Modal>}



        </>

    );
};

export default Rewards;