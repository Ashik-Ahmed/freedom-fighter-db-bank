import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Cookies from 'universal-cookie';
import UserRow from '../../components/UserRow/UserRow';
import { SiAddthis } from 'react-icons/si';

const ManageUsers = () => {

    const [users, setUsers] = useState();
    const [totalData, setTotalData] = useState(10);
    const [currentPage, setCurrentPage] = useState(0)

    const cookie = new Cookies();

    useEffect(() => {
        fetch('http://localhost:5000/api/v1/users', {
            headers: {
                authorization: `Bearer ${cookie.get('TOKEN')}`
            }
        })
            .then(res => res.json())
            .then(data => { setUsers(data.data) })
    }, [])


    const handlePageClick = (e) => {
        setCurrentPage(parseInt(e?.selected) + 1);
    }

    const pageCount = Math.ceil(totalData / 10);

    return (
        <div className='max-w-6xl mx-auto my-4'>
            <div className='bg-primary p-2 rounded-md inline-block mb-2'>
                <Link href={`/manage-users/add-new`} className='flex items-center gap-x-2'><SiAddthis /> Add New User</Link>
            </div>
            <table className="table-auto container w-full mx-auto shadow-md">
                <thead className='bg-primary '>
                    <tr className='w-full text-left rounded-t-md'>
                        <th className='p-2 rounded-tl-md'>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th className='rounded-tr-md'>Action</th>
                    </tr>
                </thead>
                <tbody className='border bg-white'>
                    {
                        users && users?.map(user => <UserRow key={user._id} user={user}></UserRow>)
                    }
                </tbody>
            </table>
            <div className='flex w-full justify-between text-primary p-2 bg-gray-100 rounded-b-md'>
                <div>
                    <p>Showing {users?.length} of {totalData} data</p>
                </div>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    className='flex gap-x-4 justify-end p-1'
                    activeClassName='bg-primary text-white px-2 rounded-md font-semibold'
                />
            </div>
        </div>
    );
};

export default ManageUsers;