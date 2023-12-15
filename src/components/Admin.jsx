import React, { useState, useEffect } from 'react'
import { client } from '../lib/pocketbase'

const Admin = () => {

    const [isGamePaused, setIsGamePaused] = useState(null);
    const [adminLogin, setAdminLogin] = useState(false);


    useEffect(() => {
        setInterval(() => {
            client.collection('statusgame').getList(1)
                .then(res => {
                    setIsGamePaused(res.items[0].isGamePaused);
                })
                .catch(err => {
                    console.log(err);
                });
        }, 1000);
    }, []);

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
                                        <label htmlFor="">Game Status</label>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={e => {
                                                isGamePaused ? setIsGamePaused(false) : setIsGamePaused(true);
                                                console.log(isGamePaused);
                                            }} />
                                            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">{!isGamePaused ? 'On' : 'Off'}</label>
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <button className="button-85 mt-2">Stop Game</button>
                                    </div>
                                    <div className="form-group">
                                        <button className="button-85 mt-2">Reset Game</button>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </>}
            </div>
        </div>
    )
}

export default Admin