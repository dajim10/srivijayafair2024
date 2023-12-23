import React, { useState, useEffect } from 'react';
import seedrandom from 'seedrandom';
import reward1 from '../assets/reward1.png';
import reward2 from '../assets/reward2.png';
import reward3 from '../assets/reward3.png';
import boyCry from '../assets/boyCry.png';
import boom from '../assets/boom.jpg';
import tryagain from '../assets/tryagain.jpg';
import { client } from '../lib/pocketbase';

const Rewards = () => {
    const [rotations, setRotations] = useState([]);
    const [currentRotationIndex, setCurrentRotationIndex] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [score, setScore] = useState(0);
    const [spinCount, setSpinCount] = useState(0);
    const [getRewards, setGetRewards] = useState(0);
    const [arrowVisible, setArrowVisible] = useState(false);
    const [userName, setUserName] = useState(sessionStorage.getItem('fullname') || 'เข้าสู่ระบบ');
    const phone = useState(sessionStorage.getItem('phone'));

    const [isLogin, setIsLogin] = useState(false);
    const [spinning, setSpinning] = useState(false);
    const [starPoint, setStarPoint] = useState(0);


    const existingReward = async () => {
        const existingRecord = await client.collection('userReward').getFirstListItem(`id="${userId}"`);
        try {
            if (existingRecord) {
                // console.log(existingRecord);
                console.log('Existing record found. Proceeding to updateMember...');
                setScore(existingRecord.score);
                setIsLogin(true);
            } else {
                console.log('No existing record found. Proceeding to createMember...');
            }
        } catch (err) {
            if (err.statusCode === 404) {
                // Handle the case where the document is not found
                console.log('Document not found. Proceeding to createMember...');
            }
        }
    };



    const fetchFirstRecord = async () => {
        const phone = sessionStorage.getItem('phone');
        try {
            const existingRecord = await client.collection('register').getFirstListItem(`phone="${phone}"`);

            if (existingRecord) {
                // console.log(existingRecord);
                setScore(existingRecord.score);
                setIsLogin(true);
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

    useEffect(() => {

        client.collection('statusgame').getList(1)
            .then(res => {

                setStarPoint(res.items[0].starPoint);


            })
            .catch(err => {
                console.log(err);
            });


    }, [])

    const generateRandomRotations = () => {
        const numRotations = 10000;
        // const weights = [0, 0, 0, 0, 0, 0.05, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const weights = [0, 0, 0, 0, 0, 0.1, 0, 0, 1, 0, 0.1, 0, 0, 0, 0, 0, 0, 0];


        const rng = seedrandom('yourSeed');
        const weightedRotations = weights.reduce((acc, weight, index) => {
            return acc.concat(Array.from({ length: Math.floor(numRotations * weight) }, () => rng() * 600000));
        }, []);

        const shuffledRotations = weightedRotations.sort(() => rng() - 0.5);

        setRotations(shuffledRotations);

    };


    const handleSpin = async () => {

        setSpinning(true);


        if (score <= 0) {
            // exit, can't spin
            alert('คะแนนของคุณหมดแล้ว');
            setArrowVisible(false);
            return;
        } else {
            existingReward();
            // Request spin result from the server
            await fetch('https://sathern.rmutsv.ac.th:8077/api/collections/gamecontrol/records')
                .then((response) => response.json())
                .then((data) => {
                    const result = data.items[0].stopposition;
                    const nextRotation = result[Math.floor(Math.random() * result.length)];
                    // find nextRotation in stock collection
                    client.collection('stock').getFirstListItem(`stopposition=${nextRotation}`)
                        .then((res) => {
                            console.log(res);
                            const stock = res.amount;
                            const stockId = res.id;
                            console.log(stock);
                            if (stock > 0) {
                                // console.log(stock);
                                // console.log('stock > 0');
                                // update stock
                                client.collection('stock').update(res.id, {

                                    amount: stock - 1,
                                });
                                client.collection('userRewards').create({
                                    userId: sessionStorage.getItem('id'),
                                    rewardId: stockId,
                                    phone: sessionStorage.getItem('phone'),


                                });
                            }
                            else {
                                // console.log('stock < 0');
                                // update stock
                                client.collection('stock').update(res.id, {
                                    amount: 0,
                                });
                            }

                            // if (res) {
                            //     // console.log(res);
                            //     const stock = res.stock;
                            //     console.log(stock);
                            //     if (stock > 0) {
                            //         // console.log(stock);
                            //         // console.log('stock > 0');
                            //         // update stock
                            //         client.collection('stock').update(res.id, {
                            //             stock: stock - 1,
                            //         });
                            //     } else {
                            //         // console.log('stock < 0');
                            //         // update stock
                            //         client.collection('stock').update(res.id, {
                            //             stock: 0,
                            //         });
                            //     }
                            // }
                        })
                        .catch((err) => {
                            console.log(err);
                        });

                    console.log(nextRotation);
                    setSpinning(false);



                    // Use nextRotation and update state accordingly
                    setRotation(0); // Reset rotation to start from the first position

                    const spinDuration = 3000; // Adjust the spinDuration based on your preferences

                    // Calculate the spinStep based on the duration and nextRotation
                    const spinStep = (nextRotation / spinDuration) * 25; // 16ms is approximately one frame
                    // const spinStep = spinDuration * 16;

                    // console.log(spinStep);


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
                                setSpinning(false);
                                setRotation(nextRotation);

                                // Spin is complete
                                setGetRewards((prevReward) => prevReward + nextRotation);
                                setSpinCount((prevCount) => prevCount + 1);
                            }

                            return newRotation;
                        });
                    };

                    animateSpin();
                })
                .catch((error) => {
                    console.error('Error fetching spin result:', error);
                });

            setArrowVisible(true);
            // setScore((prevScore) => prevScore - 100);
            const data = {
                score: score - starPoint,
            };
            const existingRecord = await client.collection('register').getFirstListItem(`phone="${sessionStorage.getItem('phone')}"`);

            if (existingRecord) {
                // console.log(existingRecord);
                const res = await client.collection('register').update(existingRecord.id, {
                    score: existingRecord.score - starPoint,

                });
                setScore((prevScore) => prevScore - starPoint)
                // console.log(res);

            }


        }




    };







    return (
        <>
            {/* {score <= 0 ? (


                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', height: '100vh' }}>
                    <div style={{ height: '250px', background: 'rgba(255,255,255,0.5)', padding: '1rem', borderRadius: '20px', boxShadow: '0 0 10px #ccc', backdropFilter: 'blur(5px)' }}>

                        <h2 className='button-85 text-center'>คะแนนของท่านหมดแล้ว</h2>
                        <p>สามารถร่วมสนุกได้ใหม่ โดยการเก็บคะแนนตามภาระกิจต่าง ๆ </p>
                    </div>
                </div>
            ) :
                ( */}
            <>

                <div className={`${arrowVisible ? 'stoper' : 'd-none'}`} style={{ marginTop: '20px' }}></div>
                <div className="container-reward" style={{ transform: `rotate(${rotation}deg)` }}>
                    <div className="one">
                        <img src={reward1} alt="" width={70} />
                    </div>
                    <div className="two">
                        <img src={boyCry} alt="" width={200} />
                    </div>

                    <div className="three">
                        <img src={reward2} alt="" width={80} />
                    </div>
                    <div className="four">
                        <img src={tryagain} alt="" width={150} />

                    </div>
                    <div className="five">
                        <img src={reward3} alt="" width={60} />
                    </div>
                    <div className="six">
                        <img src={boom} alt="" width={175} />

                    </div>

                    {/* <section
                        className={`spin-button ${spinning ? 'spinning' : ''}`}
                        onClick={handleSpin}
                    ></section> */}

                    {/* <section className="spin-button" onClick={handleSpin}></section> */}
                </div>


                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '30px' }}>

                    <button id="spin" className="button-container-reward" onClick={handleSpin}>
                        {!spinning ? 'หมุนวงล้อ' : 'กำลังหมุน...'}

                    </button>
                </div>

            </>
            {/* )} */}

        </>


    );
};

export default Rewards;