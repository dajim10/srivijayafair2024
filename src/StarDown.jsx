import React, { useState, useEffect, useRef } from 'react';
import Star from './Star';
import './index.css';
import Logo from './components/Logo';
import { usePageVisibility } from 'react-page-visibility';
import axios from 'axios';
import { client } from './lib/pocketbase';

const StarDown = () => {
    const [score, setScore] = useState(0);
    const [stars, setStars] = useState([]);
    const [isGamePaused, setIsGamePaused] = useState(true);
    const [countdown, setCountdown] = useState(30); // 1 minute in seconds
    // const [user, setUser] = useState('admin');
    const [starPoint, setStarPoint] = useState(0);
    const isPageVisible = usePageVisibility();
    const starsIntervalRef = useRef(null);
    //const gameDuration = 0.5 * 60 * 1000; // Set game duration to 5 minutes
    const maxStars = 4; // Set your desired maximum number of stars


    useEffect(() => {
        setInterval(() => {
            client.collection('statusgame').getList(1)
                .then(res => {
                    // setIsGamePaused(res.data.isGamePaused);
                    setIsGamePaused(res.items[0].isGamePaused);
                    setStarPoint(res.items[0].starPoint);
                    // console.log(res.items[0].isGamePaused);
                    // const mainContent = document.getElementById('mainContent');

                })
                .catch(err => {
                    console.log(err);
                });
        }, 3000);
    }
        , [isGamePaused, usePageVisibility]);


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
    //                 clearInterval(starsIntervalRef.current);
    //                 return 0;
    //             }
    //         });
    //     }, 1000);



    // }, []);


    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                // Handle when the page is not visible
                clearInterval(starsIntervalRef.current);
                setStars([]); // Clear the existing stars
            } else {
                // Handle when the page becomes visible
                // Restart the stars interval or perform other actions
                starsIntervalRef.current = setInterval(generateStar, 1000);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };

    }, []);


    useEffect(() => {


        const generateStar = () => {
            if (!isGamePaused && isPageVisible) {

                const newStar = {
                    id: Date.now(),
                    x: Math.floor(Math.random() * window.innerWidth),
                    y: 0,
                    speed: Math.random() * 5 + 2,
                };

                setStars(prevStars => {
                    const updatedStars = [...prevStars, newStar].slice(-maxStars);
                    // console.log(updatedStars); // test log to see the stars array
                    return updatedStars;
                });
            } else {
                clearInterval(starsIntervalRef.current);
            }
        };

        starsIntervalRef.current = setInterval(generateStar, 1000);

    }, [isGamePaused, isPageVisible]);

    useEffect(() => {
        const moveStars = () => {
            setStars(prevStars =>
                prevStars.map(star => ({
                    ...star,
                    y: star.y + star.speed,
                }))
            );
        };

        const animationId = requestAnimationFrame(moveStars);

        return () => cancelAnimationFrame(animationId);
    }, [stars]);

    const handleStarClick = async (id) => {
        setScore(prevScore => prevScore + 1);

        const existingRecord = await client.collection('register').getFirstListItem(`phone="${sessionStorage.getItem('phone')}"`);

        if (existingRecord) {
            // console.log(existingRecord);
            const res = await client.collection('register').update(existingRecord.id, {
                score: existingRecord.score + 1,
            });
            // console.log(res);
            setScore(existingRecord.score + 1);
        }

        setStars(prevStars => prevStars.filter(star => star.id !== id));

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

                {stars.map(star => (
                    <Star
                        key={star.id}
                        x={star.x}
                        y={star.y}
                        onClick={() => handleStarClick(star.id)}
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

export default StarDown;
