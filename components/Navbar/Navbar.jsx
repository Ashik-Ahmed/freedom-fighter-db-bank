import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import photo from '../../Images/photo.png'
import Cookies from 'universal-cookie';

const Navbar = ({ user, setUser }) => {

    const cookie = new Cookies();

    const handlLogout = () => {
        console.log('logout');
        cookie.remove('TOKEN')
        setUser(false)
    }

    return (
        <div className="bg-primary">
            <div className="navbar text-gray-200 px-20 max-w-9xl mx-auto">
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
                            <li><Link href='/selection'>Selection</Link></li>
                        </ul>
                    </div>
                    <Link href='/' className="btn btn-ghost normal-case text-xl">Invitation Management</Link>
                </div>
                <div className="navbar-end hidden lg:flex">
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
                </div>
                <div className="dropdown dropdown-end ml-auto lg:ml-10">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <Image src={photo} alt='UserProfilePhoto' width='10' height='10' layout='responsive' />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-primary rounded-box w-52">
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