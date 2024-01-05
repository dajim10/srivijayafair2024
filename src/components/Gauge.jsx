import React, { useState, useEffect } from 'react'

import { client } from '../lib/pocketbase';


const Gauge = () => {
    const [userLogin, setUserLogin] = useState(false)

    useEffect(() => {

    }
        , []);

    return (
        <div className='text-center '>
            <h2>แบบประเมินความพึงพอใจ</h2>

        </div>
    )
}

export default Gauge