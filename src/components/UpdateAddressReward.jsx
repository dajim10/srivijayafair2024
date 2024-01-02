import React, { useState, useEffect } from 'react';
import { client } from '../lib/pocketbase';

const UpdateAddressReward = () => {
    const phone = sessionStorage.getItem('phone');
    const [record, setRecord] = useState({
        house: '',
        road: '',
        subDistrict: '',
        district: '',
        province: '',
        postalCode: '',
    });

    useEffect(() => {
        // fetch data from pocketbase with phone number
        console.log(phone);
        const fetchData = async () => {
            client.collection('userRewards').getFirstListItem(`phone=${phone}`)
                .then((res) => {
                    console.log(res);

                }
                )
                .catch((err) => {
                    console.log(err);
                });

        };

        fetchData();
    }, [phone]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // Add logic to update the address in pocketbase
        // Use the values from the 'record' state
        // Example: await client.collection('userRewards').update(phone, { address, city, state, zip, country });
    };

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setRecord((prevRecord) => ({
            ...prevRecord,
            [id]: value
        }));
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center">Update Address</h1>
                    <form className="form-group" onSubmit={handleFormSubmit}>
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            placeholder="Enter Address"
                            value={record.house}
                            onChange={handleInputChange}
                        />
                        {/* Similar input fields for city, state, zip, and country */}
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateAddressReward;
