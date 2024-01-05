import React, { useState, useEffect } from 'react'

import { client } from '../lib/pocketbase';


const Gauge = () => {
    const [userLogin, setUserLogin] = useState(false)

    useEffect(() => {

    }
        , []);

    return (
        <div className='text-center d-flex flex-column justify-content-center '>
            <h2 style={{ backgroundColor: '#cccffc', margin: '10px auto', padding: '0.5rem 1rem 0.5rem 1rem', border: '5px solid #fff', borderRadius: '20px' }}>แบบประเมินความพึงพอใจ</h2>
            <div className='d-flex justify-content-center'>
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfMuL_rLNEu02lLUSZ_mdWwwyjtBX3f13u-XgWQYFvWPbB48w/viewform" width="640" height="900" frameborder="0" marginheight="0" marginwidth="0" className='iframe360'>กำลังโหลด…</iframe>
            </div>

        </div>
    )
}

export default Gauge