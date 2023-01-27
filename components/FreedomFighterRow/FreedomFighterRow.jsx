import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { BsInfoSquareFill } from 'react-icons/bs';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

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
                {/* <BsInfoSquareFill size='24' color='#3B82F6' className='cursor-pointer' onClick={() => router.push(`/freedom-fighters/${_id}/details`)} />
                <FaEdit size='24' color='#00AA88' className='cursor-pointer' />
                <label onClick={() => setDeleteModal(freedomFighter)} for="delete-modal">
                    <RiDeleteBin6Fill size='24' color='#DF5353' className='cursor-pointer' />
                </label> */}

                <div className='flex items-center gap-x-3'>
                    <div className='cursor-pointer ' onClick={() => router.push(`/freedom-fighters/${_id}/details`)}>
                        <i className='pi pi-info-circle text-xl text-primary font-bold'></i>
                    </div>
                    <div className='cursor-pointer pb-1' onClick={console.log('User Editing')}>
                        <i className='pi pi-pencil text-[#00AA88] font-bold'></i>
                    </div>
                    <div className='cursor-pointer ' onClick={() => setDeleteModal(freedomFighter)}>
                        <i className='pi pi-trash text-xl text-red-400 font-bold'></i>
                    </div>
                </div>

                {/* {
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
                } */}

                {/* user delete dialog box  */}
                <Dialog header="Delete Member" visible={deleteModal} onHide={() => { setDeleteModal(false) }} breakpoints={{ '960px': '75vw' }} style={{ width: '25vw' }} >

                    <div className='text-center mt-2'>
                        <i className='pi pi-trash text-red-500' style={{ 'fontSize': '2em' }}></i>
                        <p className='text-xl font-bold my-4'>Delete {name} ?</p>
                    </div>

                    <div className='flex justify-center mt-12 gap-x-2'>
                        <Button label="Cancel" icon="pi pi-times" onClick={() => { setDeleteModal(false) }} className="p-button-danger p-button-sm btn normal-case" />
                        <Button label="Delete" icon="pi pi-trash" onClick={() => deleteFreedomFighter(_id)} className='p-button-sm p-button-info btn normal-case' />
                    </div>
                </Dialog>
            </td>
        </tr>
    );
};

export default FreedomFighterRow;