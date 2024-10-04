import React, { useState, useEffect } from 'react'
import ExcelJs from 'exceljs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';

const ExportToExcel = ({ data }) => {
    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet('รายงานข้อมูลผู้ได้รับรางวัล');
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
                { header: 'ลำดับ', key: 'name', width: '10', alignment: { vertical: 'middle', horizontal: 'left' } },
                { header: 'ชื่อ', key: 'fullname', width: '15', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 'รางวัล', key: 'expand.rewardId.name.', width: '15', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 'phone', key: 'phone', width: '15', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 'เลขที่', key: 'house', width: '80', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 'ถนน', key: 'road', width: '15', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 'ตำบล', key: 'tambon', width: '15', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 'อำเภอ', key: 'amphure', width: '15', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 'จังหวัด', key: 'province', width: '15', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 'รหัสไปรษณีย์', key: 'zip_code', width: '15', alignment: { vertical: 'middle', horizontal: 'right' } },
            ];



            worksheet.getRow(1).font = { bold: true, size: 16 };


            data.map((item, key) => {
                worksheet.addRow([key + 1, item.fullname, item.expand.rewardId.name, item.phone, item.house, item.road, item.tambon, item.amphure, item.province, item.zip_code])
            })

            // worksheet.addRow(['รวม', data.plan, data.confirm, data.report]);

            workbook.xlsx.writeBuffer().then((data) => {
                const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.setAttribute('download', 'userRewards-data.xlsx');
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

export default ExportToExcel