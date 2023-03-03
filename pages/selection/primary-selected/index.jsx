import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

const PrimarySelected = () => {

    const [events, setEvents] = useState([])
    const [event, setEvent] = useState('')
    const [year, setYear] = useState(null)
    const [loading, setLoading] = useState(false)
    const [primarySelected, setPrimarySelected] = useState()
    const [member, setMember] = useState('')
    const [verifyStatus, setVerifyStatus] = useState('')
    const [verificationUpdateDialogue, setVerificationUpdateDialogue] = useState(false)

    // fetch available events from db 
    useEffect(() => {
        fetch('http://localhost:5000/api/v1/event')
            .then(res => res.json())
            .then(data => {
                setEvents(data.data)
            })
    }, [])

    const getPrimarySelectedMembers = (e) => {
        e.preventDefault();
        setLoading(true)
        const url = `http://localhost:5000/api/v1/selection/primary-selection?event=${event.name}&year=${year.getFullYear()}`

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setPrimarySelected(data.data)
                setLoading(false)
            })
    }

    const verifyStatusUpdate = (e) => {
        e.preventDefault()

        var verificationStatus = {}
        if (verifyStatus == 'Failed') {
            verificationStatus = {
                status: verifyStatus,
                reason: e.target.rejectionReason.value
            }
            console.log(verificationStatus);
        }
        else {
            verificationStatus = {
                status: verifyStatus
            }
            console.log(verificationStatus);
        }
        // console.log(e.target.rejectionReason.value, verifyStatus);
    }

    const header = (
        <div className='flex justify-between items-center'>
            <div className='flex  items-center gap-x-2 text-gray-800 text-xl font-bold'>
                {primarySelected && <p>Primary Selected for <span className='text-secondary'>`{event.name} - {year?.toString().slice(11, 15)}`</span></p>}
            </div>
        </div>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <div>
                <Button onClick={() => {
                    setMember(rowData)
                    setVerifyStatus('Success')
                    setVerificationUpdateDialogue(true);
                }} icon="pi pi-check" rounded outlined className="mr-2 p-button-sm" />
                <Button onClick={() => {
                    setMember(rowData);
                    setVerifyStatus('Failed')
                    setVerificationUpdateDialogue(true);
                }} icon="pi pi-times" rounded outlined severity="danger" className='p-button-sm p-button-danger' />
            </div>
        );
    };

    const cols = [
        { field: 'name', header: 'Name' },
        { field: 'category', header: 'Member Type' },
        { field: `mobile`, header: 'Contact no.' },
        { field: 'email', header: 'Email' },
        { field: 'address', header: 'Address' },
    ];

    return (
        <div>
            <div className='bg-white p-4 mt-2 w-fit mx-auto rounded-md shadow-lg'>
                <form onSubmit={getPrimarySelectedMembers} className='flex gap-x-4'>
                    <div>
                        <Dropdown name='event' options={events} optionLabel='name' value={event}
                            onChange={(e) => {
                                setEvent(e.value)
                            }} placeholder="*Select Event" required />
                    </div>
                    <div>
                        <Calendar value={year} onChange={(e) => {
                            setYear(e.value)
                            console.log(typeof e.value);
                        }} view="year" dateFormat="yy" placeholder='Year' />
                    </div>
                    <Button type='submit' label='Submit' className='p-button-info p-button-sm normal-case'></Button>
                </form>
            </div>

            <div className='bg-white p-2 max-w-7xl mx-auto rounded-md shadow-lg mt-4 min-h-[60vh]'>
                <DataTable value={primarySelected} header={header} dataKey="id" size='small' responsiveLayout="scroll" scrollHeight="65vh" loading={loading} stripedRows>
                    {
                        cols.map((col, index) => <Column key={index} field={col.field} header={col.header} />)
                    }
                    <Column header='Verification Status' body={actionBodyTemplate} exportable={false}></Column>
                </DataTable>
            </div>

            <Dialog visible={verificationUpdateDialogue} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Verification Status" modal onHide={() => setVerificationUpdateDialogue(false)}>
                <form onSubmit={verifyStatusUpdate} className="confirmation-content">
                    <div>
                        <p className='font-semibold'>Status: <span className={(verifyStatus == 'Failed') ? 'text-white bg-red-500 p-1' : 'bg-primary p-1'}>{verifyStatus}</span></p>
                    </div>
                    {
                        verifyStatus == 'Failed' &&
                        <div className="relative mt-4">
                            <span className='p-float-label'>
                                <InputText name='rejectionReason' type="text" id="rejectionReason" className="block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 hover:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="rejectionReason">Specify the Reason</label>
                            </span>
                        </div>
                    }
                    {/* <i className="pi pi-exclamation-triangle mr-3 text-red-600" style={{ fontSize: '2rem' }} />
                    {member && (
                        <span>
                            Are you sure you want to delete <b>{member.name}</b>?
                        </span>
                    )} */}
                    <div className='text-right mt-4'>
                        {/* <Button label="No" icon="pi pi-times" outlined onClick={() => setVerificationUpdateDialogue(false)} className='mr-2' /> */}
                        <Button type='submit' label="Submit" />
                    </div>
                </form>
            </Dialog>
        </div >
    );
};

export default PrimarySelected;