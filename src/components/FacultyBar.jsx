import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'chart.js/auto';

import { Bar } from 'react-chartjs-2';

const FacultyBar = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        // setInterval(() => {
        axios.get(`${import.meta.env.VITE_POCKETBASE_URL}api/collections/faculty/records`)
            // axios.get(`https://api.rmutsv.ac.th/counter/faculty`)
            .then(response => {
                // console.log('API Response:', response.data);
                const programs = response.data.items;

                if (programs && programs.length > 0) {
                    const labels = programs.map(program => program.name);
                    const counter1Data = programs.map(program => program.counter1);
                    const counter2Data = programs.map(program => program.counter2);
                    const counter3Data = programs.map(program => program.counter3);
                    const counter4Data = programs.map(program => program.counter4);
                    const counter5Data = programs.map(program => program.counter5);

                    const chartData = {
                        labels,
                        datasets: [
                            {
                                label: 'บุคคลทั่วไป',
                                data: counter1Data,
                                borderColor: 'rgba(75,192,192,0.2)',
                                backgroundColor: 'rgba(75,192,192,1)',
                                borderWidth: 1,
                            },
                            {
                                label: 'นักเรียน-นักศึกษา',
                                data: counter2Data,
                                borderColor: 'rgba(255,255,255,0.2)',
                                backgroundColor: 'rgba(255,248,192,1)',
                                borderWidth: 1,
                            },
                            {
                                label: 'บุคลกรมทร.ศรีวิชัย',
                                data: counter3Data,
                                borderColor: 'rgba(255,255,255,0.2)',
                                backgroundColor: 'rgba(230,164,180,1)',
                                borderWidth: 1,
                            },
                            {
                                label: 'นักศึกษามทร.ศรีวิชัย',
                                data: counter4Data,
                                borderColor: 'rgba(255,255,255,0.2)',
                                backgroundColor: 'rgba(29,43,83,1)',
                                borderWidth: 1,
                            },
                            {
                                label: 'ไม่เข้าสู่ระบบ',
                                data: counter5Data,
                                borderColor: 'rgba(255,255,255,0.2)',
                                backgroundColor: 'rgba(192,255,255,1)',
                                borderWidth: 1,
                            }
                            // ... (similar code for other counters)
                        ],
                    };

                    const chartOptions = {
                        scales: {
                            x: {
                                type: 'category', // Use 'category' instead of 'category' inside xAxes
                                labels: labels,
                            },
                            y: {
                                beginAtZero: true,
                            },
                        },
                    };

                    setData({ data: chartData, options: chartOptions });
                } else {
                    console.error('Empty or undefined programs array.');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    // }, 60000);

    return (
        <div className='bg-light text-dark mb-2'>
            <h2 className='text-center nav-button'>จำนวนครั้งผู้เข้าเยี่ยมชมในแต่ละคณะ</h2>
            {data.data && data.options && (
                <Bar data={data.data} options={data.options} />
            )}
        </div>
    );
};

export default FacultyBar;
