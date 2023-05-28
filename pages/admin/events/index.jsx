import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { RiMailAddLine } from 'react-icons/ri'
import { useRef } from 'react';
import { Toast } from 'primereact/toast';

const Events = () => {

    const cookie = new Cookies();
    const toast = useRef()

    const [loading, setLoading] = useState(false)
    const [events, setEvents] = useState([]);
    const [event, setEvent] = useState(null);
    const [addEventModal, setAddEventModal] = useState(false)
    const [addEmailModal, setAddEmailModal] = useState(false)
    const [editEventModal, setEditEventModal] = useState(false)
    const [deleteEventModal, setDeleteEventModal] = useState(false)
    const [mailBody, setMailBody] = useState(false)
    const [eventDescription, seteventDescription] = useState(false)

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

    const updateEventFunction = (data) => {
        const url = 'http://localhost:5000/api/v1/event'
        fetch(url, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${cookie.get('TOKEN')}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.data.modifiedCount) {
                    getAllEvents()
                    setAddEmailModal(false)
                    setEditEventModal(false)
                    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Event Updated', life: 3000 })
                }
                else {
                    toast.current.show({ severity: 'error', summary: 'Failed!', detail: 'Please try again.', life: 3000 });
                }
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


    // const cols = [
    //     { field: 'name', header: 'Event' },
    //     { field: 'description', header: 'Description' },
    //     { header: 'Email', body: { emailBodyTemplate } },
    //     { header: 'Action', body: {} },
    // ];

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
                    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Event Added', life: 3000 })
                }
                else {
                    toast.current.show({ severity: 'error', summary: 'Failed!', detail: 'Please try again.', life: 3000 });
                }
            })
    }

    const handleAddEmail = (e) => {
        e.preventDefault()
        console.log(event);
        console.log(e.target.emailBody.value);

        const updateEventData = {
            eventId: event._id,
            updatedData: {
                emailBody: e.target.emailBody.value
            }
        }
        updateEventFunction(updateEventData)
    }


    const handleEditEvent = (e) => {
        e.preventDefault()

        const updateEventData = {
            eventId: event._id,
            updatedData: {
                description: eventDescription,
                emailBody: mailBody
            }
        }

        updateEventFunction(updateEventData)
    }

    // Delete Event 
    const handleDeleteEvent = (id) => {
        console.log(id);
        fetch(`http://localhost:5000/api/v1/event/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${cookie.get('TOKEN')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.data.deletedCount) {
                    getAllEvents()
                    setDeleteEventModal(false)
                    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Event Deleted', life: 3000 })
                }
                else {
                    console.log(data);
                    toast.current.show({ severity: 'error', summary: 'Failed!', detail: 'Please try again.', life: 3000 });
                }
            })
    }

    const emailBodyTemplate = (rowData) => {
        if (rowData.emailBody) {
            return <p>Mail Body Added</p>
        }
        else {
            return (
                <Button onClick={() => {
                    setEvent(rowData)
                    setAddEmailModal(true)
                }} className='p-button-sm flex items-center gap-2' ><RiMailAddLine size={20} />Add Mail</Button>
            )
        }
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className='flex space-x-2'>
                <Button icon='pi pi-pencil' className='p-button-sm' onClick={() => {
                    setEvent(rowData)
                    seteventDescription(rowData.description)
                    setMailBody(rowData?.emailBody)
                    setEditEventModal(true);
                }}></Button>
                <Button icon='pi pi-trash' className='p-button-danger p-button-sm' onClick={() => {
                    setEvent(rowData)
                    setDeleteEventModal(true)
                }}></Button>
            </div>
        )
    }


    return (
        <div>
            <Toast ref={toast} />
            <div className=' max-w-7xl mx-auto mt-4'>
                <Button icon='pi pi-plus' label='Add Event' className='p-button-sm' onClick={() => setAddEventModal(true)} />

                {/* add event dialogue  */}
                <Dialog header="Add New Event" visible={addEventModal} onHide={() => {
                    setAddEventModal(false);
                }} breakpoints={{ '960px': '75vw' }} style={{ width: '70vw' }} >
                    <form onSubmit={handleAddEvent} className='flex flex-col mt-4'>
                        <div className='p-float-label'>
                            <InputText type="text" name='name' id='name' className='input text-gray-700 w-full' required />
                            <label htmlFor="name">*Event Name</label>
                        </div>
                        <div className="p-float-label mt-4">
                            <InputTextarea type="text" name='description' id='description' className='w-full' rows={5} required />
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
                        {/* {
                            cols.map((col, index) => <Column key={index} field={col.field} header={col.header} />)
                        } */}
                        <Column header='Event' field='name'></Column>
                        <Column header='Description' field='description'></Column>
                        <Column header='Email' body={emailBodyTemplate} style={{ width: '15%' }}></Column>
                        <Column header='Action' body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>

                {/* add email dialogue  */}
                <Dialog header={`Add Email for "${event?.name}"`} visible={addEmailModal} onHide={() => {
                    setAddEmailModal(false);
                    setEvent(null)
                }} breakpoints={{ '960px': '75vw' }} style={{ width: '80vw' }} >
                    <form onSubmit={handleAddEmail} className='flex flex-col mt-4'>
                        <span className="p-float-label">
                            <InputTextarea id="email" name='emailBody' className='w-full' rows={5} required />
                            <label htmlFor="email">Email Body</label>
                        </span>
                        <div className='flex justify-end gap-2 mt-4'>
                            <Button type='submit' label="Submit" className='p-button-info p-button-sm' />
                        </div>
                    </form>
                </Dialog>

                {/* edit Event dialogue  */}
                <Dialog header={`Update Event`} visible={editEventModal} onHide={() => {
                    setEditEventModal(false);
                    setEvent(null)
                    seteventDescription(null)
                    setMailBody(null)
                }} breakpoints={{ '960px': '75vw' }} style={{ width: '80vw' }} >
                    <form onSubmit={handleEditEvent} className='flex flex-col gap-2'>
                        <div className='flex flex-col'>
                            <label className='text-gray-500'>Name</label>
                            <InputText disabled placeholder={event?.name} />
                        </div>
                        <div >
                            <label className='text-gray-500'>Description</label>
                            <InputTextarea id="description" name='description' value={eventDescription} onChange={(e) => seteventDescription(e.target.value)} className='w-full' rows={2} />
                        </div>
                        <div >
                            <label className='text-gray-500'>Email Body</label>
                            <InputTextarea id="email" name='emailBody' value={mailBody} onChange={(e) => setMailBody(e.target.value)} className='w-full' rows={5} />
                        </div>
                        <div className='flex justify-end gap-2 mt-4'>
                            <Button type='submit' label="Submit" className='p-button-info p-button-sm' />
                        </div>
                    </form>
                </Dialog>

                {/* event delete dialog box  */}
                <Dialog header="Delete Event" visible={deleteEventModal} onHide={() => { setDeleteEventModal(false) }} breakpoints={{ '960px': '75vw' }} style={{ width: '25vw' }} >

                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3 text-red-500" style={{ fontSize: '2rem' }} />
                        {event && (
                            <span>
                                Are you sure you want to delete <b>{event?.name}</b>?
                            </span>
                        )}

                        <div className='flex gap-x-2 mt-4 justify-end'>
                            <Button onClick={() => { setDeleteEventModal(false) }} label="No" icon="pi pi-times" outlined className='p-button-sm' />
                            <Button onClick={() => handleDeleteEvent(event?._id)} label="Yes" icon="pi pi-check" severity="danger" className='p-button-danger p-button-sm' />
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
    );
};

export default Events;