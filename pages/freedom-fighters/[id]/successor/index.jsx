import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import FreedomFighter from '..';
import { RiDeleteBin6Fill } from 'react-icons/ri'

const Successor = () => {
    const router = useRouter();
    const { id } = router.query;
    const [successor, setSuccessor] = useState();
    const [deleteModal, setDeleteModal] = useState(null);
    const currentDate = new Date().getFullYear();

    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/successor/${id}`)
            .then(res => res.json())
            .then(data => {
                setSuccessor(data.data[0])
            })
    }, [id])

    // console.log(successor);

    const deleteSuccessor = (successorId) => {
        console.log(successorId)

        fetch(`http://localhost:5000/api/v1/successor/${successorId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ freedomFighterId: id })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })

        setDeleteModal(null)
    }


    if (!successor) {
        return <FreedomFighter><p>Loading....</p></FreedomFighter>
    }


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
                        <p> <span className='font-bold'>Age:</span> {currentDate - parseInt(successor?.birthday?.split('-')[0]) || 'N/A'}</p>
                        <p> <span className='font-bold'>Occupation:</span> {successor?.occupation || 'N/A'}</p>
                    </div>
                    <div className='border border-gray-100 p-2 shadow-md rounded-md'>
                        <p> <span className='font-bold'>Contact:</span> {successor?.mobile || 'N/A'}</p>
                        <p> <span className='font-bold'>Email:</span> {successor?.email || 'N/A'}</p>
                        <p> <span className='font-bold'>Address:</span> {successor?.address || 'N/A'}</p>
                    </div>
                </div>
                <div className='flex justify-end'>
                    <button onClick={() => setDeleteModal(successor)} className='btn btn-sm btn-error font-bold text-white space-x-2 flex items-center'> <RiDeleteBin6Fill size='20' className='cursor-pointer' /> <span>Delete Successor</span></button>
                </div>
                {
                    deleteModal &&

                    //delete modal
                    <div class="bg-slate-600 bg-opacity-40 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                        <div class="bg-white px-16 py-14 rounded-md text-center">
                            <h1 class="text-xl mb-4 font-bold text-slate-500">Do you Want to Delete?</h1>
                            <p className='text-xl font-semibold my-4 text-slate-500'>{name}</p>
                            <button onClick={() => setDeleteModal(null)} class="bg-red-500 px-4 py-2 rounded-md text-md text-white">Cancle</button>
                            <button onClick={() => deleteSuccessor(successor._id)} class="bg-primary px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">Ok</button>
                        </div>
                    </div>
                }
            </div>
        </FreedomFighter>
    );
};

export default Successor;