import React, { useState } from 'react';
import PocketBase from 'pocketbase';
const url = import.meta.env.VITE_POCKETBASE_URL;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';

const pb = new PocketBase(url);

const Login = () => {
    const [phone, setPhone] = useState('');

    const fetchFirstRecord = async () => {
        try {
            const record = await pb.collection('register').getFirstListItem(`phone="${phone}"`, {
                expand: 'fullname,email', // Add the fields you want to retrieve
            });

            console.log('First Record:', record);

            // Perform login logic based on the retrieved record
            if (record) {
                // Example: Check if the phone and email match certain conditions
                if (record.phone === phone) {
                    // Perform successful login logic here
                    console.log('Login successful!');
                } else {
                    console.log('Login failed. Invalid phone');
                }
            } else {
                console.log('Login failed. User not found.');
            }
        } catch (error) {
            console.error('Error fetching first record:', error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        await fetchFirstRecord();
    };

    return (
        <div className='container d-flex flex-column justify-content-center sticky-top' style={{ border: '6px solid #fff', borderRadius: '20px', boxShadow: '0 0 10px #ccc', backgroundColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(2px)', height: '50vh' }}>
            {/* <h1 className='text-dark'>Logged In : {pb.authStore.isValid.toString()}</h1> */}
            <div className="row">
                <div className="col col-lg-4 col-md-6 col-sm mx-auto">
                    <form className="form-group">

                        <h1 className='text-center' style={{ textShadow: '0 4px 3px #fff, 0 0 5px #fff' }}>Please Login  <FontAwesomeIcon icon={faKey} /></h1>
                        <input type="text" className="form-control" id="phone" placeholder="เบอร์โทร..." onChange={e => setPhone(e.target.value)} />
                    </form>
                    <button onClick={handleLogin} className='mt-3 rounded-pill btn btn-warning form-control ' style={{ border: '10px solid #fff' }}>Login</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
