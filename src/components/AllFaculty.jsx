import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import icon360 from '../assets/icon360.png'
import SongkhlaFaculty from '../pages/SongkhlaFaculty'

const AllFaculty = ({ faculty }) => {
    const facultyName = faculty

    const liStyle = {
        borderRight: '1px solid #ccc',
        padding: '10px',
        margin: '10px',
    }



    const navigate = useNavigate();

    const handleNavigate = (link) => {
        navigate(`/${link}`);
    }


    return (

        <>


            <div className="container bg-light p-4 rounded shadow text-center">
                <div className="row">
                    <div className="col">
                        <Link to="/allfaculty/songkhla" className={`${facultyName === 'songkhla' ? 'text-green' : 'text-muted'} link-without-underline `}>
                            <span>มทร.ศรีวิชัย</span>
                            <h3>สงขลา</h3>
                        </Link>
                        <div className={`${facultyName === 'songkhla' ? 'd-block' : 'd-none'}`}>
                            <img src={icon360} alt="" width={100} />
                        </div>

                    </div>
                    <div className="col">
                        <Link to="/allfaculty/trang" className={`${facultyName === 'trang' ? 'text-green' : 'text-muted'} link-without-underline`}>
                            <span>มทร.ศรีวิชัย</span>
                            <h3>ตรัง</h3>
                        </Link>
                        <div className={`${facultyName === 'trang' ? 'd-block' : 'd-none'}`}>
                            <img src={icon360} alt="" width={100} />
                        </div>
                    </div>
                    <div className="col">
                        <Link to="/allfaculty/nakorn" className={`${facultyName === 'nakorn' ? 'text-green' : 'text-muted'} link-without-underline`}>
                            <span>มทร.ศรีวิชัย</span>
                            <h3>นครศรีฯ</h3>
                        </Link>
                        <div className={`${facultyName === 'nakorn' ? 'd-block' : 'd-none'}`}>
                            <img src={icon360} alt="" width={100} />
                        </div>
                    </div>
                </div>
            </div>


            {facultyName === 'songkhla' ?
                <SongkhlaFaculty />
                : null
            }



        </>
    )
}

export default AllFaculty