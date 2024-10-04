import React, { useState, useEffect } from 'react'
import { client } from '../lib/pocketbase'
import ExportProgram from './ExportProgram'



const UserProgram = () => {
    const [userProgram, setuserProgram] = useState({});
    const [clientuserProgram, setClientuserProgram] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            // Fetch data using pocketbase or other methods

            client.collection('program').getFullList
                ({
                    expand: 'faculty',
                    sort: 'name'

                }).then((response) => {
                    // console.log(response);
                    setClientuserProgram(response);
                }).catch((error) => {
                    console.log(error);
                });
        };

        fetchData();
    }, []);

    return (
        <div className="container">

            <h4 className="text-center mb-5 p-2 glass">สถิติการเข้าชมแต่ละสาขา
                <ExportProgram data={clientuserProgram} /></h4>

            <table className='table table-light table-striped table-hover'>

                {clientuserProgram && clientuserProgram.length > 0 && (

                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>คณะ</th>
                            <th>สาขา</th>
                            <th>บุคคลทั่วไป</th>
                            <th>นักเรียน-นักศึกษา</th>
                            <th>บุคลากรมทร.ศรีวิชัย</th>
                            <th>นักศึกษามทร.ศรีวิชัย</th>
                            <th>ผู้ไม่ได้เข้าสู่ระบบลงทะเบียน</th>
                        </tr>
                    </thead>
                )}
                {clientuserProgram && clientuserProgram.length > 0 && (
                    <tbody>
                        {clientuserProgram.map((userProgram, index) => (
                            <tr key={userProgram.id}>
                                <td>{index + 1}</td>
                                <td>{userProgram.expand.faculty.name}</td>
                                <td>{userProgram.name}</td>
                                <td>{userProgram.counter1}</td>
                                <td>{userProgram.counter2}</td>
                                <td>{userProgram.counter3}</td>
                                <td>{userProgram.counter4}</td>
                                <td>{userProgram.counter5}</td>

                            </tr>
                        ))}
                    </tbody>
                )
                }

            </table>
        </div>
    )
}

export default UserProgram