import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Cookies from 'universal-cookie';
import UserRow from '../../components/UserRow/UserRow';
import { SiAddthis } from 'react-icons/si';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';


const ManageUsers = () => {


    const [addUserModal, setAddUserModal] = useState(null)
    const [users, setUsers] = useState();
    const [totalData, setTotalData] = useState(10);
    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('');
    const [userRole, setUserRole] = useState(null);

    const cookie = new Cookies();

    // Get all the users
    const fetchUsers = () => {
        fetch('http://localhost:5000/api/v1/users', {
            headers: {
                authorization: `Bearer ${cookie.get('TOKEN')}`
            }
        })
            .then(res => res.json())
            .then(data => { setUsers(data.data) })
    }

    useEffect(() => {
        fetchUsers()
    }, [])


    // Add a new user
    const addUser = async (e) => {
        e.preventDefault();

        const name = e.target.fullName.value;
        const email = e.target.email.value;
        const role = userRole;

        const userInfo = { name, email, role };
        console.log(userInfo);

        fetch('http://localhost:5000/api/v1/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${cookie.get('TOKEN')}`
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.status == 'success') {
                    fetchUsers();
                    setAddUserModal(null)
                }
                else if (data.status == 'failed') {
                    console.log(data)
                }
            })

        setUserRole(null);
    }

    const pageCount = Math.ceil(users?.length / 10);

    return (
        <div className='max-w-6xl mx-auto my-8'>

            <div className='flex justify-between mb-2'>

                <Button label="Add User" icon="pi pi-user-plus" onClick={() => setAddUserModal(true)} className='p-button-info' />
                <Dialog header="Add New User" visible={addUserModal} onHide={() => {
                    setAddUserModal(false);
                    setUserRole(null);
                }} breakpoints={{ '960px': '75vw' }} style={{ width: '30vw' }} >
                    <form onSubmit={addUser} className='flex flex-col gap-4 p-6'>
                        <div className='p-float-label'>
                            <InputText type="text" name='fullName' id='fullName' className='input bg-gray-200 text-gray-700 border-4 border-primary w-full' required />
                            <label htmlFor="fullName">*Full Name</label>
                        </div>
                        <div className="p-float-label mt-4">
                            <InputText type="email" name='email' id='email' className='input bg-gray-200 text-gray-700 w-full' required />
                            {/* <select name='role' className="p-2 rounded-md bg-gray-200 mb-2 text-gray-400" required> */}
                            <label htmlFor="email">*Email</label>
                        </div>
                        <div className='mt-4'>
                            <Dropdown name='role' value={userRole} className='text-black w-full'
                                options={

                                    [{ label: 'Admin', value: 'admin' },
                                    { label: 'User', value: 'user' }]

                                }
                                onChange={(e) => setUserRole(e.value)} placeholder="*Select a Role" />
                        </div>

                        {/* <option value='' disabled selected>Role</option>
                            <option value='admin'>Admin</option>
                            <option value='user'>User</option>
                        </select> */}
                        {/* <button type='submit' class="bg-primary px-7 py-2 ml-2 rounded-md text-md text-white font-semibold cursor-pointer" >Submit</button> */}
                        <div className='flex justify-end gap-2 mt-8'>
                            <Button label="No" icon="pi pi-times" onClick={() => {
                                setAddUserModal(false);
                                setUserRole(null)
                            }} className="p-button-danger p-button-sm" />
                            <Button type='submit' label="Yes" icon="pi pi-check" className='p-button-info p-button-sm' />
                        </div>
                    </form>
                </Dialog>

                {/* <Button onClick={() => setAddMemberModal(true)} icon='pi pi-user-plus' label='Add User' className='flex items-center gap-x-2'></Button> */}
                {/* {
                    addMemberModal &&

                    // Add Member Modal
                    <div class="bg-slate-600 bg-opacity-40 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                        <div class="bg-white px-2 py-2 rounded-md text-center">
                            <button onClick={() => setAddMemberModal(null)} className='text-black font-bold float-right bg-gray-300 px-3 py-1 rounded-full relative'>X</button>
                            <div className='m-10'>
                                <h1 class="text-2xl mb-4 font-bold text-primary underline">Add New User</h1>
                                <form onSubmit={addUser} className='flex flex-col gap-4'>
                                    <input type="text" name='fullName' placeholder='Full Name' className='input bg-gray-200 text-gray-700' required />
                                    <input type="email" name='email' placeholder='Email' className='input bg-gray-200 text-gray-700' required />
                                    <select name='role' className="p-2 rounded-md bg-gray-200 mb-2 text-gray-400" required>
                                        <option value='' disabled selected>Role</option>
                                        <option value='admin'>Admin</option>
                                        <option value='user'>User</option>
                                    </select>
                                    <button type='submit' class="bg-primary px-7 py-2 ml-2 rounded-md text-md text-white font-semibold cursor-pointer" >Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                } */}

            </div>
            <div className='p-4 bg-white border-2 shadow-md rounded-md'>
                <div className='flex justify-between items-center mb-2'>
                    <div className='text-gray-600 text-xl font-bold'>
                        <p>Manage Users</p>
                    </div>
                    <div className='rlative '>
                        <span className="p-input-icon-left relative">
                            <i className="pi pi-search" />
                            <InputText type="search" onInput={(e) => setSearchValue(e.target.value)} placeholder="Search..." className='p-input-sm' />
                        </span>
                    </div>
                </div>
                <table className="table-auto container w-full mx-auto shadow-md">
                    <thead className='bg-slate-200 text-gray-500'>
                        <tr className='w-full text-left rounded-t-md'>
                            <th className='p-2 rounded-tl-md'>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th className='rounded-tr-md'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='border bg-white'>
                        {
                            users && users.filter(user => {
                                if (searchValue == '') {
                                    return user;
                                }
                                else if (user.name.toLowerCase().includes(searchValue.toLowerCase())) {
                                    return user;
                                }
                            }).splice(currentPage * 10, 10)?.map(user => <UserRow key={user._id} user={user} fetchUsers={fetchUsers}></UserRow>)
                        }
                    </tbody>
                </table>
                {/* <div className='flex w-full justify-between text-primary p-2 bg-gray-100 rounded-b-md'> */}
                <div className='w-full text-primary p-2 bg-white rounded-b-md'>
                    {/* <div>
                    <p>Showing {users?.length > 10 ? '10' : users?.length} of {users?.length} data</p>
                </div> */}
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={(e) => setCurrentPage(e.selected)}
                        pageRangeDisplayed={3}
                        pageCount={pageCount}
                        previousLabel="< prev"
                        renderOnZeroPageCount={null}
                        className='flex gap-x-4 justify-end p-1'
                        activeClassName='bg-primary text-white px-2 rounded-full font-semibold'
                    />
                </div>
            </div>
        </div >
    );
};

export default ManageUsers;