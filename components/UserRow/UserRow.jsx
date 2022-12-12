import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { BsInfoSquareFill } from 'react-icons/bs';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';

const UserRow = ({ user }) => {

    const router = useRouter();
    const cookie = new Cookies();

    const [deleteModal, setDeleteModal] = useState(null);

    const { _id, name, email, role } = user;


    const deleteUser = async (id) => {
        await fetch(`http://localhost:5000/api/v1/users/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${cookie.get('TOKEN')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.data.deletedCount > 0) {
                    console.log('Succefully Deleted User')
                }
                if (data.error) {
                    console.log(data.error);
                }
            })
        setDeleteModal(null)
    }

    return (
        <tr className='border-b text-gray-500'>
            <td className='p-2'>{name}</td>
            <td>{email}</td>
            <td>{role}</td>
            <td className='flex gap-x-3 p-2'>
                <BsInfoSquareFill size='24' color='#070225' className='cursor-pointer' onClick={() => router.push(`/manage-users/${user._id}/details`)} />
                <FaEdit size='24' color='#00AA88' className='cursor-pointer' />
                <label onClick={() => setDeleteModal(user)} for="delete-modal">
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
                            <button onClick={() => deleteUser(_id)} class="bg-primary px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">Ok</button>
                        </div>
                    </div>
                }
            </td>
        </tr>
    );
};

export default UserRow;