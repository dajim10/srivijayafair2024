import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { client } from '../lib/pocketbase';

const NakornFaculty = () => {



    const [branchData, setBranchData] = useState([]);

    // useEffect(() => {

    //         client.collection('statusgame').getList(1)
    //             .then(res => {
    //                 // setIsGamePaused(res.data.isGamePaused);
    //                 setIsGamePaused(res.items[0].isGamePaused);
    //                 console.log(res.items[0].isGamePaused);
    //                 // const mainContent = document.getElementById('mainContent');

    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             });
    // }
    //     , []);

    const branch = [
        {
            name: 'nakorn',
            branch: [

                { popupText: 'คณะเทคโนโลยีการจัดการ', link: '' },
                { popupText: 'คณะสัตวแพทยศาสตร์', link: '' },
                { popupText: 'วิทยาลัยรัตภูมิ', link: '' },
                { popupText: 'คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี', link: '' },


            ]
        },

    ];

    return (
        <div className="container mt-3 p-5">
            {/* Create carousel for each branch */}
            {branch.map((faculty, index) => (
                <Carousel indicators={false} key={index} interval={null} prevLabel="" nextLabel="" className="custom-carousel">

                    {faculty.branch.map((item, itemIndex) => (
                        <Carousel.Item key={itemIndex}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 mx-auto">
                                        <Link to={item.link} style={{ textDecoration: 'none' }}>
                                            <div className="card mb-3">
                                                <div className="card-body d-flex align-items-center justify-content-center" style={{ height: '150px' }}>
                                                    {/* Your card content here */}
                                                    <h5 className="card-title text-center">{item.popupText}</h5>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </Carousel.Item>

                    ))}

                </Carousel>
            ))}



        </div>
    )
}

export default NakornFaculty;