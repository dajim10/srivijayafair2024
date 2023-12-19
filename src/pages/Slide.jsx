import React, { useState } from 'react';
import { Carousel, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Program from './Program';



const Slide = ({ facultyData }) => {
    const imageUrl = import.meta.env.VITE_POCKETBASE_FILE_URL;
    const [image, setImage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setActiveIndex(selectedIndex);
    };

    const handleSubmit = () => {
        const registerId = sessionStorage.getItem('id');
        console.log(registerId);

        if (registerId) {
            window.location.href = `https://admission.rmutsv.ac.th/check.php?id=${registerId}`;
        }
        else {
            alert('กรุณาเข้าสู่ระบบก่อน');
        }
    }


    const handleDotClick = (index) => {
        setActiveIndex(index);
    };

    const handleShow = (imageUrl) => {
        setImage(imageUrl);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <div style={{ padding: '2px', margin: '20px', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '20px', backdropFilter: 'blur(5px)' }}>

            <Carousel className='mt-3 ' autoPlay={false} interval={null} controls={true} indicators={false} >
                {facultyData.map((item, index) => (
                    <Carousel.Item key={index}>
                        <div className=" text-center justify-content-center align-items-center">
                            <div className='p-2 button-85 mt-3 rounded-4 shadow-lg w-50 mx-auto'>
                                <h5>{item.facultyName}</h5>
                            </div>
                            <br />
                            <div className=" text-center  d-flex justify-content-between align-items-center">
                                <div className='col-3 p-3'>
                                    <img
                                        src={`${imageUrl}${item.collectionId}/${item.id}/${item.leftImage}`}
                                        className='img-fluid'
                                        onClick={() => handleShow(`${imageUrl}${item.collectionId}/${item.id}/${item.leftImage}`)}

                                    />
                                </div>
                                <div className='col-6'>
                                    <iframe src={item.youtubeLink} className='iframeFac'></iframe>
                                </div>
                                <div className='col-3 p-3'>
                                    <img
                                        src={`${imageUrl}${item.collectionId}/${item.id}/${item.rightImage}`}
                                        className='img-fluid leftImage'
                                        onClick={() => handleShow(`${imageUrl}${item.collectionId}/${item.id}/${item.rightImage}`)}

                                    />
                                </div>
                            </div>

                        </div>
                        <div className="text-center d-flex justify-content-between align-items-center">


                            {/* using multiple item in one slide */}
                            <div className="container p-3">
                                <Carousel interval={null} controls={null} indicators={true} activeIndex={activeIndex} onSelect={handleSelect}>
                                    {item.slideImage.map((image, index) => (
                                        <Carousel.Item key={index}>
                                            <div className="image-container">
                                                {item.slideImage.slice(activeIndex, activeIndex + 3).map((image, imageIndex) => (
                                                    <div key={imageIndex} className="col-md-4">
                                                        <img
                                                            src={`${imageUrl}${item.collectionId}/${item.id}/${image}`}
                                                            alt={`Slide Image ${imageIndex}`}
                                                            className="img-fluid p-2"
                                                            onClick={() => handleShow(`${imageUrl}${item.collectionId}/${item.id}/${image}`)}

                                                        />
                                                    </div>
                                                ))}
                                            </div>

                                        </Carousel.Item >
                                    ))}

                                </Carousel >
                            </div >

                        </div >
                    </Carousel.Item >
                ))}


            </Carousel >



            <Modal show={showModal} onHide={handleClose} style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: '100vw', backdropFilter: 'blur(10px)' }}>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Large Image</Modal.Title>
                </Modal.Header> */}
                {/* <Modal.Body > */}
                <Program facultyData={facultyData} />
                <img src={image} alt="Large" className="img-fluid" />
                {/* <iframe src="https://www.youtube.com/embed/sKY_nTunC9s?si=9gP4xruEuIoVd0b6" frameborder="0" height={500}></iframe> */}
                {/* </Modal.Body> */}
                <Modal.Footer>
                    <button className="button-85" onClick={handleClose}>
                        ปิด
                    </button>
                </Modal.Footer>
            </Modal>

            <div className="container d-flex justify-content-center  p-3 navbar ">
                {/* <Link className='nav-button link-without-underline' to={`/program`}>เยี่ยมชมหลักสูตร</Link> */}

                <button className='nav-button' onClick={handleSubmit}>สมัครเรียน</button>

                <button className='nav-button'>ทดลองเรียน</button>

            </div>
        </div >
    );
};

export default Slide;