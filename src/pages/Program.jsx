import React, { useState, useEffect } from 'react'
import { client } from '../lib/pocketbase'
import { useNavigate } from 'react-router-dom'
import { getCounter } from '../lib/getCounter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Carousel } from 'react-bootstrap'

const Program = ({ facultyData }) => {

    const navigate = useNavigate();
    console.log(facultyData)


    return (
        <div>

        </div>




    )
}

export default Program