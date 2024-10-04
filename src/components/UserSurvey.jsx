import React, { useState, useEffect } from 'react'
import { client } from '../lib/pocketbase'
import ExportSurvey from './ExportSurvey'



const UserSurvey = () => {

    const [clientUserSurvey, setclientUserSurvey] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            // Fetch data using pocketbase or other methods

            client.collection('survey').getFullList
                ({
                    sort: 'ageGroup'

                }).then((response) => {
                    console.log(response);
                    setclientUserSurvey(response);
                }).catch((error) => {
                    console.log(error);
                });
        };

        fetchData();
    }, []);

    return (
        <div className="container">

            <h4 className="text-center mb-5 p-2 glass">รายชื่อผู้ประเมินความพึงพอใจ
            </h4>
            <ExportSurvey data={clientUserSurvey} />

            <table className='table table-light table-striped table-hover' style={{ fontSize: '12px' }}>

                {clientUserSurvey && clientUserSurvey.length > 0 && (

                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>ชื่อ</th>
                            {/* <th>ช่วงอายุ</th> */}
                            <th>1.1</th>
                            <th>1.2</th>
                            <th>1.3</th>
                            <th>1.4</th>
                            <th>1.5</th>
                            <th>1.6</th>
                            <th>1.7</th>
                            <th>1.8</th>
                            <th>1.9</th>
                            <th>1.10</th>
                            <th>รูปแบบการจัดงาน</th>
                            {/* <th>Comments</th> */}


                        </tr>
                    </thead>
                )}
                {clientUserSurvey && clientUserSurvey.length > 0 && (
                    <tbody>
                        {clientUserSurvey.map((userSurvey, index) => (
                            <tr key={userSurvey.id}>
                                <td>{index + 1}</td>
                                <td>{userSurvey.fullname}</td>
                                {/* <td>{userSurvey.ageGroup}</td> */}
                                <td>{userSurvey.prScore}</td>
                                <td>{userSurvey.loginScore}</td>
                                <td>{userSurvey.exhibitionGuideScore}</td>
                                <td>{userSurvey.designScore}</td>
                                <td>{userSurvey.timeEventScore}</td>
                                <td>{userSurvey.knowledgeScore}</td>
                                <td>{userSurvey.presentationScore}</td>
                                <td>{userSurvey.accessScore}</td>
                                <td>{userSurvey.chatScore}</td>
                                <td>{userSurvey.satisfactionScore}</td>
                                <td>{userSurvey.timeEventFormat}</td>
                                <td>{userSurvey.registerScore}</td>
                                {/* <td>{userSurvey.comments}</td> */}

                                {/* <td>{userSurvey.address} </td> */}
                            </tr>
                        ))}
                    </tbody>
                )
                }

            </table>
        </div>
    )
}

export default UserSurvey