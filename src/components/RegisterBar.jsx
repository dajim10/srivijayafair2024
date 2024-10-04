import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { client } from '../lib/pocketbase';

const RegisterBar = () => {
    const [data, setData] = useState({});
    const [clientRegister, setClientRegister] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            // Fetch data using pocketbase or other methods
            await client.collection('register').getFullList().then((response) => {
                console.log(response);
                setClientRegister(response);
            }).catch((error) => {
                console.log(error);
            });
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Continue with axios request for API data or use clientRegister directly
        // setInterval(() => {
        axios.get(`${import.meta.env.VITE_POCKETBASE_URL}api/collections/register/records`)
            .then(response => {
                console.log('API Response:', response.data);
                // const register = response.data.items;
                const register = clientRegister;

                const registerCondition = [
                    { "register_type": 1, "label": "บุคคลทั่วไป" },
                    { "register_type": 2, "label": "นักเรียน-นักศึกษา" },
                    { "register_type": 3, "label": "บุคคลากรมทร.ศรีวิชัย" },
                    { "register_type": 4, "label": "นักศึกษามทร.ศรีวิชัย" },
                    // Add other register types as needed
                ];

                const colors =
                    ['rgba(230,164,180,1)', 'rgba(75,192,192,1)', 'rgba(255,248,192,1)', 'rgba(29,43,83,1)'];
                // Add more colors if needed

                const groupedData = register.reduce((acc, item) => {
                    const registerType = item.register_type;
                    const condition = registerCondition.find(cond => cond.register_type === registerType);
                    const label = condition ? condition.label : `Register Type ${registerType}`;

                    if (!acc[label]) {
                        acc[label] = 1;
                    } else {
                        acc[label]++;
                    }

                    return acc;
                }, {});

                const labels = Object.keys(groupedData);
                const chartData = {
                    // labels,
                    datasets: [
                        {
                            label: 'จำนวนผู้สมัคร',
                            data: labels.map(label => groupedData[label]),
                            borderColor: 'rgba(75,192,192,0.2)',
                            backgroundColor: colors.slice(0, labels.length),
                            borderWidth: 1,
                        },
                    ],
                };

                const chartOptions = {
                    scales: {
                        x: {
                            type: 'category',
                            labels: labels,
                        },
                        y: {
                            beginAtZero: true,
                        },
                    },
                };

                setData({ data: chartData, options: chartOptions });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [clientRegister]);
    // }, 60000);

    return (
        <div className='bg-light text-dark mb-2'>
            <h2 className='text-center nav-button'>สรุปข้อมูลผู้สมัครใช้ Platform</h2>
            {data.data && data.options && <Bar data={data.data} options={data.options} />}
        </div>
    );
};

export default RegisterBar;
