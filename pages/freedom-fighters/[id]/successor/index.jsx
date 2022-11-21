import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import FreedomFighter from '..';

const Successor = () => {
    const router = useRouter();
    const { id } = router.query;
    const [successor, setSuccessor] = useState();
    console.log(id)

    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/successor/${id}`)
            .then(res => res.json())
            .then(data => {
                setSuccessor(data.data[0])
            })
    }, [id])

    // console.log(successor);


    return (
        <FreedomFighter>
            <div className='w-full'>
                <div className='bg-primary text-xl text-center text-gray-100 p-2 font-semibold'>
                    <h3>Successor Information</h3>
                </div>
                <div className='p-2 space-y-4'>
                    <div className='border border-gray-100 p-2 shadow-md rounded-md'>
                        <p> <span className='font-bold'>Name:</span> {successor?.name || 'N/A'}</p>
                        <p> <span className='font-bold'>Relation:</span> {successor?.relation || 'N/A'}</p>
                        <p> <span className='font-bold'>Age:</span> {successor?.age || 'N/A'}</p>
                        <p> <span className='font-bold'>Occupation:</span> {successor?.occupation || 'N/A'}</p>
                    </div>
                    <div className='border border-gray-100 p-2 shadow-md rounded-md'>
                        <p> <span className='font-bold'>Contact:</span> {successor?.mobile || 'N/A'}</p>
                        <p> <span className='font-bold'>Email:</span> {successor?.email || 'N/A'}</p>
                        <p> <span className='font-bold'>Address:</span> {successor?.address || 'N/A'}</p>
                    </div>
                </div>
            </div>
        </FreedomFighter>
    );
};

export default Successor;