import React, { useState, useEffect } from 'react'
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Modal } from 'react-bootstrap'
import { Modal as Modal2 } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import the FontAwesomeIcon component get close icon
import { faClose, faChevronLeft, faChevronRight, } from '@fortawesome/free-solid-svg-icons';
import { getCounter } from '../lib/getCounter'

import { client } from '../lib/pocketbase';


const responeSiveSwipeable = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        slidesToSlide: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        slidesToSlide: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1,
    },
};

const responeSiveNonSwipeable = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        slidesToSlide: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        slidesToSlide: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1,
    },
};


const arrowStyleNextTop = {
    position: 'absolute',
    right: '.25em',
    top: '2em', // You can adjust this value
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    border: 'none',
    borderRadius: '50%',
    padding: '10px 16px',
    cursor: 'pointer',
    zIndex: 2, // Set a higher z-index
};

const arrowStylePrevTop = {
    position: 'absolute',
    left: '.25em',
    top: '2em', // You can adjust this value
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    border: 'none',
    borderRadius: '50%',
    padding: '10px 16px',
    cursor: 'pointer',
    zIndex: 2, // Set a higher z-index
};



const arrowStyleNext = {
    position: 'absolute',
    right: '0',
    top: '50%', // You can adjust this value
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    border: 'none',
    borderRadius: '50%',
    padding: '10px 16px',
    cursor: 'pointer',
    zIndex: 2, // Set a higher z-index
};

const arrowStylePrev = {
    position: 'absolute',
    left: '0',
    top: '50%', // You can adjust this value
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    border: 'none',
    borderRadius: '50%',
    padding: '10px 16px',
    cursor: 'pointer',
    zIndex: 2, // Set a higher z-index
};


