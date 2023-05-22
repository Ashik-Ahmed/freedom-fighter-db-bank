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
        documentTitle: "ReportData",
        onAfterPrint: () => alert('Data Saved in PDF')
    })

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
                <div className='bg-white p-2 max-w-7xl mx-auto rounded-md shadow-lg mt-2 min-h-[70vh]'>
                    {/* <DataTable id='element-to-export' value={report} header={header} sortMode="single" sortField="force" sortOrder={1} dataKey="id" size='small' showGridlines responsiveLayout="scroll" scrollHeight="70vh" loading={loading} stripedRows>
                        <Column key='force' field="force" header="Force" style={{ minWidth: '200px' }}></Column>
                        <Column field='totalAliveOfficer' header="Sent" body={sentBodyTemplate} style={{ minWidth: '200px' }}></Column>
                        <Column field="force" header="Total Sent" body={totalSentBodyTemplate}></Column>
                        <Column field="force" header="Accepted" ></Column>
                        <Column field="force" header="Dead" ></Column>
                        <Column field="force" header="Invitation Proposal"></Column>
                        <Column field="force" header="Selected in previous year" ></Column>
                        <Column field="force" header="Final Proposal"></Column>
                    </DataTable> */}
                    {/* <DataTable value={report} rowGroupMode="subheader" groupRowsBy="force" sortMode="single" sortField="force"
                        sortOrder={1} scrollable scrollHeight="400px" rowGroupHeaderTemplate={headerTemplate} rowGroupFooterTemplate={footerTemplate} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="fields" header="Name" style={{ minWidth: '200px' }}></Column>
                        <Column field="totalAliveOfficer" header="Country" style={{ minWidth: '200px' }}></Column>
                        <Column field="company" header="Company" style={{ minWidth: '200px' }}></Column>
                        <Column field="status" header="Status" style={{ minWidth: '200px' }}></Column>
                        <Column field="date" header="Date" style={{ minWidth: '200px' }}></Column>
                    </DataTable> */}
                    <Button label='Export PDF' onClick={generatePDF} />
                    <div ref={componentPDF}>
                        <table border='2' className='w-full'>
                            <thead>
                                <tr>
                                    <th className='bg-blue-100 border text-left px-3 py-1'>Force</th>
                                    <th className='bg-blue-100 border text-left px-3 py-1'>Category</th>
                                    <th className='bg-blue-100 border text-left px-3 py-1'>Total Sent</th>
                                    <th className='bg-blue-100 border text-left px-3 py-1'>Approved</th>
                                    <th className='bg-blue-100 border text-left px-3 py-1'>Dead</th>
                                    <th className='bg-blue-100 border text-left px-3 py-1'>Proposed</th>
                                    <th className='bg-blue-100 border text-left px-3 py-1'>Invited {year.getFullYear() - 1}</th>
                                    <th className='bg-blue-100 border text-left px-3 py-1'>Proposed for {year.getFullYear()}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    report?.map((rowData, index) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td rowspan="4" className='border text-center'>{rowData.force}</td>
                                                    <td className='border'>Alive Officer</td>
                                                    <td className='border text-center'>{rowData.totalAliveOfficer}</td>
                                                    <td className='border text-center'>Cell 4</td>
                                                    <td className='border text-center'>Cell 5</td>
                                                    <td className='border text-center'>Cell 6</td>
                                                    <td className='border text-center'>Cell 7</td>
                                                    <td className='border text-center'>Cell 8</td>
                                                </tr>
                                                <tr>
                                                    <td className='border'>Alive JCO/OR</td>
                                                    <td className='border text-center'>{rowData.totalAliveOR}</td>
                                                    <td className='border text-center'>Cell 11</td>
                                                    <td className='border text-center'>Cell 12</td>
                                                    <td className='border text-center'>Cell 13</td>
                                                    <td className='border text-center'>Cell 14</td>
                                                    <td className='border text-center'>Cell 15</td>
                                                </tr>
                                                <tr>
                                                    <td className='border'>Martyred/Dead Officer</td>
                                                    <td className='border text-center'>{rowData.totalDeadOfficer}</td>
                                                    <td className='border text-center'>Cell 19</td>
                                                    <td className='border text-center'>Cell 20</td>
                                                    <td className='border text-center'>Cell 21</td>
                                                    <td className='border text-center'>Cell 22</td>
                                                    <td className='border text-center'>Cell 23</td>
                                                </tr>
                                                <tr>
                                                    <td className='border'>Martyred/Dead JCO/OR</td>
                                                    <td className='border text-center'>{rowData.totalDeadOR}</td>
                                                    <td className='border text-center'>Cell 27</td>
                                                    <td className='border text-center'>Cell 28</td>
                                                    <td className='border text-center'>Cell 29</td>
                                                    <td className='border text-center'>Cell 30</td>
                                                    <td className='border text-center'>Cell 31</td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                                {/* {
                                report?.map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td rowspan="4">First Cell</td>
                                            <td>Column 1</td>
                                            <td>Column 2</td>
                                            <td>Column 3</td>
                                            <td>Column 4</td>
                                            <td>Column 5</td>
                                            <td>Column 6</td>
                                            <td>Column 7</td>
                                        </tr>
                                    )
                                })
                            } */}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div >
    );
};

export default Reports;