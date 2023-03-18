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
    // const [complaints, setComplaints] = useState(null)
    const [addComplaintDialog, setAddComplaintDialog] = useState(false)


    // get all complaints 
    // const getAllComplaints = () => {

    //     const url = `http://localhost:5000/api/v1/freedomFighters/${id}/comlaint`;

    //     fetch(url)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             setComplaints(data.data)
    //         })
    // }

    useEffect(() => {
        getSingleFreedomFighter(id)
            .then(data => setFreedomFighter(data))
        // getAllComplaints()
    }, [id])

    // add new complaint 
    const handleAddComplaint = (e) => {
        e.preventDefault()
        const complaint = {
            issue: e.target.issue.value,
            details: e.target.details.value
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
                    setAddComplaintDialog(false)
                }
                else {
                    console.log(data.error);
                }
            })
    }

    const accordionHeader = (complaint) => {
        return (
            <div>
                <p>{complaint.issue}</p>
                <p>{complaint.status}</p>
            </div>
        )
    }

    return (
        <FreedomFighter>
            <div>
                <div className='bg-primary text-xl text-center text-gray-100 p-2 font-semibold'>
                    <h3>Complaint History</h3>
                </div>
                <div className='text-end items-center mt-1'>
                    <Button onClick={() => setAddComplaintDialog(true)} icon='pi pi-plus' label='Register new Complain' className='p-button-sm'></Button>
                </div>
                {
                    freedomFighter?.complaints ?
                        <div>
                            {
                                freedomFighter.complaints.map((complaint, index) => {
                                    return (
                                        <div key={index} className='mt-1'>
                                            <Accordion>
                                                <AccordionTab header={() => accordionHeader(complaint)}>
                                                    <p className="m-0">
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                    </p>
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