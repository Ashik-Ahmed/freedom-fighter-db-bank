import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';

const PrimarySelected = () => {

    const [events, setEvents] = useState([])
    const [event, setEvent] = useState('')
    const [year, setYear] = useState(null)
    const [loading, setLoading] = useState(false)
    const [primarySelected, setPrimarySelected] = useState([])
    const [member, setMember] = useState('')
    const [verifyRejectDialogue, setVerifyRejectDialogue] = useState(false)

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

    const deleteMember = () => {
        console.log('delete product');
    }

    const header = (
        <div className='flex justify-between items-center'>
            <div className='flex  items-center gap-x-2 text-gray-800 text-xl font-bold'>
                <p>Primary Selected for <span className='text-secondary'>`{event.name}`</span></p>
            </div>
        </div>
    );

    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={() => setVerifyRejectDialogue(false)} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteMember} className='p-button-danger' />
        </React.Fragment>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <div>
                <Button onClick={() => editProduct(rowData)} icon="pi pi-pencil" rounded outlined className="mr-2 p-button-sm" />
                <Button onClick={() => {
                    setMember(rowData);
                    setVerifyRejectDialogue(true);
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
                        <Dropdown name='program' options={events} optionLabel='name' value={event}
                            onChange={(e) => {
                                setEvent(e.value)
                            }} placeholder="*Select Program" className='text-black w-full' required />
                    </div>
                    <div>
                        <Calendar value={year} onChange={(e) => {
                            setYear(e.value)
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

            <Dialog visible={verifyRejectDialogue} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={() => setVerifyRejectDialogue(false)}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3 text-red-600" style={{ fontSize: '2rem' }} />
                    {member && (
                        <span>
                            Are you sure you want to delete <b>{member.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
        </div>
    );
};

export default PrimarySelected;