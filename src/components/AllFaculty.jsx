import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import icon360 from '../assets/icon360.png'
import SongkhlaFaculty from '../pages/SongkhlaFaculty'
import TrangFaculty from '../pages/TrangFaculty'
import NakornFaculty from '../pages/NakornFaculty'
import { client } from '../lib/pocketbase'
import { getCounter } from '../lib/getCounter'
import Vr360 from './Vr360'

const AllFaculty = ({ faculty }) => {

    const facultyName = faculty


    const [counter, setCounter] = useState(0);
    useEffect(() => {


        if (faculty === 'songkhla') {
            getCounter('songkhla').then(res => {
                setCounter(res);
            }
            );
        } else if (faculty === 'trang') {
            getCounter('trang').then(res => {
                setCounter(res);
            }
            );
        } else if (faculty === 'nakorn') {
            getCounter('nakorn').then(res => {
                setCounter(res);
            }
            );
        }
    }, [faculty])





    const navigate = useNavigate();

    const handleNavigate = (link) => {
        navigate(`/${link}`);
    }

    const [isLogin, setIsLogin] = useState(false);


    const fetchFirstRecord = async () => {

        const phone = sessionStorage.getItem('phone');
        try {
            const existingRecord = await client.collection('register').getFirstListItem(`phone="${phone}"`);

            if (existingRecord) {
                const dataUpdate = {
                    score: existingRecord.score + 1
                }
                console.log(existingRecord.score);
                await client.collection('register').update(existingRecord.id, dataUpdate);
                setIsLogin(true);
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

    };

    useEffect(() => {
        if (isLogin) {
            console.log('isLogin')
            fetchFirstRecord();
        }
    }
        , [isLogin]);



    return (

        <>


            <div className="container bg-light p-4 rounded shadow text-center sticky-bottom" >



                <div className="row">
                    <div className="col">
                        <Link to="/allfaculty/songkhla" className={`${facultyName === 'songkhla' ? 'text-green' : 'text-muted'} link-without-underline `}>
                            <span>มทร.ศรีวิชัย</span>
                            <h3>สงขลา</h3>
                        </Link>
                        <Link to="/vr360/songkhla">
                            <div className={`${facultyName === 'songkhla' ? 'd-block' : 'd-none'}`}>
                                <img src={icon360} alt="" width={100} />
                            </div>
                        </Link>

                    </div>
                    <div className="col">
                        <Link to="/allfaculty/trang" className={`${facultyName === 'trang' ? 'text-green' : 'text-muted'} link-without-underline`}>
                            <span>มทร.ศรีวิชัย</span>
                            <h3>ตรัง</h3>
                        </Link>
                        <Link to="/vr360/trang">
                            <div className={`${facultyName === 'trang' ? 'd-block' : 'd-none'}`}>
                                <img src={icon360} alt="" width={100} />
                            </div>
                        </Link>
                    </div>
                    <div className="col">
                        <Link to="/allfaculty/nakorn" className={`${facultyName === 'nakorn' ? 'text-green' : 'text-muted'} link-without-underline`}>
                            <span>มทร.ศรีวิชัย</span>
                            <h3>นครศรีฯ</h3>
                        </Link>
                        <Link to="/vr360/nakorn">
                            <div className={`${facultyName === 'nakorn' ? 'd-block' : 'd-none'}`}>
                                <img src={icon360} alt="" width={100} />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>


            {facultyName === 'songkhla' ?
                <SongkhlaFaculty />
                : null
            }

            {facultyName === 'trang' ?
                <TrangFaculty />
                : null
            }

            {facultyName === 'nakorn' ?
                <NakornFaculty />
                : null
            }



        </>
    )
}

export default AllFaculty