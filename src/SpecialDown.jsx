import React, { useState, useEffect, useRef } from 'react';
import Special from './Special';
import './index.css';
import Logo from './components/Logo';
import { usePageVisibility } from 'react-page-visibility';
import axios from 'axios';
import { client } from './lib/pocketbase';

const SpecialDown = () => {
    const [score, setScore] = useState(0);
    const [special, setSpecial] = useState([]);
    const [isSpecialPaused, setIsSpecialPaused] = useState(true);
    const [countdown, setCountdown] = useState(30); // 1 minute in seconds
    // const [user, setUser] = useState('admin');
    const [starPoint, setStarPoint] = useState(0);
    const isPageVisible = usePageVisibility();
    const specialIntervalRef = useRef(null);
    //const gameDuration = 0.5 * 60 * 1000; // Set game duration to 5 minutes
    const maxStars = 3; // Set your desired maximum number of stars


    useEffect(() => {
        setInterval(() => {
            client.collection('statusgame').getList(1)
                .then(res => {
                    // setIsSpecialPause(res.data.isGamePaused);
                    setIsSpecialPaused(res.items[0].isSpecialPaused);
                    setStarPoint(res.items[0].starPoint);
                    // console.log(res.items[0].isGamePaused);
                    // const mainContent = document.getElementById('mainContent');

                })
                .catch(err => {
                    console.log(err);
                });
        }, 1000);
    }
        , [isSpecialPaused, usePageVisibility]);


    // useEffect(() => {
    //     setInterval(() => {
    //         axios.get('http://localhost:3000/api/statusgame')
    //             .then(res => {
    //                 setIsGamePaused(res.data.isGamePaused);
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             });

    //         setCountdown(prevCountdown => {
    //             if (prevCountdown > 0) {
    //                 return prevCountdown - 1;
    //             } else {
    //                 clearInterval(specialIntervalRef.current);
    //                 return 0;
    //             }
    //         });
    //     }, 1000);



    // }, []);

    useEffect(() => {


        const generateStar = () => {
            if (!isSpecialPaused && isPageVisible) {

                const newStar = {
                    id: Date.now(),
                    x: Math.floor(Math.random() * window.innerWidth),
                    y: 0,
                    speed: 3.5,
                    // speed: Math.random() * 15 + 2,

                };


                setSpecial(prevStars => {
                    const updatedStars = [...prevStars, newStar].slice(-maxStars);
                    // console.log(updatedStars); // test log to see the stars array
                    return updatedStars;
                });
            } else {
                clearInterval(specialIntervalRef.current);
            }
        };

        specialIntervalRef.current = setInterval(generateStar, 1000);

    }, [isSpecialPaused, isPageVisible]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                // Handle when the page is not visible
                clearInterval(specialIntervalRef.current);
                setSpecial([]); // Clear the existing stars
            } else {
                // Handle when the page becomes visible
                // Restart the stars interval or perform other actions
                // starsIntervalRef.current = setInterval(generateStar(), 1000);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };

    }, []);




    useEffect(() => {
        const moveStars = () => {
            setSpecial(prevStars =>
                prevStars.map(star => ({
                    ...star,
                    y: star.y + star.speed,
                }))
            );
        };

        const animationId = requestAnimationFrame(moveStars);

        return () => cancelAnimationFrame(animationId);
    }, [special]);

    const handleStarClick = async (id) => {
        setScore(prevScore => prevScore + 1);

        const existingRecord = await client.collection('register').getFirstListItem(`phone="${sessionStorage.getItem('phone')}"`);

        if (existingRecord) {
            // console.log(existingRecord);
            const res = await client.collection('register').update(existingRecord.id, {
                score: existingRecord.score + 10,
            });
            // console.log(res);
            setScore(existingRecord.score + 10);
        }

        setSpecial(prevStars => prevStars.filter(special => special.id !== id));

    };

    return (
        <>
            <div className="" style={{ width: '15px !important' }}>
                <div>
                    <div className='d-flex justify-content-end'>
                        {/* Interactive part */}

                    </div>
                    {/* Non-interactive part */}
                    {/* <div className="countdown" style={{ pointerEvents: 'none' }}>
                        Time Remaining: {countdown} seconds
                    </div> */}
                </div>
                {/* <div className="score" style={{ right: '10px', bottom: '20px', zIndex: '9999' }}>Score: {score}</div> */}

                {special.map(item => (
                    <Special
                        key={item.id}
                        x={item.x}
                        y={item.y}
                        onClick={() => handleStarClick(item.id)}
                    // style={{ pointerEvents: isGamePaused ? 'none' : 'auto' }}
                    // style={`${star.y > 800 ? 'd-none' : 'auto'}`}
                    // className={`${star.y > 800 ? 'd-none' : 'auto'}`}
                    // style={{ overFlow : star.y > 800 ? 'none' : 'auto' }}

                    />
                ))}
            </div>
            {/* <Logo /> */}
        </>
    );
};

export default SpecialDown;
