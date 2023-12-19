import React, { useState, useEffect } from 'react';

const Index = ({ id, text, mainImage, details, link, leftImage, rightImage }) => {
    const [image, setImage] = useState('');
    const modalId = `exampleModal-${id}`; // Unique id for each modal


    useEffect(() => {
        setImage('https://sathern.rmutsv.ac.th:8077/api/files/specialstar/gzmj7o982521tzg/box_50_dGYs0djkYb.png');
    }, []);

    const showBigImage = (imageUrl) => {
        setImage(imageUrl);
        // Open the modal using Bootstrap's modal method
        // Make sure to include Bootstrap's JavaScript in your project

        // Check if Bootstrap's modal method is available
        if (window.bootstrap && typeof window.bootstrap.Modal === 'function') {
            const modal = new window.bootstrap.Modal(document.getElementById(modalId));
            modal.show();
        } else {
            console.error('Bootstrap modal method not available');
        }
    };

    return (
        <div className='row'>
            <div className="col text-center">
                <div className="card" style={{ backgroundColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(5px)' }}>
                    <h1>{id}</h1>
                    <p>{text}</p>
                </div>

                <div className="container mt-3">
                    <div className="row">
                        {/* Column 1 - Large Screens */}
                        <div className="col-lg-2 col-md-12 col-sm mt-5">
                            <div>
                                <img src={leftImage} className="img-fluid rounded-5 shadow" alt="..." onClick={() => showBigImage(leftImage)} />
                                <div className="card-body" style={{ padding: '0', margin: '0' }}>
                                    <h5 className="card-title">{details}</h5>
                                </div>
                            </div>
                        </div>

                        {/* Column 2 - Large Screens and Medium Screens */}

                        <div className="col-lg-8 col-md-12 col-sm mt-2">
                            <div className="row p-3">

                                <iframe className="iframe360" src={link} frameborder="0"></iframe>
                            </div>
                            <div className="card-body" style={{ padding: '0', margin: '0' }}>
                                <img src={mainImage} className="img-fluid" alt="..." onClick={() => showBigImage(mainImage)} />
                                <h5 className="card-title">{details}</h5>
                            </div>
                        </div>


                        {/* Column 3 - Large Screens */}
                        <div className="col-lg-2 col-md-12 col-sm my-5">
                            <div>
                                <img src={rightImage} className="img-fluid rounded-5 shadow" alt="..." onClick={() => showBigImage(rightImage)} />
                                <div className="card-body" style={{ padding: '0', margin: '0' }}>
                                    <h5 className="card-title">{details}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal component */}
                <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-xl">
                        <div className="modal-content" style={{ background: 'none', backdropFilter: 'none', padding: '2px', border: 'none' }}>
                            <div className="modal-body">
                                <img src={image} className="img-fluid" alt="banner" height={'100vh'} />
                            </div>
                            {/* <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Close
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
