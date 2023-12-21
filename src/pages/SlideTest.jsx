import React, { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import the FontAwesomeIcon component get close icon
import { faClose } from '@fortawesome/free-solid-svg-icons'; // import the icons you need

const SlideTest = ({ facultyData }) => {
    const imageUrl = import.meta.env.VITE_POCKETBASE_FILE_URL;
    const [image, setImage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    console.log(facultyData)

    const handleClose = () => {
        setShowModal(false);
    };


    const handleShow = (imageUrl) => {
        setImage(imageUrl);
        setShowModal(true);
    };

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

    return (
        <div >
            <Carousel infiniteLoop showArrows showThumbs={false} >

                {facultyData.map((item, index) => (
                    <div key={index}>
                        <div className='mt-3 mb-3 bg-light p-3 rounded-4 shadow '>

                            <h5 className="">{item.name}</h5>
                        </div>

                        <div className="row">
                            <div className="col">
                                <iframe src={item.youtubeLink} className='iframeFac'></iframe>
                            </div>
                        </div>
                        <div className='row mt-2'>

                            <div className="col">
                                <img src={`${imageUrl}${item.collectionId}/${item.id}/${item.leftImage}`} className=' rounded-2 ' onClick={() => handleShow(`${imageUrl}${item.collectionId}/${item.id}/${item.leftImage}`)} />
                            </div>

                            <div className="col">
                                <img src={`${imageUrl}${item.collectionId}/${item.id}/${item.rightImage}`} className=' rounded-2 ' onClick={() => handleShow(`${imageUrl}${item.collectionId}/${item.id}/${item.rightImage}`)} />
                            </div>

                        </div>
                    </div>
                ))}


            </Carousel>

            <Modal show={showModal} onHide={handleClose} style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: '100vw', backdropFilter: 'blur(10px)' }}>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Large Image</Modal.Title>
                </Modal.Header> */}
                {/* <Modal.Body > */}
                {/* <Program facultyData={facultyData} /> */}
                <img src={image} alt="Large" className="img-fluid" />
                {/* <iframe src="https://www.youtube.com/embed/sKY_nTunC9s?si=9gP4xruEuIoVd0b6" frameborder="0" height={500}></iframe> */}
                {/* </Modal.Body> */}
                {/* <button className="btn btn-danger " onClick={handleClose} style={{ position: 'absolute', top: '0', right: '0', borderRadius: '50%' }}> */}
                <FontAwesomeIcon icon={faClose} onClick={handleClose} style={{ position: 'absolute', top: '10px', right: '10px', borderRadius: '50%', fontSize: '2rem', backgroundColor: 'red', color: '#fff', padding: '10px 13px', border: '3px solid #fff' }} />
                {/* </button> */}
                {/* <Modal.Footer> */}

                {/* </Modal.Footer> */}
            </Modal>
        </div>
    )
}

export default SlideTest