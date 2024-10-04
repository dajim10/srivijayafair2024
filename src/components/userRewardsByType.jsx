import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { client } from '../lib/pocketbase';

const YourComponent = () => {
    const [joinedData, setJoinedData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from the two collections
                // const registerResponse = await axios.get(`${import.meta.env.VITE_POCKETBASE_URL}api/collections/register/records`); // Replace with your actual API endpoint
                // const userRewardsResponse = await axios.get(`${import.meta.env.VITE_POCKETBASE_URL}api/collections/userRewards/records`); // Replace with your actual API endpoint

                const registerResponse = await client.collection('register').getFullList();
                const userRewardsResponse = await client.collection('userRewards').getFullList({ expand: 'rewardId' });

                // console.log(registerResponse)


                // Combine the data to simulate a join

                // Assuming your response is an array of register objects with a 'userId' property

                const joinedData = userRewardsResponse.map(userReward => {
                    const registerInfo = registerResponse.find(register => register.id === userReward.userId);
                    return {
                        ...userReward,
                        register_type: registerInfo?.register_type || 'Unknown', // Default to 'Unknown' if not found
                    };
                });

                console.log(joinedData)


                // const combinedData = userRewardsResponse.data.items.map(userReward => {
                //     const registerInfo = registerResponse.data.items.find(register => register.id === userReward.userId);
                //     return {
                //         ...userReward,
                //         register_type: registerInfo?.register_type || 'Unknown', // Default to 'Unknown' if not found
                //     };
                // });

                // setJoinedData(combinedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this useEffect will run once when the component mounts

    return (
        <div>
            <h1>Joined Data</h1>
            <ul>
                {joinedData.map(item => (
                    <li key={item.userId}>
                        ชื่อ{item.fullname}, Register Type: {item.register_type}, Reward: {item.rewardId}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default YourComponent;
