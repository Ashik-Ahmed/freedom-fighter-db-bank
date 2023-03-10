import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { BsInfoSquareFill, BsPersonCheckFill } from 'react-icons/bs';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

const UserRow = ({ user, fetchUsers }) => {

    const router = useRouter();
    const cookie = new Cookies();

    const [deleteModal, setDeleteModal] = useState(null);
    const [detailsModal, setDetailsModal] = useState(null);
    const [userRoleModal, setUserRoleModal] = useState(null);

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
                    fetchUsers();
                }
                if (data.error) {
                    console.log(data.error);
                }
            })
        setDeleteModal(null)
    }


    const toggleUserRole = (id, role) => {
        // console.log(role)

        const info = {
            role
        }

        fetch(`http://localhost:5000/api/v1/users/updateRole/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${cookie.get('TOKEN')}`
            },
            body: JSON.stringify(info)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.data?.modifiedCount) {
                    console.log('Successfully Updated');
                    fetchUsers();
                }
                else {
                    console.log(data.error)
                }
            })


        setUserRoleModal(null)
    }

    return (
        <tr className='border-b text-gray-700'>
            <td className='p-2'>{name}</td>
            <td>{email}</td>
            <td>{role}</td>
            <td className=''>
                {/* <BsInfoSquareFill size='24' color='#3B82F6' className='cursor-pointer' onClick={() => setDetailsModal(user)} /> */}

                <div className='flex items-center gap-x-3'>
                    <div className='cursor-pointer ' onClick={() => setDetailsModal(user)}>
                        <i className='pi pi-info-circle text-xl text-primary'></i>
                    </div>
                    <div className='cursor-pointer ' onClick={() => setDeleteModal(user)}>
                        <i className='pi pi-trash text-xl text-red-400'></i>
                    </div>
                    <div className='cursor-pointer pb-1' onClick={() => setUserRoleModal(user)}>
                        <BsPersonCheckFill size='22' color='#00AA88' className={`${role == 'user' && 'grayscale'}`} />
                        {/* <i className='pi pi-user text-xl text-[#00AA88]'></i> */}
                    </div>
                </div>

                {/* <label for="delete-modal">
                    <RiDeleteBin6Fill size='24' color='#DF5353' className='cursor-pointer' />
                </label> */}


                {/* user details view dialog box  */}
                <Dialog header="User Details" visible={detailsModal} onHide={() => { setDetailsModal(false) }} breakpoints={{ '960px': '75vw' }} style={{ width: '25vw' }} >

                    <div className='text-center'>
                        <i className='pi pi-user text-primary' style={{ 'fontSize': '2em' }}></i>
                        <div className='my-6 text-left'>
                            <p className='text-lg text-slate-500'>Name: {name}</p>
                            <p className='text-lg text-slate-500'>Email: {email}</p>
                            <p className='text-lg text-slate-500'>Role: {role}</p>
                        </div>
                    </div>

                    <div className='flex justify-end mt-12 gap-x-2'>
                        <Button label="Close" icon="pi pi-times" onClick={() => { setDetailsModal(false) }} className="p-button-danger" />
                    </div>
                </Dialog>
                {/* {
                    detailsModal &&

                    //delete modal
                    <div class="bg-slate-600 bg-opacity-40 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                        <div class="bg-white px-16 py-14 rounded-md">
                            <h1 class="text-2xl mb-4 font-bold text-primary underline text-center">User Details</h1>
                            <div className='mb-6'>
                                <p className='text-lg text-slate-500'>Name: {name}</p>
                                <p className='text-lg text-slate-500'>Email: {email}</p>
                                <p className='text-lg text-slate-500'>Role: {role}</p>
                            </div>
                            <button onClick={() => setDetailsModal(null)} class="bg-red-500 px-4 py-2 rounded-md text-md text-white float-right">Close</button>
                        </div>
                    </div>
                } */}

                {/* user delete dialog box  */}
                <Dialog header="Delete User" visible={deleteModal} onHide={() => { setDeleteModal(false) }} breakpoints={{ '960px': '75vw' }} style={{ width: '25vw' }} >

                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3 text-red-500" style={{ fontSize: '2rem' }} />
                        {name && (
                            <span>
                                Are you sure you want to delete <b>{name}</b>?
                            </span>
                        )}

                        <div className='flex gap-x-2 mt-4 justify-end'>
                            <Button onClick={() => { setDeleteModal(false) }} label="No" icon="pi pi-times" outlined />
                            <Button onClick={() => deleteUser(_id)} label="Yes" icon="pi pi-check" severity="danger" className='p-button-danger' />
                        </div>
                    </div>
                </Dialog>

                {/* {
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
                } */}



                {/* Change role dialog box */}
                <Dialog header="Change Role" visible={userRoleModal} onHide={() => { setUserRoleModal(false) }} breakpoints={{ '960px': '75vw' }} style={{ width: '25vw' }} >

                    <div className='text-center mt-2'>
                        <i className='pi pi-arrow-right-arrow-left'></i>
                        <h1 class="text-xl mb-4 font-bold text-slate-500">Change role to {role == 'admin' ? 'User' : 'Admin'}</h1>
                    </div>

                    <div className='flex justify-center mt-12 gap-x-2'>
                        <Button label="No" icon="pi pi-times" onClick={() => setUserRoleModal(null)} className="p-button-danger p-button-sm btn normal-case" />
                        <Button label="Yes" icon="pi pi-check" onClick={() => toggleUserRole(_id, role == 'admin' ? 'user' : 'admin')} className='p-button-sm p-button-info btn normal-case' />
                    </div>
                </Dialog>

                {/* {
                    userRoleModal &&

                    //delete modal
                    <div class="bg-slate-600 bg-opacity-40 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                        <div class="bg-white px-16 py-14 rounded-md text-center">
                            <h1 class="text-xl mb-4 font-bold text-slate-500">Change role to {role == 'admin' ? 'User' : 'Admin'}</h1>
                            <button onClick={() => setUserRoleModal(null)} class="bg-red-500 px-4 py-2 rounded-md text-md text-white">Cancle</button>
                            <button onClick={() => toggleUserRole(_id, role == 'admin' ? 'user' : 'admin')} class="bg-primary px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">Ok</button>
                        </div>
                    </div>
                } */}
            </td>
        </tr >
    );
};

export default UserRow;