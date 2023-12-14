import React, { useState, useEffect } from 'react'

const index = () => {
    const [image, setImage] = useState('')

    useEffect(() => {
        setImage('https://sathern.rmutsv.ac.th:8077/api/files/specialstar/gzmj7o982521tzg/box_50_dGYs0djkYb.png');

    }
        , [])

    return (
        <div className='row'>
            <div className="col col-lg text-center">
                <img src={image} alt="box" />
            </div>
        </div>
    )
}

export default index