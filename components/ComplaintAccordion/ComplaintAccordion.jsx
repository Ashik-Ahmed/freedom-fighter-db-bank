import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState } from 'react';

const ComplaintAccordion = ({ complaint }) => {


    const [editable, setEditable] = useState(false)

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
            <Accordion activeIndex={0}>
                <AccordionTab header={accordionHeader(complaint)}>
                    <div className='flex justify-between shadow-md border-b-2 border-primary rounded-lg'>
                        <p className='w-10/12 rounded-l-lg p-2'>{complaint.details}</p>
                        <p className='w-2/12 text-xs text-gray-400 font-bold italic p-2 border-l rounded-r-lg'>{complaint.created}</p>
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
                                        <Button label='Resolve' className='p-button-sm'></Button>
                                        <Button onClick={() => setEditable(true)} label='Edit' className='p-button-sm p-button-success'></Button>
                                    </div>
                            }
                        </div>
                    }
                </AccordionTab>
            </Accordion>
        </div>
    );
};

export default ComplaintAccordion;