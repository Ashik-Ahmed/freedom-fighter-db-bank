import React, { useEffect } from 'react';

const ForeignFreedomFighters = () => {
    const [freedomFightersData, setFreedomFightersData] = useState(freedomFighters);
    const [totalData, setTotalData] = useState(totalFreedomFighterCount);
    const [currentPage, setCurrentPage] = useState(0)

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
            Foreign Fighter List
        </div>
    );
};

export default ForeignFreedomFighters;