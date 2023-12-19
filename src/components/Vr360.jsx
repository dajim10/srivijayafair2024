import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faCircleRight } from '@fortawesome/free-solid-svg-icons';


const Vr360 = ({ linkUrl }) => {
    const { faculty } = useParams();
    const navigate = useNavigate();

    if (faculty === 'songkhla') {
        return (
            <div className='container text-center'>
                <h1>สงขลา</h1>
                <div className="d-flex justify-content-between ">

                    <FontAwesomeIcon icon={faCircleLeft} onClick={() => navigate(-1)} style={{ fontSize: '40px' }} />

                    <FontAwesomeIcon icon={faCircleRight} onClick={() => navigate('/vr360/trang')} style={{ fontSize: '40px' }} />
                </div>

                <iframe src="https://my.treedis.com/tour/ruts-rattaphum-28507ac5" frameborder="0" width={1080} height={1920} id="iframe360"></iframe>
                <div className="mt-2" style={{ height: '20px' }}></div>
            </div>
        )
    }
    else if (faculty === 'trang') {
        return (
            <div className='container text-center'>
                <h1>วิทยาเขตตรัง</h1>
                <div className="d-flex justify-content-between ">

                    <FontAwesomeIcon icon={faCircleLeft} onClick={() => navigate(-1)} style={{ fontSize: '40px' }} />

                    <FontAwesomeIcon icon={faCircleRight} onClick={() => navigate('/vr360/nakorn')} style={{ fontSize: '40px' }} />
                </div>
                <iframe src="https://my.treedis.com/tour/ruts-rattaphum-28507ac5" frameborder="0" width={1080} height={1920} id="iframe360"></iframe>
                <div className="mt-2" style={{ height: '20px' }}></div>
            </div>
        )
    }
    else if (faculty === 'nakorn') {
        return (
            <div className='container text-center'>
                <h1>วิทยาเขตนครศรีฯ</h1>
                <div className="d-flex justify-content-between ">

                    <FontAwesomeIcon icon={faCircleLeft} onClick={() => navigate(-1)} style={{ fontSize: '40px' }} />

                    <FontAwesomeIcon icon={faCircleRight} onClick={() => navigate('/allfaculty/nakorn')} style={{ fontSize: '40px' }} />
                </div>
                <iframe src="https://my.treedis.com/tour/ruts-rattaphum-28507ac5" frameborder="0" width={1080} height={1920} id="iframe360"></iframe>
                <div className="mt-2" style={{ height: '20px' }}></div>
            </div>
        )
    }

    return (
        <div>

            {faculty}
        </div>
    )
}

export default Vr360