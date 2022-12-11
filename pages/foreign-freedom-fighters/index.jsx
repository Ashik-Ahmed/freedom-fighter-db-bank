import React, { useEffect, useState } from 'react';

const ForeignFreedomFighters = () => {
    const [freedomFightersData, setFreedomFightersData] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [currentPage, setCurrentPage] = useState(0)
    const [filter, setFilter] = useState('')

    useEffect(() => {

        var url = `http://localhost:5000/api/v1/freedomFighters?page=${parseInt(currentPage || 1)}&country=Bangladesh`

        if (filter) {
            url = `http://localhost:5000/api/v1/freedomFighters?page=${parseInt(currentPage || 1)}&force=${filter || {}}&country=Bangladesh`
        }

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setFreedomFightersData(data.freedomFighters);
                setTotalData(data.totalFreedomFighterCount)
            })


    }, [currentPage, filter])

    return (
        <div>
            <p className='text-primary text-2xl font-bold flex justify-center items-center'> Foreign Fighter List</p>
        </div>
    );
};

export default ForeignFreedomFighters;