import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Cookies from 'universal-cookie';

const FinalSelected = () => {

    const { register, control, formState: { errors }, handleSubmit, reset } = useForm();

    const toast = useRef()
    const cookies = new Cookies()

    const [events, setEvents] = useState([])
    const [event, setEvent] = useState('')
    const [year, setYear] = useState(null)
    const [loading, setLoading] = useState(false)
    const [mailSendLoading, setmailSendLoading] = useState(false)
    const [finalSelected, setFinalSelected] = useState()

    // fetch available events from db 
    useEffect(() => {
        fetch('http://localhost:5000/api/v1/event', {
            method: "GET",
            headers: {
                authorization: `Bearer ${cookies.get("TOKEN")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setEvents(data.data)
            })
    }, [])

    const getFinalSelectedMembers = () => {
        setLoading(true)
        const url = `http://localhost:5000/api/v1/selection/final-selection?event=${event.name}&year=${year.getFullYear()}`
        fetch(url, {
            method: "GET",
            headers: {
                authorization: `Bearer ${cookies.get("TOKEN")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setFinalSelected(data.data)
                setLoading(false)
            })
    }

    const sendInvitationMail = (member) => {

        setmailSendLoading(true)
        const data = {
            memberId: member._id,
            memberName: member.name,
            eventToBeUpdate: {
                name: event.name,
                year: year.getFullYear()
            },
            mailData: {
                to: member.email,
                subject: `Invitation for ${event.name}-${year.getFullYear()}`,
                text: event.emailBody
            }
        }
        // console.log(data);

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
                if (data?.data?.modifiedCount > 0) {
                    getFinalSelectedMembers()
                    setmailSendLoading(false)
                    console.log(data);
                    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Mail Sent', life: 3000 })
                }
                else {
                    setmailSendLoading(false)
                    console.log(data.error);
                    toast.current.show({ severity: 'error', summary: 'Failed!', detail: 'Please try again.', life: 3000 });
                }
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

        if (event.emailBody) {
            if (rowData?.primarySelection?.find(eventToCheck => eventToCheck.event == event.name && eventToCheck.year == year.getFullYear() && eventToCheck.invitationMail == 'Sent')) {
                // console.log(eventToCheck);
                return (
                    <div>
                        Mail sent
                    </div>
                )
            }

            else {
                return (
                    <div>
                        <Button onClick={() => { sendInvitationMail(rowData) }} icon="pi pi-send" disabled={mailSendLoading} rounded outlined className="mr-2 p-button-sm" />
                    </div>
                )
            }
        }

        else {
            return (
                <div>
                    <p className='text-yellow-500'>PLease set Email first</p>
                </div>
            )
        }
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
            <Toast ref={toast} />
            <div className='bg-white p-2 w-fit mx-auto rounded-md shadow-lg'>
                <form onSubmit={handleSubmit(getFinalSelectedMembers)} className='flex gap-x-4'>
                    <div className='flex flex-col'>
                        <Dropdown
                            {...register("event", { required: "Event name is required" })}
                            name='event' options={events} optionLabel='name' value={event}
                            onChange={(e) => { setEvent(e.value) }}
                            placeholder="*Select Event" style={{ 'height': '37px' }} />

                        {errors.event?.type === 'required' && <span className='text-xs text-red-500' role="alert">{errors.event.message}</span>}
                    </div>
                    <div className='flex flex-col'>
                        {/* <Controller
                            name="year"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Calendar
                                    // {...register("year", { required: "Year is required" })}
                                    onChange={(e) => { setYear(e.value); console.log(e.value); }}
                                    name="year" value={year} view="year" dateFormat="yy" inputDateFormat="yy" placeholder='Year' className='p-inputtext-sm' />
                            )}
                        />

                        {errors.year && <span className='text-xs text-red-500' role="alert">Year required</span>} */}

                        <Controller
                            name="year"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Calendar
                                    dateFormat="yy"
                                    inputDateFormat="yy"
                                    view='year'
                                    value={year}
                                    onChange={(e) => { setYear(e.value); field.onChange(e.value) }}
                                    placeholder='Year'
                                    className='p-inputtext-sm'
                                />
                            )}
                        />
                        {errors.year && <span>Year is required</span>}
                    </div>
                    <Button type='submit' label='Submit' className='p-button-sm' style={{ 'height': '37px' }}></Button>
                </form>
            </div>

            {
                finalSelected &&
                <div className='bg-white p-0.5 max-w-7xl mx-auto rounded-md shadow-lg mt-2 min-h-[78vh]'>
                    <DataTable value={finalSelected} header={header} dataKey="id" size='small' responsiveLayout="scroll" scrollHeight="78vh" loading={loading} stripedRows>
                        {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column> */}
                        <Column header="#" headerStyle={{ width: '3rem' }} body={(data, options) => options.rowIndex + 1} className='text-sm'></Column>
                        {
                            cols.map((col, index) => <Column key={index} field={col.field} header={col.header} className='text-sm' />)
                        }
                        <Column header='Invitaion Status' body={invitationStatusBodyTemplate} exportable={false} className='text-sm'></Column>
                    </DataTable>
                </div>
            }
        </div >
    );
};

export default FinalSelected;