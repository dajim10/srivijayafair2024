import React, { useState, useEffect } from 'react'
import { client } from '../lib/pocketbase'
import ExportToExcel from './ExportToExcel'



const UserRewards = () => {
    const [userRewards, setUserRewards] = useState({});
    const [clientUserRewards, setClientUserRewards] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            // Fetch data using pocketbase or other methods

            client.collection('userRewards').getFullList
                ({
                    expand: 'rewardId',
                    sort: 'province'

                }).then((response) => {
                    console.log(response);
                    setClientUserRewards(response);
                }).catch((error) => {
                    console.log(error);
                });
        };

        fetchData();
    }, []);

    return (
        <div className="container">

            <h4 className="text-center mb-5 p-2 glass">รายชื่อผู้ได้รับรางวัล <ExportToExcel data={clientUserRewards} /></h4>

            <table className='table table-light table-striped table-hover'>

                {clientUserRewards && clientUserRewards.length > 0 && (

                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>ชื่อ</th>
                            <th>รางวัล</th>
                            <th>Phone</th>
                            <th>ที่อยู่จัดส่ง</th>
                        </tr>
                    </thead>
                )}
                {clientUserRewards && clientUserRewards.length > 0 && (
                    <tbody>
                        {clientUserRewards.map((userReward, index) => (
                            <tr key={userReward.id}>
                                <td>{index + 1}</td>
                                <td>{userReward.fullname}</td>
                                <td>{userReward.expand.rewardId.name}</td>
                                <td>{userReward.phone}</td>
                                <td>{userReward.house} ต.{userReward.tambon} อ.{userReward.amphure} จ.{userReward.province} {userReward.zip_code}</td>
                            </tr>
                        ))}
                    </tbody>
                )
                }

            </table>
        </div>
    )
}

export default UserRewards