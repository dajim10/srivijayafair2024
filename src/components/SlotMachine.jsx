import React, { useState, useEffect } from 'react';
import img1 from '../assets/reward1.png';
import img2 from '../assets/reward2.png';
import img3 from '../assets/reward3.png';

const images = [img1, img2, img3];
// const images = ['🍒', '🍊', '🍇', '🍋', '🍉'];

const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
};

const SlotMachine = () => {
    const [spin, setSpin] = useState(false);
    const [result, setResult] = useState(Array.from({ length: 3 }, () => getRandomImage()));

    useEffect(() => {
        let timeout1, timeout2, timeout3;

        const spinReel = (reelIndex, iterations) => {
            if (iterations > 0) {
                setResult((prevResult) => {
                    const newResult = [...prevResult];
                    newResult[reelIndex] = getRandomImage();
                    return newResult;
                });

                timeout1 = setTimeout(() => spinReel(reelIndex, iterations - 1), 50); // Decreased timeout duration
            } else {
                clearTimeout(timeout1);
                // Enable the button after the spinning animation is complete
                setSpin(false);
            }
        };

        if (spin) {
            // Spin each reel with a delay between them
            timeout1 = setTimeout(() => spinReel(0, 50), 0); // Increased iterations
            timeout2 = setTimeout(() => spinReel(1, 50), 200); // Increased iterations
            timeout3 = setTimeout(() => spinReel(2, 50), 400); // Increased iterations
        }

        // Clear timeouts on component unmount or spin reset
        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            clearTimeout(timeout3);
        };
    }, [spin]);

    const handleSpinClick = () => {
        if (!spin) {
            // Disable the button before starting the spinning animation
            setSpin(true);
        }
    };

    return (
        <div className="sticky-top">

            <div className='text-center'>
                <div className="slot-machine">
                    {result.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Image ${index}`}
                            style={{ width: '200px', height: '200px', margin: '5px' }}
                        />
                    ))}
                </div>
                <div className="container d-flex align-items-center text-center justify-content-center">
                    <button onClick={handleSpinClick} disabled={spin} className='btn btn-danger rounded-pill shadow' style={{ borderWidth: '5px solid #000' }}>
                        {spin ? 'Spinning...' : 'Spin'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SlotMachine;


// import React, { useState, useEffect } from 'react';
// import img1 from '../assets/reward1.png';
// import img2 from '../assets/reward2.png';
// import img3 from '../assets/reward3.png';

// const images = [img1, img2, img3];

// const getRandomImage = () => {
//     const randomIndex = Math.floor(Math.random() * images.length);
//     return images[randomIndex];
// };

// const SlotMachine = () => {
//     const [spin, setSpin] = useState(false);
//     const [result, setResult] = useState(Array.from({ length: 3 }, () => getRandomImage()));

//     useEffect(() => {
//         let timeout1, timeout2, timeout3;

//         const spinReel = (reelIndex, iterations) => {
//             if (iterations > 0) {
//                 setResult((prevResult) => {
//                     const newResult = [...prevResult];
//                     newResult[reelIndex] = getRandomImage();
//                     return newResult;
//                 });

//                 timeout1 = setTimeout(() => spinReel(reelIndex, iterations - 1), 100);
//             } else {
//                 clearTimeout(timeout1);
//             }
//         };

//         if (spin) {
//             // Spin each reel with a delay between them
//             timeout1 = setTimeout(() => spinReel(0, 20), 0);
//             timeout2 = setTimeout(() => spinReel(1, 20), 200);
//             timeout3 = setTimeout(() => spinReel(2, 20), 400);

//             // Stop the spinning after a certain duration
//             setTimeout(() => {
//                 clearTimeout(timeout1);
//                 clearTimeout(timeout2);
//                 clearTimeout(timeout3);
//                 setSpin(false);
//             }, 3000); // Adjust the duration as needed
//         }

//         // Clear timeouts on component unmount or spin reset
//         return () => {
//             clearTimeout(timeout1);
//             clearTimeout(timeout2);
//             clearTimeout(timeout3);
//         };
//     }, [spin]);

//     const handleSpinClick = () => {
//         setSpin(true);
//     };

//     return (
//         <div className='text-center'>
//             <div className="slot-machine">
//                 {result.map((image, index) => (
//                     <img
//                         key={index}
//                         src={image}
//                         alt={`Image ${index}`}
//                         style={{ width: '250px', height: '250px', margin: '5px' }}
//                     />
//                 ))}
//             </div>
//             <div className="container d-flex align-items-center text-center justify-content-center">
//                 <button onClick={handleSpinClick} disabled={spin} className='btn btn-danger rounded-pill shadow'>
//                     {spin ? 'Spinning...' : 'Spin'}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default SlotMachine;


