import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleFreedomFighter } from '../../controllers/freedomFighter.controller';

const Details = () => {

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
            <p>Name: {freedomFighter?.name}</p>
            <p>Contact: {freedomFighter?.mobile}</p>
            <p>Email: {freedomFighter?.email}</p>
            <p>Address: {freedomFighter?.address}</p>
            <p>Status: {freedomFighter?.status}</p>
            <p>Description: {freedomFighter?.description}</p>
            <p>Force: {freedomFighter?.force}</p>
            <p>Official Rank: {freedomFighter?.officialRank.rank}</p>
            <p>Freedom Fighter Rank: {freedomFighter?.freedomFighterRank.rank}</p>
            <p>Invited Year: {freedomFighter?.invited?.map((year, index) => <span key={index}>{year}, </span>)}</p>
        </div>
    );
};

export default Details;