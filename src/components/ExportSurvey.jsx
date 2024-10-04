import React, { useState, useEffect } from 'react'
import ExcelJs from 'exceljs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';

const ExportSurvey = ({ data }) => {
    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet('รายชื่อผู้ประเมินความพึงพอใจ');
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
                // { header: 'ลำดับ', key: 'name', width: '90', alignment: { vertical: 'middle', horizontal: 'left' } },
                { header: 'ชื่อ', key: 'ชื่อ', width: '20', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 'ช่วงอายุ', key: 'ageGroup', width: '15', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 'ระดับการศึกษา', key: 'education', width: '15', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 'sex', key: 'sex', width: '15', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 'ภูมิภาค', key: 'region', width: '15', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 1.1, key: 'prScore', width: '5', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 1.2, key: 'prScore', width: '5', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 1.3, key: 'prScore', width: '5', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 1.4, key: 'prScore', width: '5', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 1.5, key: 'prScore', width: '5', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 1.6, key: 'prScore', width: '5', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 1.7, key: 'prScore', width: '5', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 1.8, key: 'prScore', width: '5', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 1.9, key: 'prScore', width: '5', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 1.10, key: 'prScore', width: '5', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 'รูปแบบการจัดงาน', key: 'timeEventFormat', width: '40', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 'Comments', key: 'comments', width: '150', alignment: { vertical: 'middle', horizontal: 'right' } },
            ];



            // worksheet.getRow(1).font = { bold: true, size: 16, name: 'san-serif' };


            data.map(item => {
                worksheet.addRow
                    ([item.fullname,
                    item.ageGroup,
                    item.education,
                    item.gender,
                    item.region,
                    item.prScore,
                    item.loginScore,
                    item.exhibitionGuideScore,
                    item.designScore,
                    item.timeEventScore,
                    item.knowledgeScore,
                    item.presentationScore,
                    item.accessScore,
                    item.chatScore,
                    item.satisfactionScore,
                    item.timeEventFormat,
                    item.comments
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

export default ExportSurvey