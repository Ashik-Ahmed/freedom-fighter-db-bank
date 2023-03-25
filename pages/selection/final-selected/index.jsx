import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const FinalSelected = () => {

    const [events, setEvents] = useState([])
    const [event, setEvent] = useState('')
    const [year, setYear] = useState(null)
    const [loading, setLoading] = useState(false)
    const [finalSelected, setFinalSelected] = useState()

    // fetch available events from db 
    useEffect(() => {
        fetch('http://localhost:5000/api/v1/event')
            .then(res => res.json())
            .then(data => {
                setEvents(data.data)
            })
    }, [])

    const getFinalSelectedMembers = () => {

        const url = `http://localhost:5000/api/v1/selection/final-selection?event=${event.name}&year=${year.getFullYear()}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setFinalSelected(data.data)
            })
    }

    const sendInvitationMail = (member) => {

        const data = {
            memberId: member._id,
            eventToBeUpdate: event,
            mailData: {
                to: member.email,
                subject: `Invitation for ${event.name}-${year.getFullYear()}`,
                text: event.emailBody
            }
        }
        console.log(data);

        const url = 'http://localhost:5000/api/v1/selection/send-invitation-mail';
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }


    const header = (
        <div className='flex justify-between items-center'>
            <div className='flex  items-center gap-x-2 text-gray-800 text-xl font-bold'>
                {finalSelected && <p>Final Selected list for <span className='text-secondary'>`{event.name} - {year?.toString().slice(11, 15)}`</span></p>}
            </div>
        </div>
    );

    const invitationStatusBodyTemplate = (rowData) => {
        return (
            <div>
                <Button onClick={() => { sendInvitationMail(rowData) }} icon="pi pi-send" rounded outlined className="mr-2 p-button-sm" />
            </div>
        )
    }

    const cols = [
        { field: 'name', header: 'Name' },
        { field: 'category', header: 'Member Type' },
        { field: `mobile`, header: 'Contact no.' },
        { field: 'email', header: 'Email' },
        { field: 'address', header: 'Address' },
        // { header: 'Invitaion Status', body: { invitationStatusBodyTemplate } },
    ];

    return (
        <div>
            <div className='bg-white p-4 mt-2 w-fit mx-auto rounded-md shadow-lg'>
                <div className='flex gap-x-4'>
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
                        }} view="year" dateFormat="yy" placeholder='Year' required />
                    </div>
                    <Button onClick={getFinalSelectedMembers} label='Submit'></Button>
                </div>
            </div>

            {
                finalSelected &&
                <div className='bg-white p-2 max-w-7xl mx-auto rounded-md shadow-lg mt-4 min-h-[60vh]'>
                    <DataTable value={finalSelected} header={header} dataKey="id" size='small' responsiveLayout="scroll" scrollHeight="65vh" loading={loading} stripedRows>
                        {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column> */}
                        {
                            cols.map((col, index) => <Column key={index} field={col.field} header={col.header} />)
                        }
                        <Column header='Invitaion Status' body={invitationStatusBodyTemplate} exportable={false}></Column>
                    </DataTable>
                </div>
            }
        </div >
    );
};

export default FinalSelected;