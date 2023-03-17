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
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';


const ManageUsers = () => {


    const [addUserModal, setAddUserModal] = useState(null)
    const [users, setUsers] = useState();
    const [user, setUser] = useState(null)
    const [userRole, setUserRole] = useState(null);
    const [userDetailsDialogue, setUserDetailsDialogue] = useState(false);
    const [userRoleDialogue, setUserRoleDialogue] = useState(false);
    const [userDeleteDialogue, setUserDeleteDialogue] = useState(false)

    const [loading, setLoading] = useState(false)
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    });

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

    // change user role 
    const toggleUserRole = (id, role) => {
        console.log(id, role)

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


        setUserRoleDialogue(false)
    }

    // delete a user 
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
        setUserDeleteDialogue(false)
    }

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const header = (
        <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
            <h4 className="m-0 text-lg">Member List</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </span>
        </div>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <div>
                <Button onClick={() => {
                    setUser(rowData)
                    setUserDetailsDialogue(true)
                }} icon="pi pi-info" rounded outlined className="mr-2 p-button-sm p-button-info" />
                <Button onClick={() => {
                    setUser(rowData);
                    setUserRoleDialogue(true)
                }} icon="pi pi-user" rounded outlined className={`${rowData.role == 'admin' && 'grayscale'} mr-2 p-button p-button-sm p-button-success`} />
                <Button onClick={() => {
                    setUser(rowData)
                    setUserDeleteDialogue(true)
                }} icon="pi pi-trash" rounded outlined severity="danger" className='p-button-sm p-button-danger' />
            </div >
        )
    }

    return (
        <div className='mx-auto'>
            <div className='flex justify-between my-2'>
                <Button label="Add User" icon="pi pi-plus" onClick={() => setAddUserModal(true)} />
                <Dialog header="Add New User" visible={addUserModal} onHide={() => {
                    setAddUserModal(false);
                    setUserRole(null);
                }} breakpoints={{ '960px': '75vw' }} style={{ width: '30vw' }} >
                    <form onSubmit={addUser} className='flex flex-col p-2'>
                        <div className='p-float-label'>
                            <InputText type="text" name='fullName' id='fullName' className='input text-gray-700 w-full' required />
                            <label htmlFor="fullName">*Full Name</label>
                        </div>
                        <div className="p-float-label mt-4">
                            <InputText type="email" name='email' id='email' className='input text-gray-700 w-full' required />
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
                            <Button label="Cancel" icon="pi pi-times" onClick={() => {
                                setAddUserModal(false);
                                setUserRole(null)
                            }} className='p-button-danger' />
                            <Button type='submit' label="Submit" icon="pi pi-check" />
                        </div>
                    </form>
                </Dialog>
            </div>
            <div className='p-2 bg-white border-2 shadow-md rounded-md'>

                <DataTable value={users} header={header} paginator rows={7} rowsPerPageOptions={[10, 25, 50]}
                    filters={filters} filterDisplay="menu" globalFilterFields={['name', 'email']} emptyMessage="No Members found."
                    dataKey="id" size='small' responsiveLayout="scroll" scrollHeight="80vh" loading={loading} stripedRows removableSort >
                    <Column header='Name' field='name' sortable></Column>
                    <Column header='Email' field='email'></Column>
                    <Column header='Role' field='role'></Column>
                    <Column header='Action' body={actionBodyTemplate}></Column>
                </DataTable>

                {/* user details view dialog box  */}
                <Dialog header="User Details" visible={userDetailsDialogue} onHide={() => { setUserDetailsDialogue(false) }} breakpoints={{ '960px': '75vw' }} style={{ width: '25vw' }} >

                    <div className='text-center'>
                        <i className='pi pi-user text-primary' style={{ 'fontSize': '2em' }}></i>
                        <div className='my-6 text-left'>
                            <p className='text-lg text-slate-500'>Name: {user?.name}</p>
                            <p className='text-lg text-slate-500'>Email: {user?.email}</p>
                            <p className='text-lg text-slate-500'>Role: {user?.role}</p>
                        </div>
                    </div>

                    <div className='flex justify-end mt-12 gap-x-2'>
                        <Button label="Close" icon="pi pi-times" onClick={() => { setUserDetailsDialogue(false) }} className="p-button-danger" />
                    </div>
                </Dialog>

                {/* user delete dialog box  */}
                <Dialog header="Delete User" visible={userDeleteDialogue} onHide={() => { setUserDeleteDialogue(false) }} breakpoints={{ '960px': '75vw' }} style={{ width: '25vw' }} >

                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3 text-red-500" style={{ fontSize: '2rem' }} />
                        {user?.name && (
                            <span>
                                Delete <b>{user?.name}</b>?
                            </span>
                        )}

                        <div className='flex gap-x-2 mt-4 justify-end'>
                            <Button onClick={() => { setUserDeleteDialogue(false) }} label="No" icon="pi pi-times" outlined />
                            <Button onClick={() => deleteUser(user?._id)} label="Yes" icon="pi pi-check" severity="danger" className='p-button-danger' />
                        </div>
                    </div>
                </Dialog>

                {/* Change role dialog box */}
                <Dialog header="Change Role" visible={userRoleDialogue} onHide={() => { setUserRoleDialogue(false) }} breakpoints={{ '960px': '75vw' }} style={{ width: '25vw' }} >

                    <div className='text-center mt-2'>
                        <i className='pi pi-arrow-right-arrow-left'></i>
                        <h1 class="text-xl mb-4 font-bold text-slate-500">Change role to {user?.role == 'admin' ? 'User' : 'Admin'}</h1>
                    </div>

                    <div className='flex justify-center mt-12 gap-x-2'>
                        <Button label="No" icon="pi pi-times" onClick={() => setUserRoleDialogue(null)} className="p-button-danger p-button-sm btn normal-case" />
                        <Button label="Yes" icon="pi pi-check" onClick={() => toggleUserRole(user?._id, user?.role == 'admin' ? 'user' : 'admin')} className='p-button-sm p-button-info btn normal-case' />
                    </div>
                </Dialog>

                {/* <div className='flex justify-between items-center mb-1'>
                    <div className='text-gray-800 text-xl font-bold'>
                        <p>Manage Users</p>
                    </div>
                    <div className='rlative '>
                        <span className="p-input-icon-left relative">
                            <i className="pi pi-search" />
                            <InputText type="search" onInput={(e) => setSearchValue(e.target.value)} placeholder="Search..." className='p-input-sm input' />
                        </span>
                    </div>
                </div>
                <table className="table-auto container w-full mx-auto shadow-md ">
                    <thead className='bg-slate-200 text-gray-700'>
                        <tr className='w-full text-left rounded-t-md'>
                            <th className='p-2 rounded-tl-md'>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th className='rounded-tr-md'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='border bg-white'>
                        {
                            users && users?.filter(user => {
                                if (searchValue == '') {
                                    return user;
                                }
                                else if (user.name.toLowerCase().includes(searchValue.toLowerCase())) {
                                    return user;
                                }
                            }).splice(currentPage * 10, 10)?.map(user =>
                                <UserRow key={user._id} user={user} fetchUsers={fetchUsers}></UserRow>)
                        }
                    </tbody>
                </table>
                <div className='w-full text-gray-600 p-1 bg-white rounded-b-md'>
                   
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={(e) => setCurrentPage(e.selected)}
                        pageRangeDisplayed={3}
                        pageCount={pageCount}
                        previousLabel="< prev"
                        renderOnZeroPageCount={null}
                        className='flex gap-x-4 justify-center items-center'
                        activeClassName='bg-primary/30 text-gray-900 px-2 py-1 rounded-full font-semibold btn btn-circle btn-info'
                    />
                </div> */}
            </div>
        </div >
    );
};

export default ManageUsers;