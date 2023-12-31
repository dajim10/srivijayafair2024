import React, { useState, useEffect } from 'react'
import { client } from '../lib/pocketbase'


const Admin = () => {

    const [isGamePaused, setIsGamePaused] = useState(null);
    const [adminLogin, setAdminLogin] = useState(false);
    const [starPoint, setStarPoint] = useState(0);


    useEffect(() => {

        client.collection('statusgame').getList(1)
            .then(res => {

                setIsGamePaused(res.items[0].isGamePaused);
                setStarPoint(res.items[0].starPoint);
            })
            .catch(err => {
                console.log(err);
            });

    }, []);


    const handleGameStart = (e) => {

        const check = e.target.checked;
        console.log(check)
        client.collection('statusgame').update('c8rxzctc2d6cnxp', {
            isGamePaused: check
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });

    }

    const handleSubmit = (e) => {
        const systemUser = import.meta.env.VITE_SYSTEM_USERNAME;
        const systemPassword = import.meta.env.VITE_SYSTEM_PASSWORD;
        // console.log(import.meta.env.VITE_POCKETBASE_PASSWORD);

        e.preventDefault();
        if (e.target[0].value === systemUser
            && e.target[1].value === systemPassword) {
            setAdminLogin(true);
            console.log('login success');
        }
    }

    const hendleChangeStarPoint = async (e) => {

        // const record = await pb.collection('demo').update('YOUR_RECORD_ID', {
        //     title: 'Lorem ipsum',
        // });
        const value = e.target.value;
        const record = await client.collection('statusgame').update('c8rxzctc2d6cnxp', {
            starPoint: value,
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    }


    return (
        <div className='container text-center mt-5 align-items-center justify-content-center'>
            {adminLogin ? <h1>Admin Control</h1> : null}
            <div className="row">
                {!adminLogin ?
                    <div className="col col-lg-6 col-sm mx-auto">
                        <section className=' p-5 rounded-5 shadow-lg ' style={{ backgroundColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(5px)' }}  >


                            <form onSubmit={handleSubmit} className="form-group">
                                <h1>Admin Login</h1>
                                <div className="form-group">

                                    <input type="text" className="form-control" placeholder='username' autoFocus />
                                </div>
                                <div className="form-group">

                                    <input type="password" className="form-control"
                                        placeholder='password' />
                                </div>
                                <button className="button-85 mt-2">Login</button>
                            </form>
                        </section>
                    </div>
                    : <>
                        <div className="row">
                            <div className="col col-lg-6 col-sm mx-auto">
                                <section className=' p-5 rounded-5 shadow-lg ' style={{ backgroundColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(5px)' }}  >
                                    <h1>Admin Control</h1>
                                    <div className='form-group'>


                                        <div className="form-check form-switch ">

                                            <label htmlFor="flexSwitchCheckChecked">{isGamePaused ? 'เกมดาวตกหยุดอยู่' : 'เกมดาวตกเปิดอยู่'}</label>
                                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" value={isGamePaused} onChange={e => {
                                                setIsGamePaused(e.target.checked);
                                                handleGameStart(e);
                                            }} />

                                        </div>
                                        <div className='form-control'>
                                            <label htmlFor="starPoint">ใส่คะแนนหมุนวงล้อ</label>
                                            <input type="number" className="form-control" id="starPoint" value={starPoint} onChange={e => {

                                                setStarPoint(e.target.value);
                                                hendleChangeStarPoint(e);
                                            }
                                            } />
                                        </div>

                                    </div>


                                    {/* <div className="form-group">
                                        <button className="button-85 mt-2">Stop Game</button>
                                    </div>
                                    <div className="form-group">
                                        <button className="button-85 mt-2">Reset Game</button>
                                    </div> */}
                                </section>
                            </div>
                        </div>
                    </>}
            </div>
        </div>
    )
}

export default Admin