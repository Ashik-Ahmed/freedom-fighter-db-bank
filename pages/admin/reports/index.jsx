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

        getAllMembers()

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

    // get members 
    const getAllMembers = () => {
        setLoading(true)
        var url = `http://localhost:5000/api/v1/freedomFighters?page=${1})}`

        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data.freedomFighters);
                setMembers(data.freedomFighters);
                setLoading(false)
            })
    }

    // group members by their force
    const groupedMembers = members.reduce((acc, curr) => {
        if (!acc[curr.force]) {
            acc[curr.force] = [];
        }

        acc[curr.force].push(curr);

        return acc;
    }, {});
    // setGroupedData(groupedMembers)
    // console.log(typeof (groupedMembers));

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
    });



    // const memberBodyTemplate = (rowData) => {
    //     return (
    //         <div className="flex align-items-center gap-2">
    //             <span className="font-bold">{rowData.force}</span>
    //         </div>
    //     );
    // }

    const sentBodyTemplate = (rowData) => {
        return (
            <div>
                <p className='border-b'>Alive Officer</p>
                <p className='border-b'>Alive JCO/OR</p>
                <p className='border-b'>Martyred/Dead Officer</p>
                <p>Dead JCO/OR</p>
            </div>
        )
    }

    const totalSentBodyTemplate = (rowData) => {
        return (
            <div>
                <p className='border-b'>30</p>
                <p className='border-b'>30</p>
                <p className='border-b'>30</p>
                <p>30</p>
            </div>
        )
    }

    // const acceptedBodyTemplate = (rowData) => {
    //     return (
    //         <div>
    //             <p className='border-b'>30</p>
    //             <p className='border-b'>30</p>
    //             <p className='border-b'>30</p>
    //             <p>30</p>
    //         </div>
    //     )
    // }

    // const deadBodyTemplate = (rowData) => {
    //     return (
    //         <div>
    //             <p className='border-b'>30</p>
    //             <p className='border-b'>30</p>
    //             <p className='border-b'>30</p>
    //             <p>30</p>
    //         </div>
    //     )
    // }

    // const invitationProposedBodyTemplate = (rowData) => {
    //     return (
    //         <div>
    //             <p className='border-b'>30</p>
    //             <p className='border-b'>30</p>
    //             <p className='border-b'>30</p>
    //             <p>30</p>
    //         </div>
    //     )
    // }

    // const previousYearSelectionBodyTemplate = (rowData) => {
    //     return (
    //         <div>
    //             <p className='border-b'>30</p>
    //             <p className='border-b'>30</p>
    //             <p className='border-b'>30</p>
    //             <p>30</p>
    //         </div>
    //     )
    // }

    // const finalProposalBodyTemplate = (rowData) => {
    //     return (
    //         <div>
    //             <p className='border-b'>30</p>
    //             <p className='border-b'>30</p>
    //             <p className='border-b'>30</p>
    //             <p>30</p>
    //         </div>
    //     )
    // }

    // const cols = [
    //     { field: 'force', header: 'Force', body: { memberBodyTemplate } },
    //     { header: "Sent", body: { sentBodyTemplate } },
    //     { header: "Total Sent", body: { totalSentBodyTemplate } },
    //     { header: "Accepted", body: { acceptedBodyTemplate } },
    //     { header: "Dead", body: { deadBodyTemplate } },
    //     { header: "Invitation Proposal", body: { invitationProposedBodyTemplate } },
    //     { header: "Selected in previous year", body: { previousYearSelectionBodyTemplate } },
    //     { header: "Final Proposal", body: { finalProposalBodyTemplate } }
    // ];

    // const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));



    // const exportPdf = () => {
    //     import('jspdf').then((jsPDF) => {
    //         import('jspdf-autotable').then(() => {
    //             const doc = new jsPDF.default(0, 0);

    //             doc.autoTable(exportColumns, members);
    //             doc.save('products.pdf');
    //         });
    //     });
    // };


    // const exportToPDF = async () => {
    //     const pdfDoc = await PDFDocument.create();

    //     // Create a new page
    //     const page = pdfDoc.addPage();

    //     // Get the dynamic data and render it on the page
    //     const text = members.map(item => item.name).join('\n');
    //     page.drawText(text, { x: 50, y: 500, size: 12, color: rgb(0, 0, 0) });

    //     // Generate the PDF document as a Uint8Array
    //     const pdfBytes = await pdfDoc.save();

    //     // Save the PDF file
    //     const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    //     const url = URL.createObjectURL(blob);
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.download = 'export.pdf';
    //     link.click();
    //     URL.revokeObjectURL(url);
    // };



    const header = (
        <div className='flex justify-between items-center'>
            <div className='flex  items-center gap-x-2 text-gray-800 text-xl font-bold'>
                {members && <p>Report Generated for Event</p>}
            </div>
            {/* <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" /> */}
        </div>
    );

    const headerTemplate = (data) => {
        return (
            <div className="flex align-items-center gap-2">
                <span className="font-bold">{data.force}</span>
            </div>
        );
    };

    const footerTemplate = (data) => {
        return (
            <React.Fragment>
                <td colSpan="5">
                    <div className="flex justify-content-end font-bold w-full">Total Customers: 19</div>
                </td>
            </React.Fragment>
        );
    };

    const fields = ['Total Sent', 'Approved', 'Rejected', 'Invitation Proposed']

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
                                                <td className='border text-center'>Cell 3</td>
                                                <td className='border text-center'>Cell 4</td>
                                                <td className='border text-center'>Cell 5</td>
                                                <td className='border text-center'>Cell 6</td>
                                                <td className='border text-center'>Cell 7</td>
                                                <td className='border text-center'>Cell 8</td>
                                            </tr>
                                            <tr>
                                                <td className='border'>Alive JCO/OR</td>
                                                <td className='border text-center'>Cell 10</td>
                                                <td className='border text-center'>Cell 11</td>
                                                <td className='border text-center'>Cell 12</td>
                                                <td className='border text-center'>Cell 13</td>
                                                <td className='border text-center'>Cell 14</td>
                                                <td className='border text-center'>Cell 15</td>
                                            </tr>
                                            <tr>
                                                <td className='border'>Martyred/Dead Officer</td>
                                                <td className='border text-center'>Cell 18</td>
                                                <td className='border text-center'>Cell 19</td>
                                                <td className='border text-center'>Cell 20</td>
                                                <td className='border text-center'>Cell 21</td>
                                                <td className='border text-center'>Cell 22</td>
                                                <td className='border text-center'>Cell 23</td>
                                            </tr>
                                            <tr>
                                                <td className='border'>Martyred/Dead JCO/OR</td>
                                                <td className='border text-center'>Cell 26</td>
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
            }
        </div >
    );
};

export default Reports;