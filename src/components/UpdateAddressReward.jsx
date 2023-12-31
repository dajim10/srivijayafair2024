import React, { useState, useEffect } from 'react';
import { client } from '../lib/pocketbase';
import { useNavigate } from 'react-router-dom';

const UpdateAddressReward = ({ id }) => {
    console.log(id)
    const [house, setHouse] = useState('');
    const [road, setRoad] = useState('');
    const [subDistrict, setSubDistrict] = useState('');
    const [district, setDistrict] = useState('');
    const [province, setProvince] = useState('');
    const [postalCode, setPostalCode] = useState('');


    const navigate = useNavigate();
    const recordId = id;



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!recordId) {
            console.error('recordId is not defined');
            return;
        }

        const record = await client.collection('userRewards').update(recordId, {
            house: house,
            road: road,
            subDistrict: subDistrict,
            district: district,
            province: province,
            postalCode: postalCode,
        }).then(res => {
            console.log(res);
            navigate('/rewards');
        }).catch(err => {
            console.log(err);
        });
    }



    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md mx-auto">
                    <form className='text-center glass p-2' onSubmit={e => handleSubmit(e)}>
                        <div className='form-group'>
                            <label htmlFor="id">
                                <input type="text" id="id" value={recordId} className='form-control' />
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="house">บ้านเลขที่</label>
                            <input type="text" className="form-control" id="house" value={house} onChange={(e) => setHouse(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="road">ถนน</label>
                            <input type="text" className="form-control" id="road" value={road} onChange={(e) => setRoad(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="subDistrict">ตำบล</label>
                            <input type="text" className="form-control" id="subDistrict" value={subDistrict} onChange={(e) => setSubDistrict(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="district">อำเภอ</label>
                            <input type="text" className="form-control" id="district" value={district} onChange={(e) => setDistrict(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="province">จังหวัด</label>
                            <input type="text" className="form-control" id="province" value={province} onChange={(e) => setProvince(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="postalCode">รหัสไปรษณีย์</label>
                            <input type="text" className="form-control" id="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                        </div>
                        <button className='button-85 mt-3' >บันทึก</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateAddressReward