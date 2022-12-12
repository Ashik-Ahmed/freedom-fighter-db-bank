import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleFreedomFighter } from '../../../controllers/freedomFighter.controller';
import photo from '../../../Images/photo.png'

const FreedomFighter = ({ query, children }) => {

    const router = useRouter();
    const { id } = router.query;
    const [freedomFighter, setFreedomFighter] = useState()
    const [profileImg, setProfileImg] = useState()


    useEffect(() => {
        getSingleFreedomFighter(id)
            .then(data => {

                setFreedomFighter(data);

                // convert image binary/Buffer data to base64 string
                // setProfileImg(btoa(
                //     String.fromCharCode(...new Uint8Array(data?.profilePhoto?.data))
                // ))

                // convert image binary/Buffer data to base64 string
                const base64 = btoa(new Uint8Array(data?.profilePhoto?.data).reduce(
                    function (data, byte) {
                        return data + String.fromCharCode(byte);
                    },
                    ''
                ));

                setProfileImg(base64);
            })
    }, [id])


    // if (id) {
    //     fetch(`http://localhost:5000/api/v1/freedomFighters/${id}`)
    //         .then((res => res.json()))
    //         .then(data => {
    //             setFreedomFighter(data[0])
    //         })
    // }

    // const { name, mobile, email, description, status, address, force, officialRank, freedomFighterRank, invited } = freedomFighter;


    if (!freedomFighter) {
        return <div className='w-full h-screen flex justify-center items-center'>
            <p className='text-3xl text-primary'>Loading....</p>
        </div>
    }

    return (
        <div className='text-primary'>
            <div className='max-w-7xl mx-auto m-12 bg-white rounded-md'>
                <div className='flex p-4 gap-x-12'>
                    <div className='flex flex-col justify-between bg-secondary bg-opacity-40 p-4 w-1/3 min-h-96'>
                        <div className="flex justify-between items-center w-full mb-8">
                            <div className=''>
                                <p> <span className='text-xl font-bold'>{freedomFighter?.name}</span> <span className='italic'>({freedomFighter?.force})</span></p>
                                <p> <span className='font-semibold'>ID No.</span> {freedomFighter?.id || 'N/A'} </p>
                                <p><span className='font-semibold'>Designation:</span> {freedomFighter?.freedomFighterRank?.rank || 'N/A'}</p>
                            </div>
                            <div className="avatar">
                                <div className="w-28">
                                    <Image
                                        priority
                                        // src={freedomFighter.photo ? `/profilePhotos/${freedomFighter.photo}` : photo} alt='freedomFighterPhoto'
                                        src={freedomFighter.profilePhoto ? `data:image/png;base64, ${profileImg}` : photo} alt='freedomFighterPhoto'
                                        width='112'
                                        height='100'
                                        className='border border-primary' />
                                </div>
                            </div>
                        </div>
                        {/* <p>Contact: {freedomFighter?.mobile}</p>
                        <p>Email: {freedomFighter?.email}</p>
                        <p>Address: {freedomFighter?.address}</p>
                        <p>Status: {freedomFighter?.status}</p>
                        <p>Description: {freedomFighter?.description}</p>
                        <p>Force: {freedomFighter?.force}</p>
                        <p>Official Rank: {freedomFighter?.officialRank.rank}</p>
                        <p>Freedom Fighter Rank: {freedomFighter?.freedomFighterRank.rank}</p>
                        <p>Invited Year: {freedomFighter?.invited?.map((year, index) => <span key={index}>{year}, </span>)}</p> */}

                        <div className='flex flex-col gap-y-2 mb-0'>
                            <Link href={`/freedom-fighters/${freedomFighter?._id}/details`} className='bg-primary bg-opacity-80 p-2 text-white hover:bg-secondary'> <span >Details</span></Link>
                            {
                                freedomFighter?.successor.length > 0 ?
                                    <Link href={`/freedom-fighters/${freedomFighter?._id}/successor`} className='bg-primary bg-opacity-80 p-2 text-white hover:bg-secondary'><span >Successor Info</span></Link>
                                    :
                                    <Link href={`/freedom-fighters/${freedomFighter?._id}/add-successor`} className='bg-primary bg-opacity-80 p-2 text-white hover:bg-secondary'><span >Add Successor</span></Link>
                            }
                            <p className='bg-primary bg-opacity-80 p-2 text-white hover:bg-secondary'><span >Complaint History</span></p>
                        </div>
                    </div>
                    <div className='w-2/3'>
                        {children}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default FreedomFighter;

// export const getStaticProps = async (context) => {
//     const { query } = context
//     console.log(query);

//     return {
//         props: {
//             query
//         }
//     }
// }