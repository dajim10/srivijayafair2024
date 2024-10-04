import React, { useState, useEffect } from 'react'
import ExcelJs from 'exceljs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';

const ExportProgram = ({ data }) => {
    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet('สถิติการเข้าชมแต่ละสาขา');
    const [isExport, setIsExport] = useState(false);
    console.log(data)

    const handleExport = () => {
        setIsExport(true)
        if (!isExport) {
            return (
                <div>
                    <button className="btn btn-danger rounded-pill shadow mx-auto"><FontAwesomeIcon icon={faTable} /> {' '}Export to Excel</button>

                </div>
            )
        } else {
            worksheet.columns = [
                { header: 'ลำดับ', key: 'no', width: '5', alignment: { vertical: 'middle', horizontal: 'left' } },
                { header: 'คณะ', key: 'faculty', width: '40', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 'สาขา', key: 'program', width: '60', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 'บุคคลทั่วไป', key: 'education', width: '15', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 'นักเรียน-นักศึกษา', key: 'sex', width: '15', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 'บุคลากรมทร.ศรีวิชัย', key: 'prScore', width: '25', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 'นักศึกษามทร.ศรีวิชัย', key: 'prScore', width: '25', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 'ผู้ไม่ได้เข้าสู่ระบบลงทะเบียน', key: 'prScore', width: '25', alignment: { vertical: 'middle', horizontal: 'right' } },

            ];



            // worksheet.getRow(1).font = { bold: true, size: 16, name: 'san-serif' };


            data.map((item, key) => {
                worksheet.addRow
                    ([key + 1, item.expand.faculty.name,
                    item.name,
                    item.counter1,
                    item.counter2,
                    item.counter3,
                    item.counter4,
                    item.counter5
                    ])
            })

            // worksheet.addRow(['รวม', data.plan, data.confirm, data.report]);

            workbook.xlsx.writeBuffer().then((data) => {
                const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.setAttribute('download', 'userSurvey-data.xlsx');
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            }
            );
        }
    }

    return (
        <div>
            <button className="btn btn-danger rounded-pill shadow mx-auto" onClick={handleExport}><FontAwesomeIcon icon={faTable} />{' '}Export to Excel</button>
        </div>
    )
}

export default ExportProgram