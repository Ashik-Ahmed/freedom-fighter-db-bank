import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import React, { useEffect, useState } from 'react';
import html2canvas from "html2canvas";
import pdfMake from "pdfmake";
import jsPDF from 'jspdf';

const Reports = () => {

    const [members, setMembers] = useState([])
    const [groupedData, setGroupedData] = useState({})
    const [events, setEvents] = useState([]);
    const [event, setEvent] = useState();
    const [year, setYear] = useState()
    const [formData, setFormData] = useState()
    const [loading, setLoading] = useState(false)

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
    console.log(typeof (groupedMembers));

    const handleGenerateReport = (e) => {
        e.preventDefault()
        console.log(formData.year.getFullYear());
        console.log(year);
    }

    const memberBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <span className="font-bold">{rowData.force}</span>
            </div>
        );
    }

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

    const acceptedBodyTemplate = (rowData) => {
        return (
            <div>
                <p className='border-b'>30</p>
                <p className='border-b'>30</p>
                <p className='border-b'>30</p>
                <p>30</p>
            </div>
        )
    }

    const deadBodyTemplate = (rowData) => {
        return (
            <div>
                <p className='border-b'>30</p>
                <p className='border-b'>30</p>
                <p className='border-b'>30</p>
                <p>30</p>
            </div>
        )
    }

    const invitationProposedBodyTemplate = (rowData) => {
        return (
            <div>
                <p className='border-b'>30</p>
                <p className='border-b'>30</p>
                <p className='border-b'>30</p>
                <p>30</p>
            </div>
        )
    }

    const previousYearSelectionBodyTemplate = (rowData) => {
        return (
            <div>
                <p className='border-b'>30</p>
                <p className='border-b'>30</p>
                <p className='border-b'>30</p>
                <p>30</p>
            </div>
        )
    }

    const finalProposalBodyTemplate = (rowData) => {
        return (
            <div>
                <p className='border-b'>30</p>
                <p className='border-b'>30</p>
                <p className='border-b'>30</p>
                <p>30</p>
            </div>
        )
    }

    const cols = [
        { field: 'force', header: 'Force', body: { memberBodyTemplate } },
        { header: "Sent", body: { sentBodyTemplate } },
        { header: "Total Sent", body: { totalSentBodyTemplate } },
        { header: "Accepted", body: { acceptedBodyTemplate } },
        { header: "Dead", body: { deadBodyTemplate } },
        { header: "Invitation Proposal", body: { invitationProposedBodyTemplate } },
        { header: "Selected in previous year", body: { previousYearSelectionBodyTemplate } },
        { header: "Final Proposal", body: { finalProposalBodyTemplate } }
    ];

    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));



    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);

                doc.autoTable(exportColumns, members);
                doc.save('products.pdf');
            });
        });
    };


    const exportToPDF = () => {
        const doc = new jsPDF();

        // Get the element you want to export
        const element = document.getElementById('element-to-export');

        // Calculate the height and width of the element
        const width = element.offsetWidth;
        const height = element.offsetHeight;

        // Create a canvas element to convert the HTML to an image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        // Convert the HTML element to an image
        html2canvas(element).then(canvas => {
            const imageData = canvas.toDataURL('image/png');

            // Add the image to the PDF document
            doc.addImage(imageData, 'PNG', 0, 0, width, height);

            // Save the PDF
            doc.save('export.pdf');
        });
    };



    const header = (
        <div className='flex justify-between items-center'>
            <div className='flex  items-center gap-x-2 text-gray-800 text-xl font-bold'>
                {members && <p>Report Generated for Event</p>}
            </div>
            <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportToPDF} data-pr-tooltip="PDF" />
        </div>
    );

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
                groupedMembers &&
                <div className='bg-white p-2 max-w-7xl mx-auto rounded-md shadow-lg mt-2 min-h-[70vh]'>
                    <DataTable id='element-to-export' value={members} header={header} rowGroupMode="rowspan" groupRowsBy='force' sortMode="single" sortField="force" sortOrder={1} dataKey="id" size='small' showGridlines responsiveLayout="scroll" scrollHeight="70vh" loading={loading} stripedRows>
                        {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column> */}
                        {/* {
                            cols.map((col, index) => <Column key={index} field={col.field} header={col.header} />)
                        } */}
                        {/* <Column header='Name' field='name' exportable={false}></Column> */}
                        {/* <Column header="#" body={(data, options) => options.rowIndex + 1} style={{ minWidth: '200px' }}></Column> */}
                        <Column field="force" header="Force" body={memberBodyTemplate} style={{ minWidth: '200px' }}></Column>
                        <Column field="force" header="Sent" body={sentBodyTemplate} style={{ minWidth: '200px' }}></Column>
                        <Column field="force" header="Total Sent" body={totalSentBodyTemplate}></Column>
                        <Column field="force" header="Accepted" body={acceptedBodyTemplate}></Column>
                        <Column field="force" header="Dead" body={deadBodyTemplate}></Column>
                        <Column field="force" header="Invitation Proposal" body={invitationProposedBodyTemplate}></Column>
                        <Column field="force" header="Selected in previous year" body={previousYearSelectionBodyTemplate}></Column>
                        <Column field="force" header="Final Proposal" body={finalProposalBodyTemplate}></Column>
                    </DataTable>
                </div>
            }
        </div >
    );
};

export default Reports;