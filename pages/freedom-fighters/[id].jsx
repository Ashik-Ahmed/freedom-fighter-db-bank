import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleFreedomFighter } from '../../controllers/freedomFighter.controller';
import photo from '../../Images/photo.png'

const Details = ({ children }) => {

    const router = useRouter();
    const { id } = router.query;
    const [freedomFighter, setFreedomFighter] = useState()

    useEffect(() => {
        getSingleFreedomFighter(id)
            .then(data => setFreedomFighter(data))
    }, [id])

    // if (id) {
    //     fetch(`http://localhost:5000/api/v1/freedomFighters/${id}`)
    //         .then((res => res.json()))
    //         .then(data => {
    //             setFreedomFighter(data[0])
    //         })
    // }

    // const { name, mobile, email, description, status, address, force, officialRank, freedomFighterRank, invited } = freedomFighter;

    return (
        <div className='text-primary'>
            <div className='max-w-7xl mx-auto m-12 bg-white rounded-md'>
                <div className='flex p-4 gap-x-12'>
                    <div className='bg-secondary bg-opacity-40 p-4 w-1/4'>
                        <div className="avatar w-full">
                            <div className="relative mx-auto w-24 md:w-36 rounded-full">
                                <Image
                                    priority
                                    src={photo} alt='freedomFighterPhoto'
                                    layout='fill'
                                    objectFit='contain'
                                    className='rounded-full border border-red-500' />
                            </div>
                        </div>
                        <p>Name: {freedomFighter?.name}</p>
                        {/* <p>Contact: {freedomFighter?.mobile}</p>
                        <p>Email: {freedomFighter?.email}</p>
                        <p>Address: {freedomFighter?.address}</p>
                        <p>Status: {freedomFighter?.status}</p>
                        <p>Description: {freedomFighter?.description}</p>
                        <p>Force: {freedomFighter?.force}</p>
                        <p>Official Rank: {freedomFighter?.officialRank.rank}</p>
                        <p>Freedom Fighter Rank: {freedomFighter?.freedomFighterRank.rank}</p>
                        <p>Invited Year: {freedomFighter?.invited?.map((year, index) => <span key={index}>{year}, </span>)}</p> */}

                        <div className='flex flex-col gap-y-2'>
                            <Link href={`/freedom-fighters/${freedomFighter?._id}`} className='bg-primary bg-opacity-80 p-2 text-white'> <span >Details</span></Link>
                            <Link href={`/freedom-fighters/successor`} className='bg-primary bg-opacity-80 p-2 text-white'><span >Successor Info</span></Link>
                            <Link href={`/freedom-fighters/successor`} className='bg-primary bg-opacity-80 p-2 text-white'><span >Complaint History</span></Link>
                        </div>
                    </div>
                    <div className='w-3/4'>
                        {children}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Details;