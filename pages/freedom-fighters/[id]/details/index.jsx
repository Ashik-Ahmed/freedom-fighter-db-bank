import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import FreedomFighter from '..';
import { getSingleFreedomFighter } from '../../../../controllers/freedomFighter.controller';

const Details = () => {


    const router = useRouter();
    const { id } = router.query;
    const [freedomFighter, setFreedomFighter] = useState()

    useEffect(() => {
        getSingleFreedomFighter(id)
            .then(data => {
                setFreedomFighter(data)
                console.log(data);
            })
    }, [id])

    // const { name, email, mobile, address, description, status, force, officialRank, freedomFighterRank, invited } = freedomFighter;

    return (
        <FreedomFighter>
            <div>
                <div className='bg-primary text-xl text-center text-gray-100 p-2 font-semibold'>
                    <h3>Member Details</h3>
                </div>
                <div className='text-gray-700 space-y-4 bg-white p-2'>
                    <div className='border border-fray-100 shadow-md rounded-md p-2'>
                        <p><span className='font-bold'>Name: </span>{freedomFighter?.name || 'N/A'}</p>
                        <p><span className='font-bold'>Bio: </span>{freedomFighter?.description || 'N/A'}</p>
                        <p><span className='font-bold'>Force: </span>{freedomFighter?.force || 'N/A'}</p>
                        <p><span className='font-bold'>Official Rank: </span>{freedomFighter?.officialRank?.rank || 'N/A'}</p>
                        <p><span className='font-bold'>Freedom Fighter: </span>{freedomFighter?.freedomFighterRank?.rank || 'N/A'}</p>
                        <p><span className='font-bold'>Status: </span>{freedomFighter?.status || 'N/A'}</p>
                        <p><span className='font-bold'>Invited Count: </span>{freedomFighter?.primarySelection?.length || 'N/A'}</p>
                        <p><span className='font-bold'>Invited Year: </span>{freedomFighter?.primarySelection.map(selection => { return `${selection.event}: ${selection.year}` }, ' ', ',') || 'N/A'}</p>
                    </div>
                    <div className='border border-fray-100 shadow-md rounded-md p-2'>
                        <p><span className='font-bold'>Contact: </span>{freedomFighter?.mobile || 'N/A'}</p>
                        <p><span className='font-bold'>Email: </span>{freedomFighter?.email || 'N/A'}</p>
                        <p><span className='font-bold'>Address: </span>{freedomFighter?.address || 'N/A'}</p>
                    </div>
                </div>
            </div>
        </FreedomFighter >
    );
};

export default Details;