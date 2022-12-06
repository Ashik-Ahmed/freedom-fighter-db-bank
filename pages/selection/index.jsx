import React, { useState } from 'react';

const Selection = () => {

    const [selectedFreedomFighters, setSelectedFreedomFighters] = useState()
    const [firstCriteria, setFirstCriteria] = useState('')
    const [secondCriteria, setSecondCriteria] = useState('')
    const [thirdCriteria, setThirdCriteria] = useState('')

    const handleSelection = (e) => {

        e.preventDefault();

        console.log(firstCriteria, secondCriteria);

        const total = e.target.total.value
        // const alive = e.target.alive.value
        // const dead = e.target.dead.value

        //     fetch(`http://localhost:5000/api/v1/selection?total=${total}&alive=${alive}&dead=${dead}&firstCriteria=${firstCriteria}&secondCriteria=${secondCriteria}`)
        //         .then(res => res.json())
        //         .then(data => setSelectedFreedomFighters(data.data))
        // }
        fetch(`http://localhost:5000/api/v1/selection?total=${total}&firstCriteria=${firstCriteria}&secondCriteria=${secondCriteria || 'name'}&thirdCriteria=${thirdCriteria || 'name'}`)
            .then(res => res.json())
            .then(data => {
                setSelectedFreedomFighters(data.data)
            })
    }

    // console.log(selectedFreedomFighters);

    return (
        <div>
            <div className='text-center mt-8'>
                <h2 className='text-4xl text-secondary font-bold'>Primary Selection</h2>
            </div>

            <form onSubmit={handleSelection} className='container mx-auto'>
                <div className='flex gap-x-4 mx-auto justify-center my-4'>
                    <div className="relative">
                        <input name='total' type="number" id="total" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="total" className="absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-4  top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/3 peer-focus:top-2  peer-focus:-translate-y-4 left-1">*Total</label>
                    </div>
                    <div className="relative">
                        <select onChange={(e) => setFirstCriteria(e.target.value)} name='force' className="p-3 rounded-md text-gray-400 w-full" required>
                            <option value='' disabled selected>*First Criteria</option>
                            <option value="name">Name</option>
                            <option value="invited_count">Invited Count</option>
                            <option value="freedomFighterRank.point">Freedom Fighter Rank</option>
                            <option value="officialRank.point">Official Rank</option>

                        </select>
                    </div>
                    {
                        firstCriteria &&
                        <div className="relative">
                            <select onChange={(e) => setSecondCriteria(e.target.value)} name='force' className="p-3 rounded-md text-gray-400 w-full" >
                                <option value='' disabled selected>*Second Criteria</option>
                                <option value="name">Name</option>
                                <option value="invited_count">Invited Count</option>
                                <option value="freedomFighterRank.point">Freedom Fighter Rank</option>
                                <option value="officialRank.point">Official Rank</option>

                            </select>
                        </div>
                    }
                    {
                        secondCriteria &&
                        <div className="relative">
                            <select onChange={(e) => setThirdCriteria(e.target.value)} name='force' className="p-3 rounded-md text-gray-400 w-full" >
                                <option value='' disabled selected>*Third Criteria</option>
                                <option value="name">Name</option>
                                <option value="invited_count">Invited Count</option>
                                <option value="freedomFighterRank.point">Freedom Fighter Rank</option>
                                <option value="officialRank.point">Official Rank</option>

                            </select>
                        </div>
                    }
                    <div>
                        <input className='btn btn-primary hover:bg-secondary border-0 w-full' type="submit" value='Submit' />
                    </div>
                </div>
            </form >
            {/* <div className='text-center mb-6'>
                <button onClick={handleSelection} className='btn btn-primary'>Click to select</button>
            </div> */}

            {
                selectedFreedomFighters &&
                <table className="table-auto container w-full mx-auto shadow-md">
                    <thead className='bg-primary '>
                        <tr className='w-full text-left rounded-t-md'>
                            <th className='p-2 rounded-tl-md'>Name</th>
                            <th>Official Rank</th>
                            <th>Freedom Fighter Rank</th>
                            <th>Invitation Count</th>
                            <th>Invitation Year</th>
                        </tr>
                    </thead>
                    <tbody className='border bg-white'>
                        {
                            selectedFreedomFighters?.map(fighter =>
                                <tr key={fighter._id} className='border-b text-gray-500'>
                                    <td className='p-2'>{fighter?.name}</td>
                                    <td>{fighter?.officialRank?.point}</td>
                                    <td>{fighter?.freedomFighterRank?.point}</td>
                                    <td>{fighter?.invited_count} Times</td>
                                    <td>{fighter?.invited?.map((year, index) => <span key={index}>{year}, </span>) || 'N/A'} </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            }
        </div >
    );
};

export default Selection;