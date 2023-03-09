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
    const [eventFromDB, setEventFromDB] = useState('')
    const [year, setYear] = useState(null)
    const [loading, setLoading] = useState(false)
    const [primarySelected, setPrimarySelected] = useState()
    const [member, setMember] = useState('')
    const [verifyStatus, setVerifyStatus] = useState('')
    const [verificationUpdateDialogue, setVerificationUpdateDialogue] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false)
    const [deleteMemberDialogue, setDeleteMemberDialogue] = useState(false)

    // fetch available events from db 
    useEffect(() => {
        fetch('http://localhost:5000/api/v1/event')
            .then(res => res.json())
            .then(data => {
                setEvents(data.data)
            })
    }, [])

    const getPrimarySelectedMembers = (e) => {
        e.preventDefault()
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
        e?.preventDefault()

        var verificationStatus = {}
        if (verifyStatus == 'Failed') {
            verificationStatus = {
                status: verifyStatus,
                reason: e.target.rejectionReason.value
            }
        }
        else {
            verificationStatus = {
                status: verifyStatus
            }

        }

        //getting specific event details from DB
        const eventToBeUpdate = member?.primarySelection.find(memberEvent => {
            if (memberEvent.event == event.name && memberEvent.year == year.getFullYear()) {
                setEventFromDB(memberEvent);
                return memberEvent._id
            }
        })

        // console.log(member._id, verificationStatus);
        console.log(eventToBeUpdate);

        //this info will be sent to DB
        const verificationInfo = {
            memberId: member._id,
            eventToBeUpdate,
            verificationStatus
        }

        fetch('http://localhost:5000/api/v1/selection/verification-update', {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(verificationInfo)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                getPrimarySelectedMembers()
                setMember('');
                setVerifyStatus('')
                setVerificationUpdateDialogue(false);
            })
    }

    const handleDeleteMember = () => {
        console.log('Member Delete function');

        //getting specific event details from DB
        const eventToBeUpdate = member?.primarySelection.find(memberEvent => {
            if (memberEvent.event == event.name && memberEvent.year == year.getFullYear()) {
                setEventFromDB(memberEvent);
                return memberEvent._id
            }
        })

        const data = {
            memberId: member._id,
            eventToBeUpdate
        }

        const url = 'http://localhost:5000/api/v1/selection/delete-primary-selected';

        fetch(url, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.data.acknowledged) {
                    getPrimarySelectedMembers()
                    setDeleteMemberDialogue(false)
                    setMember(false)
                }
                else {
                    console.log(data);
                }
            })
    }

    const header = (
        <div className='flex justify-between items-center'>
            <div className='flex  items-center gap-x-2 text-gray-800 text-xl font-bold'>
                {primarySelected && <p>Primary Selected for <span className='text-secondary'>`{event.name} - {year?.toString().slice(11, 15)}`</span></p>}
            </div>
        </div>
    );

    const actionBodyTemplate = (rowData) => {
        const eventDetails = rowData.primarySelection.find(eventDetails => {
            if (eventDetails.event == event.name && eventDetails.year == year.getFullYear()) {
                console.log(eventDetails?.verificationStatus)
                return eventDetails
            }
        })

        return (
            < div >
                {
                    eventDetails?.verificationStatus ?

                        <div>
                            {
                                eventDetails?.verificationStatus?.status == 'Failed' ?
                                    <div className='relative'>
                                        <span
                                            className="inline-block bg-yellow-500 text-white py-1 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"                                >
                                            {
                                                eventDetails.verificationStatus?.status
                                            }
                                        </span>
                                        <span
                                            onMouseEnter={() => setShowTooltip(true)}
                                            onMouseLeave={() => setShowTooltip(false)}
                                            className='pi pi-question-circle ml-2 text-red-500'></span>
                                        <div
                                            className={`${showTooltip ? 'opacity-100' : 'opacity-0'
                                                } absolute bottom-5 left-1/2 transform -translate-x-1/2 mb-2 bg-red-500/90 text-white text-xs rounded-md py-1 px-2 pointer-events-none transition-opacity duration-300`}>
                                            {eventDetails.verificationStatus.reason}
                                        </div>
                                    </div >
                                    :
                                    <div>
                                        <span
                                            className="inline-block bg-primary text-white py-1 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                            {eventDetails.verificationStatus.status}
                                        </span>
                                    </div>
                            }
                        </div>
                        :
                        // <span className='bg-primary text-white p-1 rounded-md shadow-md'>{rowData.primarySelection.verificationStatus?.status || 'N/A'}</span>
                        <div>
                            < Button onClick={() => {
                                setMember(rowData)
                                setVerifyStatus('Success')
                                setVerificationUpdateDialogue(true);
                            }} icon="pi pi-check" rounded outlined className="mr-2 p-button-sm" />
                            <Button onClick={() => {
                                setMember(rowData);
                                setVerifyStatus('Failed')
                                setVerificationUpdateDialogue(true);
                            }} icon="pi pi-times" rounded outlined className='p-button-sm p-button-warning mr-2' />
                            <Button onClick={() => {
                                setMember(rowData);
                                setVerifyStatus('')
                                setDeleteMemberDialogue(true);
                            }} icon="pi pi-trash" rounded outlined severity="danger" className='p-button-sm p-button-danger' />
                        </div >
                }
            </div >
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
                        }} view="year" dateFormat="yy" placeholder='Year' required />
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

            {/* dialogue for updating verification info  */}
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
                    <div className='text-right mt-4'>
                        <Button type='submit' label="Submit" />
                    </div>
                </form>
            </Dialog>

            {/* dialogue delete member from primary selected  */}
            <Dialog visible={deleteMemberDialogue} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal onHide={() => setDeleteMemberDialogue(false)}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3 text-red-500" style={{ fontSize: '2rem' }} />
                    {member && (
                        <span>
                            Are you sure you want to delete <b>{member.name}</b>?
                        </span>
                    )}

                    <div className='flex gap-x-2 mt-4 justify-end'>
                        <Button label="No" icon="pi pi-times" outlined onClick={() => setDeleteMemberDialogue(false)} />
                        <Button label="Yes" icon="pi pi-check" severity="danger" onClick={handleDeleteMember} className='p-button-danger' />
                    </div>
                </div>
            </Dialog>
        </div >
    );
};

export default PrimarySelected;