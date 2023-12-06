import React, { useState, useEffect } from 'react';
import './game.css';

// const symbols = ['🍒', '🍊', '🍇', '🍋', '🍉'];

import img1 from '../assets/reward1.png';
import img2 from '../assets/reward2.png';
import img3 from '../assets/reward3.png';

const symbols = [img1, img2, img3];

const getRandomSymbol = () => symbols[Math.floor(Math.random() * symbols.length)];

const SlotMachine = () => {
    const [symbolsArray, setSymbolsArray] = useState([getRandomSymbol(), getRandomSymbol(), getRandomSymbol()]);

    const spin = () => {
        const newSymbolsArray = symbolsArray.map(() => getRandomSymbol());
        setSymbolsArray(newSymbolsArray);
    };

    useEffect(() => {
        let animationDuration = 2000; // Initial duration, in milliseconds
        const intervalId = setInterval(() => {
            spin();
        }, 200);

        // Stop spinning after 2 seconds (adjust as needed)
        setTimeout(() => {
            clearInterval(intervalId);
        }, animationDuration);

        // Adjust the animation duration dynamically
        const animationAdjustmentInterval = setInterval(() => {
            animationDuration -= 200; // Decrease duration by 200 milliseconds per interval
            document.styleSheets[0].insertRule(`@keyframes spin { from { transform: translateY(0); } to { transform: translateY(-240px); } }`, 0);
            document.styleSheets[0].deleteRule(1); // Delete the old keyframes rule

            if (animationDuration <= 0) {
                clearInterval(animationAdjustmentInterval);
            }
        }, 200);

        // Clean up the intervals on component unmount
        return () => {
            clearInterval(intervalId);
            clearInterval(animationAdjustmentInterval);
        };
    }, []);

    return (
        <div>
            <div className="slot-machine">
                {symbolsArray.map((symbol, index) => (
                    <div key={index} className="slot">
                        <div className="symbol"><img src={symbol} className='img-fluid' alt="" /></div>
                    </div>
                ))}
            </div>
            <button onClick={spin}>Spin</button>
        </div>
    );
};

export default SlotMachine;
