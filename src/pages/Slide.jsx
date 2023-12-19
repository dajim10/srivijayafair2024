import React, { useState } from 'react';
import { Carousel, Modal } from 'react-bootstrap';



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
            window.location.href = `https://admission.rmutsv.ac.th/check.php?${registerId}`;
        }
        else {
            alert('กรุณาเข้าสู่ระบบก่อน');
        }
    }


    const handleShow = (imageUrl) => {
        setImage(imageUrl);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <div  style={{padding:'2px',margin:'20px',backgroundColor:'rgba(255,255,255,0.5)',borderRadius:'20px',backdropFilter:'blur(5px)'}}>

            <Carousel className='mt-3 ' autoPlay={false} interval={null} controls={true} >
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

                            {/* <Carousel>
                                {item.slideImage.map((image, index) => (

                                    <Carousel.Item key={index}>
                                        <img
                                            src={`${imageUrl}${item.collectionId}/${item.id}/${image}`}
                                            className='img-fluid'
                                            onClick={() => handleShow(`${imageUrl}${item.collectionId}/${item.id}/${image}`)}
                                            style={{ width: '80%' }}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel> */}

                            {/* using multi item in one slide */}
                            <div className="container p-3">
                                <Carousel interval={null} controls={null} indicators={false} activeIndex={activeIndex} onSelect={handleSelect}>
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
                                            {/* <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span class="sr-only">Previous</span>
                                            </a>

                                            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span class="sr-only">Next</span>
                                            </a> */}

                                            {/* <div className="d-flex justify-content-between mt-3">
                                            {activeIndex > 0 && (
                                                <button className="btn btn-secondary" onClick={() => handleSelect(activeIndex - 1)}>
                                                    &lt; Prev
                                                </button>
                                            )}
                                            {activeIndex + 3 < item.slideImage.length && (
                                                <button className="btn btn-secondary" onClick={() => handleSelect(activeIndex + 1)}>
                                                    Next &gt;
                                                </button>
                                            )}
                                        </div> */}
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>
                            {/*  */}

                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>


            <Modal show={showModal} onHide={handleClose} style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: '100vw' }}>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Large Image</Modal.Title>
                </Modal.Header> */}
                {/* <Modal.Body > */}
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

                <button className='nav-button ' onClick={handleSubmit}>สมัครเรียน</button>

                <button className='nav-button '>สมัครทดลองเรียน</button>

            </div>
        </div>
    );
};

export default Slide;