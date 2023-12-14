import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { client } from '../lib/pocketbase';
import Branch from './branch/index.jsx';


const SongkhlaFaculty = () => {



    const [branchID, setBranchID] = useState('15');

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
            name: 'Songkhla',
            branch: [
                { popupText: 'คณะเกษตรศาสตร์', link: '' },
                { popupText: 'คณะวิทยาศาสตร์และเทคโนโลยี', link: '' },
                { popupText: 'คณะศิลปศาสตร์', link: '', background: '' },
                { popupText: 'คณะวิศวกรรมศาสตร์', link: '' },
                { popupText: 'คณะบริหารธุรกิจ', link: '' },
                { popupText: 'คณะวิทยาศาสตร์และเทคโนโลยีการประมง', link: '' },
                { popupText: 'คณะอุตสาหกรรมเกษตร', link: '' },
                { popupText: 'คณะครุศาสตร์อุตสาหกรรม', link: '/inded' },
                { popupText: 'วิทยาลัยการโรงแรมและการท่องเที่ยว', link: '' },
                { popupText: 'วิทยาลัยเทคโนโลยีอุตสาหกรรมและการจัดการ', link: '' },
                { popupText: 'คณะสถาปัตยกรรมศาสตร์', link: '' },
                { popupText: 'คณะเทคโนโลยีการจัดการ', link: '' },
                { popupText: 'คณะสัตวแพทยศาสตร์', link: '' },
                { popupText: 'วิทยาลัยรัตภูมิ', link: '' },
                { popupText: 'คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี', link: '' },


            ]
        },

    ];

    return (
        <div className="container  p-2">
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

            <Branch id="test" />


        </div>
    )
}

export default SongkhlaFaculty