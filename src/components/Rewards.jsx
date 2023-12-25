import React, { useState, useEffect } from 'react';
import seedrandom from 'seedrandom';
import reward1 from '../assets/reward1.png';
import reward2 from '../assets/reward2.png';
import reward3 from '../assets/reward3.png';
import boyCry from '../assets/boyCry.png';
import boom from '../assets/boom.jpg';
import tryagain from '../assets/tryagain.jpg';
import { client } from '../lib/pocketbase'
import PocketBase from 'pocketbase';




const Rewards = () => {
    const [rotations, setRotations] = useState([]);
    const [currentRotationIndex, setCurrentRotationIndex] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [score, setScore] = useState(0);
    const [spinCount, setSpinCount] = useState(0);
    const [getRewards, setGetRewards] = useState(0);
    const [arrowVisible, setArrowVisible] = useState(true);
    const [userName, setUserName] = useState(sessionStorage.getItem('fullname') || 'เข้าสู่ระบบ');
    const phone = useState(sessionStorage.getItem('phone'));
    // const userId = useState(sessionStorage.getItem('id'));

    const [isLogin, setIsLogin] = useState(false);
    const [spinning, setSpinning] = useState(false);
    const [starPoint, setStarPoint] = useState(0);
    const [existingReward, setExistingReward] = useState(true);


    const checkRewards = async () => {
        const phone = sessionStorage.getItem('phone');

        await fetch(`https://sathern.rmutsv.ac.th:8077/api/collections/userRewards/records?filter=phone='${phone}'`).then((res) => res.json())
            .then((data) => {
                console.log(data.items);
                if (data.items.length > 0) {
                    console.log(data)
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






    const fetchFirstRecord = async () => {
        const phone = sessionStorage.getItem('phone');
        try {
            const existingRecord = await client.collection('register').getFirstListItem(`phone="${phone}"`);


            if (existingRecord) {
                // console.log('user=>   ', existingRecord);
                setScore(existingRecord.score);
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
        // const weights = [0, 0, 0, 0, 0, 0.1, 0, 0, 0.1, 0, 0.1, 0, 0, 0, 0, 0, 0, 0];
        const weights = [1, 5, 9, 0.1, 0.3, 0.1];


        const rng = seedrandom('yourSeed');
        const weightedRotations = weights.reduce((acc, weight, index) => {
            return acc.concat(Array.from({ length: Math.floor(numRotations * weight) }, () => rng() * 600000));
        }, []);

        const shuffledRotations = weightedRotations.sort(() => rng() - 0.5);

        setRotations(shuffledRotations);

    };


    const handleSpin = async () => {

        // setSpinning(true);


        if (score <= 0) {
            // exit, can't spin
            alert('คะแนนของคุณหมดแล้ว');
            // setArrowVisible(false);
            return;
        } else {

            // before spin check user get reward first before spin

            checkRewards(sessionStorage.getItem('phone'));
            console.log('existingReward: ตรวจสอบการได้รางวัล', existingReward);
            // test set existingReward === true
            // setExistingReward(true);

            if (existingReward === true || existingReward === null) {
                // setArrowVisible(true);
                // setGetRewards(0);
                await fetch('https://sathern.rmutsv.ac.th:8077/api/collections/gamecontrol/records')
                    .then((response) => response.json())
                    .then((data) => {
                        const result = data.items[1].stopposition;
                        const weights = [1, 5, 9, 0.1, 0.3, 0.1];
                        const nextRotation = result[Math.floor(Math.random() * result.length)];
                        // find nextRotation in stock 
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
                    })
                    .catch((error) => {
                        console.error('Error fetching spin result:', error);
                    });

                // Use nextRotation and update state accordingly


            } else {
                console.log(existingReward);
                // Request spin result from the server
                await fetch('https://sathern.rmutsv.ac.th:8077/api/collections/gamecontrol/records')
                    .then((response) => response.json())
                    .then((data) => {
                        const result = data.items[0].stopposition;
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
                                // console.log(stock);
                                if (stock > 0) {

                                    client.collection('stock').update(res.id, {

                                        amount: stock - 1,
                                    });
                                    client.collection('userRewards').create({
                                        userId: sessionStorage.getItem('id'),
                                        rewardId: stockId,
                                        phone: sessionStorage.getItem('phone'),
                                        fullname: sessionStorage.getItem('fullname'),


                                    });
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

                // setArrowVisible(true);
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

            // ************** check user get reward first before spin **************


        }




    };







    return (


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

    );
};

export default Rewards;