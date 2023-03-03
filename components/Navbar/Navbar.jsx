import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import photo from '../../Images/photo.png'
import Cookies from 'universal-cookie';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';

const Navbar = ({ user, setUser }) => {

    const cookie = new Cookies();

    const handlLogout = () => {
        console.log('logout');
        cookie.remove('TOKEN')
        setUser(false)
    }

    const items = [
        {
            label: 'File',
            icon: 'pi pi-fw pi-file',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        {
                            label: 'Bookmark',
                            icon: 'pi pi-fw pi-bookmark'
                        },
                        {
                            label: 'Video',
                            icon: 'pi pi-fw pi-video'
                        },

                    ]
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-trash'
                },
                {
                    separator: true
                },
                {
                    label: 'Export',
                    icon: 'pi pi-fw pi-external-link'
                }
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {
                    label: 'Left',
                    icon: 'pi pi-fw pi-align-left'
                },
                {
                    label: 'Right',
                    icon: 'pi pi-fw pi-align-right'
                },
                {
                    label: 'Center',
                    icon: 'pi pi-fw pi-align-center'
                },
                {
                    label: 'Justify',
                    icon: 'pi pi-fw pi-align-justify'
                },

            ]
        },
        {
            label: 'Users',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-user-plus',

                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-user-minus',

                },
                {
                    label: 'Search',
                    icon: 'pi pi-fw pi-users',
                    items: [
                        {
                            label: 'Filter',
                            icon: 'pi pi-fw pi-filter',
                            items: [
                                {
                                    label: 'Print',
                                    icon: 'pi pi-fw pi-print'
                                }
                            ]
                        },
                        {
                            icon: 'pi pi-fw pi-bars',
                            label: 'List'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Events',
            icon: 'pi pi-fw pi-calendar',
            items: [
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-pencil',
                    items: [
                        {
                            label: 'Save',
                            icon: 'pi pi-fw pi-calendar-plus'
                        },
                        {
                            label: 'Delete',
                            icon: 'pi pi-fw pi-calendar-minus'
                        }
                    ]
                },
                {
                    label: 'Archieve',
                    icon: 'pi pi-fw pi-calendar-times',
                    items: [
                        {
                            label: 'Remove',
                            icon: 'pi pi-fw pi-calendar-minus'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Quit',
            icon: 'pi pi-fw pi-power-off'
        }
    ];


    return (

        // prime react menubar 

        // <div className='bg-primary'>
        //     <Menubar
        //         className='mx-auto max-w-7xl bg-primary'
        //         model={items}
        //         start={
        //             <div className='flex items-center gap-x-2'>
        //                 <Image alt="userPhoto" src={photo} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" width='40' className="mr-2" />
        //                 <div>
        //                     <h2 className='text-xl font-bold'>Invite</h2>
        //                 </div>
        //             </div>
        //         } />
        // </div>


        // previous menubar 

        <div className="bg-primary min-h-[10vh] max-h-[10vh]  flex items-center my-auto">
            <div className="navbar text-gray-200 max-w-7xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content p-2 shadow bg-primary  w-52">
                            <li tabIndex={0}>
                                <a className="justify-between">
                                    Member Mgt.
                                    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
                                </a>
                                <ul className="p-2 bg-primary">
                                    <li><Link href='/freedom-fighters'>Permanent Member</Link></li>
                                    <li><Link href='/foreign-freedom-fighters'>Others</Link></li>
                                </ul>
                            </li>
                            <li tabIndex={0}>
                                <a className="justify-between">
                                    Selection
                                    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
                                </a>
                                <ul className="p-2 bg-primary">
                                    <li><Link href='/selection'>Primary Selection</Link></li>
                                    <li><Link href='/primary-selected'>Primary Selected</Link></li>
                                    <li><Link href='/final-selected'>Final Selected</Link></li>
                                </ul>
                            </li>
                            {/* <li><Link href='/selection'>Selection</Link></li> */}
                            <li><Link href='/events'>Events</Link></li>
                        </ul>
                    </div>
                    <Link href='/' className="btn btn-ghost normal-case text-2xl">Invite</Link>
                </div>
                {/* <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        <li tabIndex={0}>
                            <a>
                                Member Mgt.
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                            </a>
                            <ul className="p-2 bg-primary">
                                <li><Link href='/freedom-fighters'>Permanent Member</Link></li>
                                <li><Link href='/foreign-freedom-fighters'>Others</Link></li>
                            </ul>
                        </li>
                        <li><Link href='/selection'>Selection</Link></li>
                    </ul>
                </div> */}

                <div className="navbar-end ml-auto lg:ml-10 hidden lg:flex gap-2">
                    <div className='dropdown dropdown-end'>
                        <label tabIndex={0} className="btn btn-ghost normal-case">
                            <div className='flex gap-x-1 items-center'>
                                Member Mgt.
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-primary rounded-md w-52">

                            <li><Link href='/freedom-fighters'>Permanent Member</Link></li>
                            <li><Link href='/foreign-freedom-fighters'>Others</Link></li>

                        </ul>
                    </div>
                    <div className='dropdown dropdown-end'>
                        <label tabIndex={0} className="btn btn-ghost normal-case">
                            <div className='flex gap-x-1 items-center'>
                                Selection
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-primary rounded-md w-52">

                            <li><Link href='/selection'>Primary Selection</Link></li>
                            <li><Link href='/selection/primary-selected'>Primary Selected</Link></li>
                            <li><Link href='/selection/final-selected'>Final Selected</Link></li>

                        </ul>
                    </div>
                    {/* <div className='btn btn-ghost normal-case'><Link href='/selection'>Selection</Link></div> */}
                    <div className='btn btn-ghost normal-case'><Link href='/events'>Events</Link></div>
                </div>

                <div className="dropdown dropdown-end ml-auto lg:ml-10">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <Image src={photo} alt='UserProfilePhoto' width='10' height='10' layout='responsive' />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-primary rounded-md w-52">
                        <li><Link href={`/profile/${user._id}`} className='flex gap-x-1'>Profile<span className='text-xs italic'>( {user.name} )</span></Link></li>
                        {user.role == 'admin' && <li><Link href='/manage-users'>User Management</Link></li>}
                        <li onClick={handlLogout}><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div >

    )
}
export default Navbar;