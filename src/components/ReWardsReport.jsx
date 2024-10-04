import React, { useState, useEffect } from 'react';
import { client } from '../lib/pocketbase';
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

const ReWardsReport = () => {
    const [clientRewards, setClientRewards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await client.collection('userRewards').getFullList({ expand: ['rewardId'] });
                console.log(response);

                // Assuming your response is an array of reward objects with a 'rewardId' property
                const rewardsData = response.map(reward => ({
                    name: reward.expand.rewardId.name,
                    rewardId: reward.rewardId,
                    // Add other properties if needed
                }));
                console.log(rewardsData);

                setClientRewards(rewardsData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    // Prepare data for the pie chart
    const rewardCounts = clientRewards.reduce((acc, reward) => {
        const name = reward.name;
        acc[name] = (acc[name] || 0) + 1;
        return acc;
    }, {});

    const totalCount = Object.values(rewardCounts).reduce((sum, count) => sum + count, 0);


    // Prepare data for the pie chart
    const data = {
        labels: Object.keys(rewardCounts),
        datasets: [
            {
                data: Object.values(rewardCounts),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    // Add more colors as needed
                ],
            },
        ],
    };

    return (
        <div className='container text-center glass' >
            <h1>รายงานรางวัล</h1>
            <div className="row">
                <div className="col-lg-4 mx-auto">
                    <h4>รางวัลทั้งหมด</h4>
                    <Pie data={data} />
                </div>


            </div>

            <h5>รวมทั้งหมด {totalCount} รางวัล</h5>
        </div>
    );
};

export default ReWardsReport;
