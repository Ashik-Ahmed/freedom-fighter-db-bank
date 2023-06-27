import { useRouter } from 'next/router';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'universal-cookie';

const ComplaintAccordion = ({ getAllComplaints, complaint }) => {

    const toast = useRef()
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState(null)
    const [editable, setEditable] = useState(false)
    const [resolveDialog, setResolveDialog] = useState(false)


    const cookie = new Cookies();

    useEffect(() => {
        if (cookie.get('TOKEN')) {
            fetch('http://localhost:5000/api/v1/users/getLoggedInUser', {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${cookie.get('TOKEN')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.user) {
                        setUser(data.user)
                        console.log('user from accordion', data.user);
                    }
                })
        }
    }, [])


    const handleUpdateComplaintFeedback = (complaintId, e) => {
        e.preventDefault()
        console.log(e.target.feedback.value);

        const feedback = {
            complaintId,
            feedback: {
                feedback: e.target.feedback.value,
                dateTime: new Date().toLocaleString("en-GB") // "en-GB" is used to format date to "d/mm/yyyy hh:mm:ss"
            }
        }

        const url = `http://localhost:5000/api/v1/freedomFighters/${id}/comlaint`;

        fetch(url, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(feedback)
        })
            .then(res => res.json())
            .then(data => {
                if (data.data.modifiedCount) {
                    getAllComplaints();
                    e.target.reset();
                    console.log(data);
                    setEditable(false)
                    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Complain Updated', life: 3000 })
                }
                else {
                    console.log(data.error);
                    toast.current.show({ severity: 'error', summary: 'Failed!', detail: 'Please try again.', life: 3000 });
                }
            })
    }


    // Resolve complaint 
    const handleResolveComplaint = (complaintId) => {
        console.log(complaintId);

        const status = {
            complaintId,
            status: 'Resolved'
        }

        const url = `http://localhost:5000/api/v1/freedomFighters/${id}/comlaint`;

        fetch(url, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(status)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.data.modifiedCount) {
                    getAllComplaints();
                    console.log(data);
                    setResolveDialog(false)
                    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Complain resolved', life: 3000 })
                }
                else {
                    console.log(data.error);
                    toast.current.show({ severity: 'error', summary: 'Failed!', detail: 'Please try again.', life: 3000 });
                }
            })
    }


    const accordionHeader = (complaint) => {
        return (
            <div className='flex justify-between items-center mr-16'>
                <p>{complaint?.issue}</p>
                <p className={`${complaint?.status == 'Processing' ? 'bg-yellow-400' : 'bg-green-500'} absolute right-2 p-1 text-xs text-white rounded ml-4`}>{complaint?.status}</p>
            </div>
        )
    }


    return (
        <div className='mb-1'>
            <Toast ref={toast} />
            <Accordion>
                <AccordionTab header={accordionHeader(complaint)}>
                    <div className='flex justify-between shadow-md border-b-2 border-primary rounded-lg'>
                        <p className='w-full rounded-l-lg p-2'>{complaint.details}</p>
                        <p className='w-24 text-xs text-gray-400 font-bold italic p-2 border-l rounded-r-lg'>{complaint.created}</p>
                    </div>
                    <div className='bg-gray-300 p-2 shadow-md mt-2'>
                        {
                            complaint?.feedbacks?.map((feedback, index) => {
                                return (
                                    <div key={index} className='relative flex items-center gap-x-2 w-full mt-2 bg-white shadow-md rounded-md border-b border-gray-400 transition-all ease-in-out duration-500'>
                                        <div className='absolute h-full rounded-md'>
                                            <p className='rounded-l-md text-gray-400 font-bold border-r text-xs italic w-24 h-full p-2'>{feedback.dateTime}</p>
                                        </div>
                                        <p className='w-full p-2 ml-28'>{feedback.feedback}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {
                        complaint.status != 'Resolved' &&
                        <div>
                            {
                                editable ?
                                    <form onSubmit={(e) => handleUpdateComplaintFeedback(complaint._id, e)} className='mt-4'>
                                        <InputTextarea name='feedback' placeholder='Type here..' className='w-full' required></InputTextarea>
                                        <div className='text-end'>
                                            <Button type='submit' label='Submit' className='p-button-sm'></Button>
                                        </div>
                                    </form>
                                    :
                                    <div className='flex gap-2 mt-2'>
                                        <Button onClick={() => setResolveDialog(true)} label='Resolve' className='p-button-sm'></Button>
                                        <Button onClick={() => setEditable(true)} label='Edit' className='p-button-sm p-button-success'></Button>
                                    </div>
                            }
                        </div>
                    }
                </AccordionTab>
            </Accordion>
            {/* Change role dialog box */}
            <Dialog header="Change Status" visible={resolveDialog} onHide={() => { setResolveDialog(false) }} breakpoints={{ '960px': '75vw' }} style={{ width: '25vw' }} >

                <div className='text-center mt-2'>
                    <i className='pi pi-check rounded-full border-2 text-5xl p-2 text-primary font-bold shadow-lg mb-2'></i>
                    <h1 class="text-xl mb-4 font-bold text-slate-500">Complaint Resolved?</h1>
                </div>

                <div className='flex justify-center mt-12 gap-x-2'>
                    <Button label="No" icon="pi pi-times" onClick={() => setResolveDialog(null)} className="p-button-danger p-button-sm" />
                    <Button label="Yes" icon="pi pi-check" onClick={() => handleResolveComplaint(complaint._id)} className='p-button-sm' />
                </div>
            </Dialog>
        </div >
    );
};

export default ComplaintAccordion;