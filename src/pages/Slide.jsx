import React, { useState, useEffect } from 'react'
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Modal } from 'react-bootstrap'
import { Modal as Modal2 } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import the FontAwesomeIcon component get close icon
import { faClose, faChevronLeft, faChevronRight, } from '@fortawesome/free-solid-svg-icons';
import { getCounter, getScore, myCounter } from '../lib/getCounter'

import { client } from '../lib/pocketbase';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'




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
    const [ModalShow, setModalShow] = useState(false);

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
        // myCounter('Visit:' + programName)
        // console.log(programName)
        await getCounter(programName).then(res => {
            setCounter(res);
        });
        const registerType = sessionStorage.getItem('register_type');
        console.log(id)

        getScore();



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
        const register_type = sessionStorage.getItem('register_type');

        // console.log(facultyName)
        // console.log(typeof register_type)

        // const counterName = `counter${register_type}`


        try {
            const existingRecord = await client.collection('faculty').getFirstListItem(`name="${facultyName}"`);

            if (existingRecord) {

                switch (register_type) {

                    case '1':
                        const dataUpdate = {
                            counter1: existingRecord.counter1 + 1
                        }
                        await client.collection('faculty').update(existingRecord.id, dataUpdate).then(res => console.log(res));
                        break;
                    case '2':
                        const dataUpdate2 = {
                            counter2: existingRecord.counter2 + 1
                        }
                        await client.collection('faculty').update(existingRecord.id, dataUpdate2).then(res => console.log(res));
                        break;
                    case '3':
                        const dataUpdate3 = {
                            counter3: existingRecord.counter3 + 1
                        }
                        await client.collection('faculty').update(existingRecord.id, dataUpdate3).then(res => console.log(res));
                        break;
                    case '4':
                        const dataUpdate4 = {
                            counter4: existingRecord.counter4 + 1
                        }
                        await client.collection('faculty').update(existingRecord.id, dataUpdate4).then(res => console.log(res));
                        break;
                    default:
                        const dataUpdate5 = {
                            counter5: existingRecord.counter5 + 1
                        }
                        await client.collection('faculty').update(existingRecord.id, dataUpdate5).then(res => console.log(res));
                        break;



                }

            } else {
                console.log('No existing record found. Proceeding to createMember...');
            }

        }
        catch (err) {
            if (err.statusCode === 404) {
                // Handle the case where the document is not found
                console.log('Document not found. Proceeding to createMember...');
            } else {
                // createMember(); // Proceed to create the member even if the document is not found
                console.error('Error:', err);
            }
        }










        // myCounter('Visit:' + facultyName)
        await getCounter(facultyName).then(res => {
            setCounter(res);
            console.log(facultyName)
        });
        console.log(id)

        const data = await client.collection('faculty').getFirstListItem(`id="${id}"`, {
            expand: 'counter1,counter2,counter3,counter4,counter5',
        }).then(res => {
            return res;
        })

        // switch case
        // switch (registerType) {
        //     case '1':
        //         await client.collection('faculty').update(id, {
        //             counter1: data.counter1 + 1
        //         }).then(res => console.log(res))
        //             .catch(err => console.log(err))
        //         break;
        //     case '2':
        //         await client.collection('faculty').update(id, {
        //             counter2: data.counter2 + 1
        //         }).then(res => console.log(res))
        //             .catch(err => console.log(err))
        //         break;
        //     case '3':
        //         await client.collection('faculty').update(id, {
        //             counter3: data.counter3 + 1
        //         }).then(res => console.log(res))
        //             .catch(err => console.log(err))
        //         break;
        //     case '4':
        //         await client.collection('faculty').update(id, {
        //             counter4: data.counter4 + 1
        //         }).then(res => console.log(res))
        //             .catch(err => console.log(err))
        //         break;
        //     default:
        //         await client.collection('faculty').update(id, {
        //             counter5: data.counter5 + 1
        //         }).then(res => console.log(res))
        //             .catch(err => console.log(err))
        //         break;

        // }



        getScore();

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


            const data = client.collection('register').getFirstListItem(`id="${registerId}"`, {
                expand: 'counter1,counter2,counter3,counter4,counter5',
            }).then(res => {
                console.log(res.admission)
                if (!res.admission) {
                    window.location.href = `https://admission.rmutsv.ac.th/check.php?id=${registerId}`
                    console.log(res)
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'คุณได้ทำการสมัครเรียนในคณะนี้แล้ว',
                        footer: '<img src="https://dev.web.rmutsv.ac.th/assets/Logo500-KNQzDSng.png" alt="" width="100px" />'
                    })
                }




                return res;
            })

            // console.log(res.score)

            // if (!data.admission) {
            //     client.collection('register').update(registerId, {
            //         score: data.score + 50,
            //     }).then(res => {
            //         window.location.href = `https://admission.rmutsv.ac.th/check.php?id=${registerId}`
            //         console.log(res)
            //     })
            //         .catch(err => console.log(err))

            // } else {
            //     alert('คุณได้ทำการสมัครแล้ว');
            // }
            // window.location.href = `https://admission.rmutsv.ac.th/check.php?id=${registerId}`

        }
        else {
            // alert('กรุณาเข้าสู่ระบบก่อน');
            window.location.href = `https://admission.rmutsv.ac.th/`
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
                onClick={
                    clickHandler
                }
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


    const ModalCarousel = (item) => {
        const data = item;
        return (
            <Modal show={ModalShow}>
                <ResponsiveCarousel showThumbs={false}
                    renderArrowPrev={renderCustomPrevArrow}
                    renderArrowNext={renderCustomNextArrow}
                    swipeable={true}
                    transitionTime={500}
                    responsive={responeSiveNonSwipeable}
                    showIndicators={false}


                >

                    {/* ของเดิมแบบทีละภาพ */}
                    {data.slideImage.map((image, imageIndex) => (
                        // <div className="col-lg-4 mx-auto  p-2" key={imageIndex} onClick={() => handleShow2(`${imageUrl}${item.collectionId}/${item.id}/${image}`, `${item.name}`, `${item.id}`)}>
                        <div className='col-lg-6 mx-auto p-2' key={imageIndex}
                            onClick={() => {

                                // setModalShow(true)
                                ModalCarousel(item)

                            }
                            }
                        >
                            <img
                                src={`${imageUrl}${item.collectionId}/${item.id}/${image}`}
                                alt={`Slide Image ${imageIndex}`}
                                className="img-fluid  rounded-5"

                            />
                        </div>
                    ))}



                </ResponsiveCarousel >
            </Modal>
        )

    }

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
                                {item.facebookLink === '' ? null :
                                    <a href={`${item.facebookLink}`} target="_blank">
                                        <button className='nav-button' onClick={() => myCounter(`chat:${item.name}`)} >สอบถามข้อมูลเพิ่มเติม</button>
                                    </a>
                                }
                                {item.trial === '' ? null :
                                    <a href={`${item.trial}`} target="_blank">
                                        <button className='nav-button' >ทดลองเรียน</button>
                                    </a>
                                }

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
                                                    getScore();

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
                                    <div className="col-lg-4 mx-auto  p-2" key={imageIndex} onClick={() => {
                                        getScore();
                                        handleShow2(`${imageUrl}${item.collectionId}/${item.id}/${image}`, `${item.name}`, `${item.id}`)
                                    }
                                    }

                                    >
                                        {/* <div className='col-lg-6 mx-auto p-2' key={imageIndex}
                                         onClick={() => ModalCarousel(item)}
                                     > */}
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


            <Modal Modal show={showModal} onHide={handleClose} style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: '100vw', backdropFilter: 'blur(10px)' }
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