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
                { popupText: 'คณะเกษตรศาสตร์', link: '', mainImage: '', details: '', leftImage: '', rightImage: '' },
                { popupText: 'คณะวิทยาศาสตร์และเทคโนโลยี', link: '', mainImage: '', details: '', leftImage: '', rightImage: '' },
                { popupText: 'คณะศิลปศาสตร์', link: '', mainImage: '', details: '', leftImage: '', rightImage: '' },
                { popupText: 'คณะวิศวกรรมศาสตร์', link: '', mainImage: '', details: '', leftImage: '', rightImage: '' },
                { popupText: 'คณะบริหารธุรกิจ', link: '', mainImage: '', details: '', leftImage: '', rightImage: '' },
                { popupText: 'คณะวิทยาศาสตร์และเทคโนโลยีการประมง', link: '', mainImage: '', details: '', leftImage: '', rightImage: '' },
                { popupText: 'คณะอุตสาหกรรมเกษตร', link: '', mainImage: '', details: '', leftImage: '', rightImage: '' },
                { popupText: 'คณะครุศาสตร์อุตสาหกรรม', link: 'https://www.youtube.com/embed/QmpIu83Q02c?si=bAb5MYWQSyj4PDkr', mainImage: 'https://apptree.sgp1.digitaloceanspaces.com/open-house/backend/59fb2cdc64555ae77e38d36be63868e3.jpg', details: '', leftImage: 'https://apptree.sgp1.digitaloceanspaces.com/open-house/backend/8dcc5ea02196cfea40ab182edd8a4946.jpg', rightImage: 'https://apptree.sgp1.digitaloceanspaces.com/open-house/backend/f98918b685e0b8eae627d75cd48a3f20.jpg' },
                { popupText: 'วิทยาลัยการโรงแรมและการท่องเที่ยว', link: '', mainImage: '', details: '', leftImage: '', rightImage: '' },
                { popupText: 'วิทยาลัยเทคโนโลยีอุตสาหกรรมและการจัดการ', link: '', mainImage: '', details: '', leftImage: '', rightImage: '' },
                { popupText: 'คณะสถาปัตยกรรมศาสตร์', link: '', mainImage: '', details: '', leftImage: '', rightImage: '' },
                { popupText: 'คณะเทคโนโลยีการจัดการ', link: '', mainImage: '', details: '', leftImage: '', rightImage: '' },
                { popupText: 'คณะสัตวแพทยศาสตร์', link: '', mainImage: '', details: '', leftImage: '', rightImage: '' },
                { popupText: 'วิทยาลัยรัตภูมิ', link: '', mainImage: '', details: '', leftImage: '', rightImage: '' },
                { popupText: 'คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี', link: '', mainImage: '', details: '', leftImage: '', rightImage: '' },


            ]
        },

    ];

    return (
        <div className="container-fluid  p-2">
            {/* Create carousel for each branch */}
            {branch.map((faculty, index) => (
                <Carousel indicators={false} key={index} interval={null} prevLabel="" nextLabel="" className="custom-carousel">

                    {faculty.branch.map((item, itemIndex) => (
                        <Carousel.Item key={itemIndex}>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 mx-auto">
                                        <Branch key={itemIndex} id={item.popupText} text={item.popupText} mainImage={item.mainImage} details={item.details} leftImage={item.leftImage} rightImage={item.rightImage} link={item.link} />
                                    </div>
                                </div>
                            </div>

                        </Carousel.Item>

                    ))}


                </Carousel>
            ))}
            {/* {branch.map((faculty, index) => (
                <div key={index}>
                    {faculty.branch.map((item, itemIndex) => (
                        <Branch key={itemIndex} id={item.popupText} text={item.popupText} />

                    ))}
                </div>
            ))} */}
            {/* <Branch id="test" /> */}


        </div>
    )
}

export default SongkhlaFaculty