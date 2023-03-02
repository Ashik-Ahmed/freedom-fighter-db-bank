import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

const Events = () => {

    const cookie = new Cookies();

    const [loading, setLoading] = useState(false)
    const [events, setEvents] = useState([]);
    const [addEventModal, setAddEventModal] = useState(false)

    const getAllEvents = () => {
        setLoading(true)
        fetch('http://localhost:5000/api/v1/event')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setEvents(data.data)
                setLoading(false)
            })
    }

    useEffect(() => {
        getAllEvents();
    }, [])

    const header = (
        <div className='flex justify-between items-center'>
            <div className='flex  items-center gap-x-2 text-gray-800 text-xl font-bold'>
                <p>Event List</p>
            </div>
        </div>
    );

    const cols = [
        { field: 'name', header: 'Event' },
        { field: 'description', header: 'Description' }
    ];

    const handleAddEvent = (e) => {
        e.preventDefault();
        const name = e.target.name.value
        const description = e.target.description.value;

        const eventData = {
            name,
            description
        }

        fetch('http://localhost:5000/api/v1/event', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${cookie.get('TOKEN')}`
            },
            body: JSON.stringify(eventData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.status = 'success') {
                    setAddEventModal(false)
                    getAllEvents();
                }
            })
    }

    return (
        <div>
            <div className=' max-w-7xl mx-auto mt-4'>
                <Button label='Add Event' onClick={() => setAddEventModal(true)} />

                <Dialog header="Add New User" visible={addEventModal} onHide={() => {
                    setAddEventModal(false);
                }} breakpoints={{ '960px': '75vw' }} style={{ width: '30vw' }} >
                    <form onSubmit={handleAddEvent} className='flex flex-col mt-4'>
                        <div className='p-float-label'>
                            <InputText type="text" name='name' id='name' className='input text-gray-700 w-full' required />
                            <label htmlFor="name">*Event Name</label>
                        </div>
                        <div className="p-float-label mt-4">
                            <InputText type="text" name='description' id='description' className='input text-gray-700 w-full' required />
                            <label htmlFor="description">*Details</label>
                        </div>
                        <div className='flex justify-end gap-2 mt-8'>
                            <Button label="Cancel" icon="pi pi-times" onClick={() => {
                                setAddEventModal(false);
                            }} className="p-button-danger p-button-sm" />
                            <Button type='submit' label="Submit" icon="pi pi-check" className='p-button-info p-button-sm' />
                        </div>
                    </form>
                </Dialog>

                <div className='bg-white p-2 rounded-md shadow-lg min-h-[75vh] mt-2'>
                    <DataTable value={events} header={header} dataKey="id" size='small' responsiveLayout="scroll" scrollHeight="65vh" loading={loading} stripedRows>
                        {
                            cols.map((col, index) => <Column key={index} field={col.field} header={col.header} />)
                        }
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default Events;