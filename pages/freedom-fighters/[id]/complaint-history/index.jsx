import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useEffect, useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import FreedomFighter from '..';
import { getSingleFreedomFighter } from '../../../../controllers/freedomFighter.controller';
import ComplaintAccordion from '../../../../components/ComplaintAccordion/ComplaintAccordion';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

const ComplaintHistory = () => {

    const toast = useRef()
    const router = useRouter();
    const { id } = router.query;
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
                const unresolved = data?.data?.filter(complaint => complaint.status !== 'Resolved')
                // setUnresolvedComplaint(unresolved)
            })
    }

    useEffect(() => {
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
                    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Complain added', life: 3000 })
                }
                else {
                    console.log(data.error);
                    toast.current.show({ severity: 'error', summary: 'Failed!', detail: 'Please try again.', life: 3000 });
                }
            })
    }


    return (
        <FreedomFighter>
            <div className=''>
                <Toast ref={toast} />
                <div className='bg-primary text-xl text-center text-gray-100 p-2 font-semibold'>
                    <h3>Complaint History</h3>
                </div>
                <div className='text-end items-center mt-1'>
                    <Button onClick={() => setAddComplaintDialog(true)} icon='pi pi-plus' label='Register new Complain' className='p-button-sm p-button-help'></Button>
                </div>
                <div className='h-[83vh] mt-1 overflow-scroll scrollbar-thin scrollbar-thumb-primary relative'>
                    {
                        complaints ?
                            <div>
                                {
                                    complaints.map((complaint, index) => {
                                        return (
                                            <ComplaintAccordion key={index} complaint={complaint} getAllComplaints={getAllComplaints} />

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