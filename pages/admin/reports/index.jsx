import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import React, { useEffect, useRef, useState } from 'react';
import html2canvas from "html2canvas";
import pdfMake from "pdfmake";
import jsPDF from 'jspdf';
import { PDFDocument, rgb } from 'pdf-lib';
import { useReactToPrint } from 'react-to-print';



const Reports = () => {

    const [members, setMembers] = useState([])
    const [groupedData, setGroupedData] = useState({})
    const [events, setEvents] = useState([]);
    const [event, setEvent] = useState();
    const [year, setYear] = useState()
    const [formData, setFormData] = useState()
    const [loading, setLoading] = useState(false)
    const [dummy, setDummy] = useState('Test Dummy Data')
    const [report, setReport] = useState()

    const componentPDF = useRef()

    // fetch available events from db 
    useEffect(() => {

        fetch('http://localhost:5000/api/v1/event')
            .then(res => res.json())
            .then(data => {
                setEvents(data.data)
            })
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData, [name]: value
        });
    }



    const handleGenerateReport = (e) => {
        e.preventDefault()
        const { program, year } = formData
        console.log(program.name, year.getFullYear());

        const url = `http://localhost:5000/api/v1/reports?event=${program.name}&year=${year.getFullYear()}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data.data)
                setReport(data.data)
            })
    }

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "ReportData"
    })

    const forces = ['Army', 'Navy', 'Air Force', 'Civil'];
    return (
        <div>
            <p className='text-xl font-bold mb-2'>Generate Report</p>
            <div className='bg-white p-4 w-fit mx-auto rounded-md shadow-lg'>

                <form onSubmit={handleGenerateReport} className='flex gap-x-4'>
                    <div>
                        <Dropdown name='program' options={events} optionLabel='name' value={event}
                            onChange={(e) => {
                                setEvent(e.value)
                                handleChange(e)
                            }}
                            placeholder="*Select Program" className=' w-full' required />
                    </div>
                    <div>
                        <Calendar name='year' id='year' value={year}
                            onChange={(e) => {
                                setYear(e.value)
                                handleChange(e)
                            }}
                            view="year" dateFormat="yy" placeholder='*Year' className='w-full' required />
                    </div>

                    <Button label='Submit' className='p-button-info p-button-sm  normal-case' type="submit" />
                </form>
            </div>

            {
                report &&
                <div className='bg-white p-2 max-w-[85vw] mx-auto rounded-md shadow-lg mt-2 min-h-[70vh]'>
                    <Button label='Export PDF' onClick={generatePDF} />
                    <div ref={componentPDF}>
                        <table className='w-full table-auto table-bordered '>
                            <caption className="caption-top">
                                <p className='text-lg font-bold text-black'>Security Clearance Report</p>
                            </caption>
                            <thead className='text-black'>
                                <tr>
                                    <th className='bg-blue-100 border text-left px-3 py-1'>Force</th>
                                    <th className='bg-blue-100 border text-left px-3 py-1'>Category</th>
                                    <th className='bg-blue-100 border text-left px-3 py-1'>Total Sent</th>
                                    <th className='bg-blue-100 border text-left px-3 py-1'>Approved</th>
                                    <th className='bg-blue-100 border text-left px-3 py-1'>Rejected</th>
                                    <th className='bg-blue-100 border text-left px-3 py-1'>Proposed</th>
                                    <th className='bg-blue-100 border text-left px-3 py-1'>Invited {year.getFullYear() - 1}</th>
                                    <th className='bg-blue-100 border text-left px-3 py-1'>Proposed for {year.getFullYear()}</th>
                                </tr>
                            </thead>
                            <tbody className='text-black'>
                                {
                                    report?.map((rowData, index) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td rowspan="4" className='border text-center'>{rowData.force}</td>
                                                    <td className='border'>Alive Officer</td>
                                                    <td className='border text-center'>{rowData.aliveOfficer >= 0 ? rowData.aliveOfficer : 'xx'}</td>
                                                    <td className='border text-center'>{rowData.aliveOfficerApproved >= 0 ? rowData.aliveOfficerApproved : 'xx'}</td>
                                                    <td className='border text-center'>{rowData.aliveOfficerRejected >= 0 ? rowData.aliveOfficerRejected : 'xx'}</td>
                                                    <td rowSpan='2' className='border text-center'>{rowData.totalAliveProposed >= 0 ? rowData.totalAliveProposed : 'xx'}</td>
                                                    <td className='border text-center'>{rowData.previousAliveOfficer >= 0 ? rowData.previousAliveOfficer : 'xx'}</td>
                                                    <td className='border text-center'>{rowData.aliveOfficerApproved >= 0 ? rowData.aliveOfficerApproved : 'xx'}</td>
                                                </tr>
                                                <tr>
                                                    <td className='border'>Alive JCO/OR</td>
                                                    <td className='border text-center'>{rowData.aliveJCO >= 0 ? rowData.aliveJCO : 'xx'}</td>
                                                    <td className='border text-center'>{rowData.aliveJCOApproved >= 0 ? rowData.aliveJCOApproved : 'xx'}</td>
                                                    <td className='border text-center'>{rowData.aliveJCORejected >= 0 ? rowData.aliveJCORejected : 'xx'}</td>
                                                    {/* <td className='border text-center'>Cell 13</td> */}
                                                    <td className='border text-center'>{rowData.previousAliveJCO >= 0 ? rowData.previousAliveJCO : 'xx'}</td>
                                                    <td className='border text-center'>{rowData.aliveJCOApproved >= 0 ? rowData.aliveJCOApproved : 'xx'}</td>
                                                </tr>
                                                <tr>
                                                    <td className='border'>Martyred/Dead Officer</td>
                                                    <td className='border text-center'>{rowData.deadOfficer >= 0 ? rowData.deadOfficer : 'xx'}</td>
                                                    <td className='border text-center'>{rowData.deadOfficerApproved >= 0 ? rowData.deadOfficerApproved : 'xx'}</td>
                                                    <td className='border text-center'>{rowData.deadOfficerRejected >= 0 ? rowData.deadOfficerRejected : 'xx'}</td>
                                                    <td rowSpan='2' className='border text-center'>{rowData.totalDeadProposed >= 0 ? rowData.totalDeadProposed : 'xx'}</td>
                                                    <td className='border text-center'>{rowData.previousDeadOfficer >= 0 ? rowData.previousDeadOfficer : 'xx'}</td>
                                                    <td className='border text-center'>{rowData.deadOfficerApproved >= 0 ? rowData.deadOfficerApproved : 'xx'}</td>
                                                </tr>
                                                <tr>
                                                    <td className='border'>Martyred/Dead JCO/OR</td>
                                                    <td className='border text-center'>{rowData.deadJCO >= 0 ? rowData.deadJCO : 'xx'}</td>
                                                    <td className='border text-center'>{rowData.deadJCOApproved >= 0 ? rowData.deadJCOApproved : 'xx'}</td>
                                                    <td className='border text-center'>{rowData.deadJCORejected >= 0 ? rowData.deadJCORejected : 'xx'}</td>
                                                    {/* <td className='border text-center'>Cell 29</td> */}
                                                    <td className='border text-center'>{rowData.previousDeadJCO >= 0 ? rowData.previousDeadJCO : 'xx'}</td>
                                                    <td className='border text-center'>{rowData.deadJCOApproved >= 0 ? rowData.deadJCOApproved : 'xx'}</td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div >
    );
};

export default Reports;