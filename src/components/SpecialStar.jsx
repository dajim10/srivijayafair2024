import React, { useState, useEffect } from 'react'
import { client } from '../lib/pocketbase';

const SpecialStar = () => {

    const [isSpechialStar, setIsSpecialStar] = useState(null);

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

        </div>
    )
}

export default SpecialStar