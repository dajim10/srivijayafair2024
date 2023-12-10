import React, { useState, useEffect } from 'react'


const Logout = () => {

    useEffect(() => {
        sessionStorage.clear();
        window.location.href = '/';
    }
        , []);


    return (
        <div>

        </div>
    )
}

export default Logout