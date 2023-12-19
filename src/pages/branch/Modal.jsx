import React from 'react';

const Modal = ({ image, modalId }) => {

    // console.log(modalId)

    return (
        <>
            {image && (
                <div className='modal fade' id={modalId} tabIndex='-1' aria-labelledby={`${modalId}-label`} aria-hidden='true'>
                    <div className='modal-dialog modal-dialog-centered modal-xl'>
                        <div className='modal-content'>
                            <div className='modal-body'>
                                <img src={image} className='img-fluid' alt='' />
                            </div>
                            <div className='modal-footer'>
                                <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
