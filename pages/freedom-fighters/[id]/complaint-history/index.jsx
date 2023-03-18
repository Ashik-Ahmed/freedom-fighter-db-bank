import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useEffect, useState } from 'react';
import FreedomFighter from '..';
import { getSingleFreedomFighter } from '../../../../controllers/freedomFighter.controller';

const ComplaintHistory = () => {

    const router = useRouter();
    const { id } = router.query;
    const [freedomFighter, setFreedomFighter] = useState()
    const [addComplaintDialog, setAddComplaintDialog] = useState(false)

    useEffect(() => {
        getSingleFreedomFighter(id)
            .then(data => setFreedomFighter(data))
    }, [id])

    const handleAddComplaint = (e) => {
        e.preventDefault()
        const complaint = {
            issue: e.target.issue.value,
            details: e.target.details.value
        }
        console.log(complaint);
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
                    !freedomFighter?.complaint &&
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

            </div>
        </FreedomFighter>
    );
};

export default ComplaintHistory;