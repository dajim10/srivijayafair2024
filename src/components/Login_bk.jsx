import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { client } from '../lib/pocketbase';

export default function Login(props) {
    const [show, setShow] = useState(true);
    const [phone, setPhone] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => {
        navigate(-1);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await client.collection('register').getList(1, 1, { sort: '-created' });
        const lastItem = result.items[0];
        console.log(lastItem)

        // try {
        //     const data = await client.getFirstListItem(`phone=${phone}`, {
        //         expand: 'phone,fullname',
        //         // ... Other options if needed
        //     });

        //     console.log(data);
        // } catch (error) {
        //     console.error('Error fetching data:', error);
        // }



        // try {
        //     setIsLoading(true);
        //     // check if the user exists
        //     console.log(phone)
        //     const data = await client.collection('register').getFirstListItem(`phone=${phone}`, {
        //         expand: 'phone,fullname',
        //     });

        //     console.log('Filtered items:', data.items);
        //     if (data.items.length > 0) {
        //         setIsLogin(true);
        //         const expires = new Date();
        //         expires.setMinutes(expires.getMinutes() + 10);
        //         document.cookie = `phone=${phone};expires=${expires.toUTCString()};path=/`;
        //         navigate(-1);
        //     } else {
        //         setIsLogin(false); // Reset the login state if no user is found
        //         alert('ไม่พบผู้ใช้งาน');
        //     }
        // } catch (error) {
        //     console.error('Error querying Pocketbase:', error);
        //     alert('เกิดข้อผิดพลาดในการค้นหาข้อมูล');
        // } finally {
        //     setIsLoading(false);
        // }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>เข้าสู่ระบบ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>เบอร์โทร</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="ใส่เบอร์โทรศัพท์ที่สมัคร"
                                onChange={handlePhoneChange}
                                name="phone"
                                id="phone"
                                disabled={isLoading} // Disable input during loading
                            />
                        </Form.Group>
                        <div className='d-flex justify-content-center align-items-center ms-auto form-group'>
                            <Button variant="primary" type="submit" className="mt-2 mx-auto" disabled={isLoading}>
                                {isLoading ? 'Logging in...' : 'Login'}
                            </Button>
                            <Button variant="danger" type="reset" className='mt-2 mx-auto' onClick={handleClose} disabled={isLoading}>
                                Close
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer />
            </Modal>
            {isLogin && <div className="text-center">Login success</div>}
        </>
    );
}
