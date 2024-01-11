import React, { useState, useEffect } from 'react'
import { client } from '../lib/pocketbase';
import star from '../assets/star.png';

const SpecialStar = () => {

    const [isSpechialStar, setIsSpecialStar] = useState(null);
    // isSpecialStar
    useEffect(() => {
        setInterval(() => {
            client.collection('statusgame').getList(1)
                .then(res => {
                    // setIsGamePaused(res.data.isGamePaused);
                    setIsSpecialStar(res.items[0].isSpecialStar);
                    console.log(res.items[0].isSpecialStar);
                    // const mainContent = document.getElementById('mainContent');

                })
                .catch(err => {
                    console.log(err);
                });
        }
            , 1000);

    }
        , []);


    return (
        <div>
            {/* implement special star falling down at time */}
            {isSpecialStar ? <img src={star} alt="star" className="star" /> : null}

        </div>
    )
}

export default SpecialStar