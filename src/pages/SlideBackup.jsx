import React, { useState, useEffect } from 'react'
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import the FontAwesomeIcon component get close icon
import { faClose } from '@fortawesome/free-solid-svg-icons';





const Slide = ({ facultyData }) => {
    const imageUrl = import.meta.env.VITE_POCKETBASE_FILE_URL;
    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState('');
    // const [yourubeUrl, setYourubeUrl] = useState('https://www.youtube.com/embed/');
    const [youtubeUrl, setYoutubeUrl] = useState('');

    console.log(facultyData)

    const handleShow = (imageUrl, youtubeUrl) => {
        setImage(imageUrl);
        setYoutubeUrl(youtubeUrl);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
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

    const responeSive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },

    }

    return (
        <>
            <ResponsiveCarousel
                infiniteLoop={true}

                key={facultyData.campusID} showIndicators={false} selectedItem={0} >
                {facultyData.map((item, index) => (
                    <>
                        <div className='row' key={index}>
                            <div className="col-sm-9 mx-auto" >

                                <h5 className='p-2 text-center glass mt-2'>{item.name}</h5>
                                <iframe src={`${item.youtubeLink}&autoplay=1&mute=1`} id="main-live"></iframe>

                                {/* <iframe className="embed-responsive-item " src={`${linkUrl}&autoplay=1&mute=1`} allow="autoplay;fullscreen; encrypted-media" id="main-live"></iframe> */}

                                {/* <img src={`${imageUrl}${item.collectionId}/${item.id}/${item.expand.program.Image}`} alt="" className='p-3 rounded-5' /> */}

                            </div>

                            <div className="row">
                                <div className="col-9 mx-auto mt-5">

                                    <br />
                                    <p className='text-center'>หลักสูตร</p>
                                    <ResponsiveCarousel
                                        showArrows={false}
                                        centerMode={true}
                                        centerSlidePercentage={100}
                                        showThumbs={false}
                                        infiniteLoop={true}
                                        className='d-flex flex-column align-items-center  justify-content-center text-center' style={{ zIndex: '9999' }}



                                    >

                                        {typeof item.expand.program === 'object' ?
                                            item.expand.program.map((item, index) => (
                                                <div className=" glass" key={index}
                                                    onClick={() => {

                                                        handleShow(`${imageUrl}${item.collectionId}/${item.id}/${item.image}`)
                                                        setYoutubeUrl(item.youtubeLink)
                                                    }
                                                    }
                                                >

                                                    {/* <p className='text-center  '>หลักสูตร</p> */}

                                                    <img src={`${imageUrl}${item.collectionId}/${item.id}/${item.image}`} alt="" className='text-center p-2 rounded-5' />
                                                </div>
                                            ))
                                            : null
                                        }
                                    </ResponsiveCarousel>
                                </div>
                            </div >
                        </div>

                        <ResponsiveCarousel>
                            {item.slideImage.map((image, imageIndex) => (
                                <div key={imageIndex} onClick={() => handleShow(`${imageUrl}${item.collectionId}/${item.id}/${image}`, item.youtubeLink)}>
                                    <img
                                        src={`${imageUrl}${item.collectionId}/${item.id}/${image}`}
                                        alt={`Slide Image ${imageIndex}`}
                                        className="img-fluid p-2"

                                    />
                                </div>
                            ))}
                        </ResponsiveCarousel>







                        {/* <div className='row p-3 mt-5'>
                            <ResponsiveCarousel
                                infiniteLoop={true}
                                showArrows={true}
                                autoPlay={false}
                                interval={null}
                                controls={true}
                                indicators={true}
                                showThumbs={true}
                                showIndicators={false}
                                showStatus={false}
                                centerMode={true}
                                centerSlidePercentage={50}
                                responsive={responeSive}
                                arrowColor='red'
                                className='p-3'
                            >
                                {item.slideImage.map((image, imageIndex) => (
                                    <div key={imageIndex} onClick={() => handleShow(`${imageUrl}${item.collectionId}/${item.id}/${image}`)}>
                                        <img
                                            src={`${imageUrl}${item.collectionId}/${item.id}/${image}`}
                                            alt={`Slide Image ${imageIndex}`}
                                            className="img-fluid p-2"

                                        />
                                    </div>
                                ))}
                            </ResponsiveCarousel>
                        </div> */}
                    </>

                ))
                }
            </ResponsiveCarousel >
            <Modal show={showModal} onHide={handleClose} style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: '100vw', backdropFilter: 'blur(10px)' }}>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Large Image</Modal.Title>
                </Modal.Header> */}
                {/* <Modal.Body > */}
                {/* <Program facultyData={facultyData} /> */}
                <img src={image} alt="Large" className="img-fluid text-center" />
                <iframe src={youtubeUrl} frameBorder="0" height={500} ></iframe>
                {/* </Modal.Body> */}
                {/* <button className="btn btn-danger " onClick={handleClose} style={{ position: 'absolute', top: '0', right: '0', borderRadius: '50%' }}> */}
                <FontAwesomeIcon icon={faClose} onClick={handleClose} style={{ position: 'absolute', top: '10px', right: '10px', borderRadius: '50%', fontSize: '2rem', backgroundColor: 'red', color: '#fff', padding: '10px 13px', border: '3px solid #fff' }} />
                {/* </button> */}
                {/* <Modal.Footer> */}

                {/* </Modal.Footer> */}
            </Modal>
        </>
    )
}

export default Slide





