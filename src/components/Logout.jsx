import React, { useState, useEffect } from 'react'

const Logout = () => {

    useEffect(() => {
        localStorage.clear();
        window.location.href = '/';
    }
        , []);


    return (
        <div>

        </div>
    )
}

export default Logout