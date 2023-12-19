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

    const handleShow = (imageUrl) => {
        setImage(imageUrl);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <>
            <Carousel className='mt-5' autoPlay={false} interval={null} controls={false}>
                {facultyData.map((item, index) => (
                    <Carousel.Item key={index}>
                        <div className="card  text-center  justify-content-center align-items-center" style={{ height: 'auto', width: '80%', margin: '0 auto', background: 'none', border: 'none' }}>
                            <div className='bg-light p-2 rounded shadow w-100'>
                                <h5>{item.facultyName}</h5>
                            </div>
                            <br />
                            <div className=" text-center  d-flex justify-content-between align-items-center">
                                <div className='leftImage' >
                                    <img
                                        src={`${imageUrl}${item.collectionId}/${item.id}/${item.leftImage}`}
                                        className='img-fluid'
                                        onClick={() => handleShow(`${imageUrl}${item.collectionId}/${item.id}/${item.leftImage}`)}

                                    />
                                </div>
                                <div className='container-fluid text-center mt-2'>
                                    <iframe src={item.youtubeLink} className='iframeFac'></iframe>
                                </div>
                                <div className='leftImage'>
                                    <img
                                        src={`${imageUrl}${item.collectionId}/${item.id}/${item.rightImage}`}
                                        className='img-fluid'
                                        onClick={() => handleShow(`${imageUrl}${item.collectionId}/${item.id}/${item.rightImage}`)}

                                    />
                                </div>
                            </div>

                        </div>
                        <div className="container-fluid text-center  d-flex justify-content-between align-items-center">

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
                            <Carousel interval={null} controls={true} indicators={false} activeIndex={activeIndex} onSelect={handleSelect}>
                                {item.slideImage.map((image, index) => (
                                    <Carousel.Item key={index}>
                                        <div className="image-container">
                                            {item.slideImage.slice(activeIndex, activeIndex + 3).map((image, imageIndex) => (
                                                <div key={imageIndex} className="col-md-4">
                                                    <img
                                                        src={`${imageUrl}${item.collectionId}/${item.id}/${image}`}
                                                        alt={`Slide Image ${imageIndex}`}
                                                        className="img-fluid"
                                                        onClick={() => handleShow(`${imageUrl}${item.collectionId}/${item.id}/${image}`)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
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
                            {/*  */}

                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>


            <Modal show={showModal} onHide={handleClose} style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Large Image</Modal.Title>
                </Modal.Header> */}
                {/* <Modal.Body > */}
                <img src={image} alt="Large" className="img-fluid" />
                {/* </Modal.Body> */}
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        ปิด
                    </button>
                </Modal.Footer>
            </Modal>

            <div className="container d-flex justify-content-center  p-3 navbar ">

                <button className='nav-button '>สมัครเรียน</button>

                <button className='nav-button '>สมัครทดลองเรียน</button>

            </div>
        </>
    );
};

export default Slide;