const Slide = ({ facultyData }) => {

    const imageUrl = import.meta.env.VITE_POCKETBASE_FILE_URL;
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [image, setImage] = useState('');
    const [image2, setImage2] = useState('');
    // const [yourubeUrl, setYourubeUrl] = useState('https://www.youtube.com/embed/');
    const [youtubeUrl, setYoutubeUrl] = useState('');

    const [isDragging, setIsDragging] = useState(false);
    const [slideImage, setSlideImage] = useState([]);
    const [program, setProgram] = useState([]);
    const [counter, setCounter] = useState(0);
    const [programName, setProgramName] = useState('');

    // console.log(facultyData.program)
    // getCounter(facultyData.program).then(res => {
    //     setCounter(res);
    // });





    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    // console.log(facultyData)

    const handleShow = async (imageUrl, programName, id) => {
        setImage(imageUrl);
        setYoutubeUrl(youtubeUrl);
        setImage2(image2);
        setShowModal(true);
        console.log(programName)
        await getCounter(programName).then(res => {
            setCounter(res);
        });
        const registerType = sessionStorage.getItem('register_type');
        console.log(id)


        const data = await client.collection('program').getFirstListItem(`id="${id}"`, {
            expand: 'counter1,counter2,counter3,counter4,counter5',
        }).then(res => {
            // console.log(res)
            return res;
        })

        // switch case 

        switch (registerType) {
            case '1':
                await client.collection('program').update(id, {
                    counter1: data.counter1 + 1
                }).then(res => console.log(res))
                    .catch(err => console.log(err))
                break;
            case '2':
                await client.collection('program').update(id, {
                    counter2: data.counter2 + 1
                }).then(res => console.log(res))
                    .catch(err => console.log(err))
                break;
            case '3':
                await client.collection('program').update(id, {
                    counter3: data.counter3 + 1
                }).then(res => console.log(res))
                    .catch(err => console.log(err))
                break;
            case '4':
                await client.collection('program').update(id, {
                    counter4: data.counter4 + 1
                }).then(res => console.log(res))
                    .catch(err => console.log(err))
                break;
            default:
                await client.collection('program').update(id, {
                    counter5: data.counter5 + 1
                }).then(res => console.log(res))
                    .catch(err => console.log(err))
                break;

        }



    };



    const handleShow2 = async (imageUrl, facultyName, id) => {
        setImage(imageUrl);
        setShowModal2(true);
        await getCounter(facultyName).then(res => {
            setCounter(res);
        });
        const registerType = sessionStorage.getItem('register_type');
        console.log(id)


        const data = await client.collection('faculty').getFirstListItem(`id="${id}"`, {
            expand: 'counter1,counter2,counter3,counter4,counter5',
        }).then(res => {
            // console.log(res)
            return res;
        })

        // switch case 

        switch (registerType) {
            case '1':
                await client.collection('faculty').update(id, {
                    counter1: data.counter1 + 1
                }).then(res => console.log(res))
                    .catch(err => console.log(err))
                break;
            case '2':
                await client.collection('faculty').update(id, {
                    counter2: data.counter2 + 1
                }).then(res => console.log(res))
                    .catch(err => console.log(err))
                break;
            case '3':
                await client.collection('faculty').update(id, {
                    counter3: data.counter3 + 1
                }).then(res => console.log(res))
                    .catch(err => console.log(err))
                break;
            case '4':
                await client.collection('faculty').update(id, {
                    counter4: data.counter4 + 1
                }).then(res => console.log(res))
                    .catch(err => console.log(err))
                break;
            default:
                await client.collection('faculty').update(id, {
                    counter5: data.counter5 + 1
                }).then(res => console.log(res))
                    .catch(err => console.log(err))
                break;

        }

    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleClose2 = () => {
        setShowModal2(false);
    }

    const handleSubmit = (facultyName) => {
        const registerId = sessionStorage.getItem('id');
        // console.log(registerId);

        if (registerId) {

            getCounter('admission' + ':' + facultyName).then(res => {
                setCounter(res);
            });
            window.location.href = `https://admission.rmutsv.ac.th/check.php?id=${registerId}`;
        }
        else {
            alert('กรุณาเข้าสู่ระบบก่อน');
        }
    }




    const renderCustomPrevArrow = (clickHandler, hasPrev, label) => {
        return hasPrev && (
            <button
                type="button"
                onClick={clickHandler}
                title={label}
                // style={arrowStylePrev}>
                style={isDragging ? disabledArrowStyle : arrowStylePrev}
                disabled={isDragging}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
        );
    };

    const renderCustomNextArrow = (clickHandler, hasNext, label) => {
        return hasNext && (
            <button type="button"
                onClick={clickHandler}
                title={label}
                style={isDragging ? disabledArrowStyle : arrowStyleNext}
                disabled={isDragging}

            >
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        );
    };

    const renderCustomPrevArrowTop = (clickHandler, hasPrev, label) => {
        return hasPrev && (
            <button
                type="button"
                onClick={clickHandler}
                title={label}
                // style={arrowStylePrev}>
                style={isDragging ? disabledArrowStyle : arrowStylePrevTop}
                disabled={isDragging}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
        );
    };

    const renderCustomNextArrowTop = (clickHandler, hasNext, label) => {

        return hasNext && (
            <button type="button"
                onClick={clickHandler}
                title={label}
                style={isDragging ? disabledArrowStyle : arrowStyleNextTop}
                disabled={isDragging}

            >
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        );
    };

    return (
        <>
            <ResponsiveCarousel

                renderArrowPrev={renderCustomPrevArrowTop}
                renderArrowNext={renderCustomNextArrowTop}

                swipeable={false}
                transitionTime={500}
                showStatus={false}
                showThumbs={false}
                showIndicators={false}
                responsive={responeSiveNonSwipeable}



                key={facultyData.campusID}   >
                {facultyData.map((item, index) => (
                    <>
                        <div className='row' key={index}>
                            <div className="col-sm-9 mx-auto" >

                                <h5 className='p-3 text-center  text-light rounded-pill mt-2' style={{ backgroundColor: '#00154b' }}>{item.name}</h5>
                                <iframe src={`${item.youtubeLink}&autoplay=1&mute=1`} id="main"></iframe>
                            </div>

                        </div>
                        <div className="row text-center">
                            <div className='col-md mx-auto my-3'>
                                <button className='nav-button' onClick={handleSubmit}>สมัครเรียน</button>

                            </div>
                        </div>



                        <div className="row" key={item.id}>

                            <div className=''>
                                <span className='rounded-pill'>หลักสูตรที่เปิด</span>
                            </div>
                            <ResponsiveCarousel showThumbs={false}
                                renderArrowPrev={renderCustomPrevArrow}
                                renderArrowNext={renderCustomNextArrow}
                                transitionTime={500}
                                swipeable={true}
                                responsive={responeSiveSwipeable}


                            >
                                {typeof item.expand.program === 'object' ?

                                    item.expand.program.map((item, index) => (


                                        <div className="col-lg-6  mx-auto " style={{ display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }} key={item.id}>


                                            <div
                                                onClick={() => {


                                                    handleShow(`${imageUrl}${item.collectionId}/${item.id}/${item.image}`, `${item.name}`, `${item.id}`)
                                                    setYoutubeUrl(item.youtubeLink)
                                                    setImage2(`${imageUrl}${item.collectionId}/${item.id}/${item.image2}`)

                                                    setProgramName(item.name)

                                                }
                                                }
                                            >

                                                {/* <p className='text-center  '>หลักสูตร</p> */}

                                                <img src={`${imageUrl}${item.collectionId}/${item.id}/${item.image}`} alt="" className='text-center  rounded-5 shadow  my-3 ' />
                                            </div>
                                        </div>

                                    ))
                                    : null
                                }
                            </ResponsiveCarousel>

                        </div>

                        <div className="row">
                            <p className='mt-3'>แกลลอรี่</p>
                            <ResponsiveCarousel showThumbs={false}
                                renderArrowPrev={renderCustomPrevArrow}
                                renderArrowNext={renderCustomNextArrow}
                                swipeable={true}
                                transitionTime={500}
                                responsive={responeSiveNonSwipeable}
                                showIndicators={false}


                            >

                                {/* ของเดิมแบบทีละภาพ */}
                                {item.slideImage.map((image, imageIndex) => (
                                    <div className="col-lg-4 mx-auto  p-2" key={imageIndex} onClick={() => handleShow2(`${imageUrl}${item.collectionId}/${item.id}/${image}`, `${item.name}`, `${item.id}`)}>
                                        <img
                                            src={`${imageUrl}${item.collectionId}/${item.id}/${image}`}
                                            alt={`Slide Image ${imageIndex}`}
                                            className="img-fluid  rounded-5"

                                        />
                                    </div>
                                ))}



                            </ResponsiveCarousel >
                        </div >
                    </>
                ))


                }


            </ResponsiveCarousel >

            {/* {facultyData.map((item, index) => (
                
            ))} */}


            <Modal show={showModal} onHide={handleClose} style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: '100vw', backdropFilter: 'blur(10px)' }
            }>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Large Image</Modal.Title>
                </Modal.Header> */}
                {/* <Modal.Body > */}
                {/* <Program facultyData={facultyData} /> */}
                <img src={image} alt="Large" className="img-fluid text-center" />
                <img src={image2} alt="Large" className="img-fluid text-center" />

                <iframe src={youtubeUrl} frameBorder="0" height={320} ></iframe>
                {/* </Modal.Body> */}
                {/* <button className="btn btn-danger " onClick={handleClose} style={{ position: 'absolute', top: '0', right: '0', borderRadius: '50%' }}> */}
                <FontAwesomeIcon icon={faClose} onClick={handleClose} style={{ position: 'absolute', top: '10px', right: '10px', borderRadius: '50%', fontSize: '2rem', backgroundColor: 'red', color: '#fff', padding: '10px 13px', border: '3px solid #fff' }} />

            </Modal>
            <Modal2 show={showModal2} onHide={handleClose2} style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: '100vw', backdropFilter: 'blur(10px)' }}>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Large Image</Modal.Title>
                </Modal.Header> */}
                {/* <Modal.Body > */}
                {/* <Program facultyData={facultyData} /> */}
                <img src={image} alt="Large" className="img-fluid text-center" />
                {/* <iframe src={youtubeUrl} frameBorder="0" height={500} ></iframe> */}
                {/* </Modal.Body> */}
                {/* <button className="btn btn-danger " onClick={handleClose} style={{ position: 'absolute', top: '0', right: '0', borderRadius: '50%' }}> */}
                <FontAwesomeIcon icon={faClose} onClick={handleClose2} style={{ position: 'absolute', top: '10px', right: '10px', borderRadius: '50%', fontSize: '2rem', backgroundColor: 'red', color: '#fff', padding: '10px 13px', border: '3px solid #fff' }} />

            </Modal2>

        </>
    )
}



export default Slide






