import React from 'react';
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

    return (
        <div className="star-container" style={containerStyle} onClick={onClick}>
            <div className="star">
                <img src={StarLogo} alt="star" width={50} />
            </div>
        </div>
    );
};

export default Star;
