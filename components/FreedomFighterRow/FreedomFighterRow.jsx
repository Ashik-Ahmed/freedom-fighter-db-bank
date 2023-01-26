import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { BsInfoSquareFill } from 'react-icons/bs';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { useRouter } from 'next/router';

const FreedomFighterRow = ({ freedomFighter, refreshData }) => {

    const [deleteModal, setDeleteModal] = useState()

    const { _id, name, status, force, officialRank, freedomFighterRank, invited } = freedomFighter;

    const router = useRouter()


    //delete a freedom fighter
    const deleteFreedomFighter = (id) => {
        fetch(`http://localhost:5000/api/v1/freedomFighters/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refreshData();
            })
        setDeleteModal(null)
    }

    return (
        <tr className='border-b text-gray-700'>
            <td className='p-2'>{name}</td>
            <td>{force}</td>
            <td>{officialRank.rank}</td>
            <td>{freedomFighterRank.rank}</td>
            <td className={status == 'Dead' ? 'text-red-600' : ''}>{status}</td>
            <td>{invited.length} Times</td>
            <td className='flex gap-x-3 p-2'>
                <BsInfoSquareFill size='24' color='#3B82F6' className='cursor-pointer' onClick={() => router.push(`/freedom-fighters/${_id}/details`)} />
                <FaEdit size='24' color='#00AA88' className='cursor-pointer' />
                <label onClick={() => setDeleteModal(freedomFighter)} for="delete-modal">
                    <RiDeleteBin6Fill size='24' color='#DF5353' className='cursor-pointer' />
                </label>
                {
                    deleteModal &&

                    //delete modal
                    <div class="bg-slate-600 bg-opacity-40 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                        <div class="bg-white px-16 py-14 rounded-md text-center">
                            <h1 class="text-xl mb-4 font-bold text-slate-500">Do you Want to Delete?</h1>
                            <p className='text-xl font-semibold my-4 text-slate-500'>{name}</p>
                            <button onClick={() => setDeleteModal(null)} class="bg-red-500 px-4 py-2 rounded-md text-md text-white">Cancle</button>
                            <button onClick={() => deleteFreedomFighter(_id)} class="bg-primary px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">Ok</button>
                        </div>
                    </div>
                }
            </td>
        </tr>
    );
};

export default FreedomFighterRow;