import React, { useState, useEffect } from 'react'
import { client } from '../lib/pocketbase'



const TrangFaculty = () => {
    // const [image, setImage] = useState('');
    const [data, setData] = useState([]);
    const [facultyData, setFacultyData] = useState([]);
    const imgUrl = import.meta.env.VITE_POCKETBASE_FILE_URL;
    const pocketbaseUrl = import.meta.env.VITE_POCKETBASE_URL;
    const facultyName = 'trang';
    const [collectionId, setCollectionId] = useState('');
    const [id, setId] = useState('');
    const [slideImage, setSlideImage] = useState([]);
    const [baseImageUrl, setBaseImageUrl] = useState('');


    useEffect(() => {

        // const fetchData = async () => {
        //     fetch('https://ars.rmutsv.ac.th/json').then(res => res.json()).then(res => {
        //         setFacultyData(res);
        //         console.log(res);
        //     }
        //     ).catch(err => {
        //         console.log(err);
        //     })

        // }
        // fetchData();


        client.collection('faculty').getList(1, 100, { expand: "campus" })
            .then(res => {
                setFacultyData(res.items);
                // if (res.items[].expand.campus.name === 'สงขลา') { // 1 is facultyId of Nakorn
                // console.log(res.items[0]);
                setData(res.items[0]);
                console.log(res.items[0]);
                setSlideImage(res.items[0].slideImage);
                setCollectionId(res.items[0].collectionId)
                setId(res.items[0].id)
                setBaseImageUrl()
                // }

            })
            .catch(err => {
                console.log(err);
            });
    }
        , []);


    return (


        <div className="container-fluid  p-2">
            {/* Create carousel for image slider */}
            <div className="row">
                <div className="row">

                </div>
                <div className="row">
                    <div className="col col-lg-6 col-md col-sm mx-auto">
                        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                {slideImage.map((slide, index) => (
                                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>

                                        <img src={imgUrl + collectionId + '/' + id + '/' + slide} className="d-block w-100" alt="..." />

                                    </div>
                                ))}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                                data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden"></span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                                data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden"></span>
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>



    )
}

export default TrangFaculty