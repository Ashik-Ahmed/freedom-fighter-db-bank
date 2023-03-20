import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useEffect, useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import FreedomFighter from '..';
import { getSingleFreedomFighter } from '../../../../controllers/freedomFighter.controller';

const ComplaintHistory = () => {

    const router = useRouter();
    const { id } = router.query;
    const [freedomFighter, setFreedomFighter] = useState()
    const [complaints, setComplaints] = useState(null)
    const [addComplaintDialog, setAddComplaintDialog] = useState(false)


    // get all complaints 
    const getAllComplaints = () => {

        const url = `http://localhost:5000/api/v1/freedomFighters/${id}/comlaint`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setComplaints(data.data)
            })
    }

    useEffect(() => {
        getSingleFreedomFighter(id)
            .then(data => setFreedomFighter(data))
        getAllComplaints()
    }, [id])

    // add new complaint 
    const handleAddComplaint = (e) => {
        e.preventDefault()
        const complaint = {
            issue: e.target.issue.value,
            details: e.target.details.value,
            status: 'Processing',
            created: new Date().toLocaleString("en-GB") // "en-GB" is used to format date to "d/mm/yyyy hh:mm:ss"
        }
        console.log(complaint);

        const url = `http://localhost:5000/api/v1/freedomFighters/${id}/comlaint`;

        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(complaint)
        })
            .then(res => res.json())
            .then(data => {
                if (data.status == 'Success') {
                    console.log(data.message);
                    getAllComplaints()
                    setAddComplaintDialog(false)
                }
                else {
                    console.log(data.error);
                }
            })
    }

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
                }
                else {
                    console.log(data.error);
                }
            })
    }

    const accordionHeader = (complaint) => {
        return (
            <div className='flex justify-between items-center w-full'>
                <p>{complaint?.issue}</p>
                <p className={`${complaint?.status == 'Processing' ? 'bg-yellow-400' : 'bg-green-500'} p-1 text-xs text-white rounded ml-4`}>{complaint?.status}</p>
            </div>
        )
    }

    return (
        <FreedomFighter>
            <div className=''>
                <div className='bg-primary text-xl text-center text-gray-100 p-2 font-semibold'>
                    <h3>Complaint History</h3>
                </div>
                <div className='text-end items-center mt-1'>
                    <Button onClick={() => setAddComplaintDialog(true)} icon='pi pi-plus' label='Register new Complain' className='p-button-sm p-button-help'></Button>
                </div>
                <div className='h-[83vh] mt-1 overflow-scroll scrollbar-thin scrollbar-thumb-primary'>
                    {
                        complaints ?
                            <div>
                                {
                                    complaints.map((complaint, index) => {
                                        return (
                                            <div key={index} className='mb-1'>
                                                <Accordion>
                                                    <AccordionTab header={accordionHeader(complaint)}>
                                                        <div className='flex justify-between border-b-2 border-primary'>
                                                            <p className='w-10/12'>{complaint.details}</p>
                                                            <p className='w-2/12 text-xs text-gray-500 italic py-1 pl-2 border-l'>{complaint.created}</p>
                                                        </div>
                                                        <div className='bg-gray-100 p-2 shadow-md'>
                                                            {
                                                                complaint?.feedbacks?.map((feedback, index) => {
                                                                    return (
                                                                        <div key={index} className='flex items-start gap-x-2 w-full mt-2 p-2 bg-white shadow-md border-b border-gray-400 transition-all ease-in-out duration-500'>
                                                                            <p className='text-gray-500 text-xs italic w-2/12 py-1 border-r'>{feedback.dateTime}</p>
                                                                            <p className='w-10/12'>{feedback.feedback}</p>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                        {
                                                            complaint.status == 'Processing' &&
                                                            <form onSubmit={(e) => handleUpdateComplaintFeedback(complaint._id, e)} className='mt-4'>
                                                                <InputTextarea name='feedback' placeholder='Type here..' className='w-full'></InputTextarea>
                                                                <div className='text-end'>
                                                                    <Button type='submit' label='Submit' className='p-button-sm'></Button>
                                                                </div>
                                                            </form>
                                                        }
                                                    </AccordionTab>
                                                </Accordion>
                                            </div>

                                        )
                                    })
                                }
                            </div>
                            :
                            <div className='text-center my-auto border-2 h-full'>
                                <p>No Complaints Yet..</p>
                            </div>

                    }

                </div>

                <Dialog header="Add New Complaint" visible={addComplaintDialog} onHide={() => setAddComplaintDialog(false)}
                    style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                    <form onSubmit={handleAddComplaint} className='m-0 flex flex-col gap-2'>
                        <InputText name='issue' placeholder='Complaint header' className='w-full'></InputText>
                        <InputTextarea name='details' placeholder='Complaint Details' className='w-full'></InputTextarea>
                        <Button type='submit' label='Submit'></Button>
                    </form>
                </Dialog>

            </div >
        </FreedomFighter >
    );
};

export default ComplaintHistory;