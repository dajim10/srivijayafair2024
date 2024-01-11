import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './index.css'; // Make sure to import your existing CSS file
import StarLogo from './assets/star1.png'


const Star = ({ x, y, onClick }) => {
    const containerStyle = {
        top: `${y}px`,
        left: `${x}px`,
        display: 'inline-block',
        cursor: 'pointer',
    };

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const interval = setInterval(() => {
            setScreenWidth(window.innerWidth);
            // console.log(window.innerWidth);
        }, 1000);
        return () => clearInterval(interval);
    }, []);



    return (
        <div className="star-container" style={containerStyle} onClick={onClick}>
            <div className="star">
                <img src={StarLogo} alt="star"
                    style={{
                        width: `${screenWidth < 600 ? '50px' : '100px'}`,
                        height: `${screenWidth < 600 ? '50px' : '100px'}`
                    }}
                />
            </div>
        </div>
    );
};

export default Star;
