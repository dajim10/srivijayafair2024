import React, { useState, useEffect } from 'react'
import { client } from '../lib/pocketbase'





const Admin = () => {

    const [isGamePaused, setIsGamePaused] = useState(null);
    const [adminLogin, setAdminLogin] = useState(false);
    const [starPoint, setStarPoint] = useState(0);
    const [inventory, setInventory] = useState({
        // Your default inventory structure here
        amount: 0,

    });



    useEffect(() => {

        client.collection('statusgame').getList(1)
            .then(res => {

                setIsGamePaused(res.items[0].isGamePaused);
                console.log(res.items[0].isGamePaused)
                setStarPoint(res.items[0].starPoint);
            })
            .catch(err => {
                console.log(err);
            });

    }, []);


    useEffect(() => {
        client.collection('stock').getFullList({ filter: 'type=1' })
            .then(res => {
                console.log(res);
                setInventory(Object.fromEntries(res.map(item => [item.id, item])));
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

        const record = await client.collection('statusgame').update('c8rxzctc2d6cnxp', {
            starPoint: starPoint,
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
        const value = e.target.value;

    }



    const handleChange = (e, itemId) => {
        const { value } = e.target;
        setInventory((prevInventory) => ({
            ...prevInventory,
            [itemId]: {
                ...prevInventory[itemId],
                amount: value,
            },
        }));
        client.collection('stock').update(itemId, {
            amount: value,
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });

        // check if value = 0 then pop value in array collection gamecontrol.stopposition
        switch (itemId) {
            case 'vwwz78chpsnveye':
                if (value == 0) {
                    client.collection('gamecontrol').update('4tzc7uycnxkvtkr', {
                        stopposition: client.FieldValue.arrayRemove(1)
                    }).then(res => {
                        console.log(res);
                    }).catch(err => {
                        console.log(err);
                    });
                }
                break;
            case '8c6nk74d1xd4uv7':
                if (value == 0) {
                    client.collection('gamecontrol').update('4tzc7uycnxkvtkr', {
                        stopposition: client.FieldValue.arrayRemove(2)
                    }).then(res => {
                        console.log(res);
                    }).catch(err => {
                        console.log(err);
                    });
                }
                break;
            case 'rtqf0fjedh7as7s':
                if (value == 0) {
                    client.collection('gamecontrol').update('4tzc7uycnxkvtkr', {
                        stopposition: client.FieldValue.arrayRemove(3)
                    }).then(res => {
                        console.log(res);
                    }).catch(err => {
                        console.log(err);
                    });
                }
                break;

            default:
                break;
        }


    };


    return (
        <div className='container text-center mt-5 align-items-center justify-content-center'>
            {/* {adminLogin ? <h1>Admin Control</h1> : null} */}
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

                                            <div className='d-flex align-items-center justify-content-center '>
                                                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={isGamePaused} onChange={e => {

                                                    setIsGamePaused(e.target.checked);
                                                    handleGameStart(e);
                                                }} />
                                                <div className='mx-2'>
                                                    {isGamePaused ? <label htmlFor="flexSwitchCheckChecked">เกมดาวตกหยุดอยู่</label> : <label htmlFor="flexSwitchCheckChecked">เกมดาวตกเปิดอยู่</label>}
                                                </div>
                                            </div>

                                        </div>
                                        {/* <div className='form-control'>
                                            <label htmlFor="starPoint">ใส่คะแนนหมุนวงล้อ</label>
                                            <input type="number" className="form-control" id="starPoint" value={starPoint} onChange={e => {

                                                setStarPoint(e.target.value);
                                                hendleChangeStarPoint(e);
                                            }
                                            } />
                                        </div> */}

                                    </div>


                                </section>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg-6 mx-auto">
                                {Object.values(inventory).map((item, index) => {
                                    return (
                                        <div className="glass mb-3" key={index}>
                                            <div className="row g-0">
                                                <div className="col-md-6 d-flex align-items-center justify-content-center">
                                                    <img src={`${import.meta.env.VITE_POCKETBASE_FILE_URL}${item.collectionId}/${item.id}/${item.image}`} width="200px" />
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="card-body d-flex  align-items-center justify-content-center my-5">
                                                        {/* <h5 className="card-title">{item.name}</h5> */}

                                                        {/* <p className="card-text"> */}
                                                        <h4
                                                            className="text-muted">คงเหลือ
                                                            <input
                                                                type="number"
                                                                value={inventory[item.id]?.amount || 0}
                                                                className="form-control rounded-pill shadow w-50 mx-auto justify-content-end align-items-end mt-3 mb-3"
                                                                style={{ textAlign: 'right' }}
                                                                onChange={(e) => handleChange(e, item.id)}
                                                            />
                                                        </h4>
                                                        {/* </p> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                }
                            </div>
                        </div>
                    </>}
            </div>
        </div>
    )
}

export default Admin