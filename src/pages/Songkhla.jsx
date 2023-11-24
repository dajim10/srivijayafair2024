import React from 'react';
import Map from '../components/Map'
import image from '../assets/SongkhlaMap.png'


function Songkhla() {
    // const image = '../assets/SongkhlaMap.png'; // Replace with the path to your image
    const bounds = [[0, 0], [100, 100]]; // Adjust the bounds based on your image
    const markers = [
        { position: [50, 50], popupText: 'คณะสถาปัตยกรรม', link: 'architecture' },
        { position: [80, 90], popupText: 'คณะวิศวะ', link: 'engineering' },
        { position: [40, 20], popupText: 'คณะบริหารธุรกิจ', link: 'bbc' },
        { position: [70, 20], popupText: 'คณะครุศาสตร์อุตสาหกรรม', link: 'inded' }
        // Add more markers as needed
    ];

    return (
        <div className="App">
            <h1 className='text-center'>วิทยาเขตสงขลา</h1>
            <Map image={image} bounds={bounds} markers={markers} />
        </div>
    );
}

export default Songkhla;
