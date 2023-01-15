import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SiAddthis, SiMetafilter } from 'react-icons/si';
import ReactPaginate from 'react-paginate';
import FreedomFighterRow from '../../components/FreedomFighterRow/FreedomFighterRow';
import { getFreedomFighters } from '../../controllers/freedomFighter.controller';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';


const Home = ({ totalFreedomFighterCount, freedomFighters }) => {

    const router = useRouter();
    const [freedomFightersData, setFreedomFightersData] = useState(freedomFighters);
    const [totalData, setTotalData] = useState(totalFreedomFighterCount);
    const [currentPage, setCurrentPage] = useState(0)
    const [filter, setFilter] = useState('')
    const [searchValue, setSearchValue] = useState('');

    //refresh the component
    // const refreshData = () => {
    //     router.replace(router.asPath);
    // }

    // const getFreedomFighters = () => {
    //     const data = useFreedomFighters(currentPage, filter)
    // }

    useEffect(() => {
        console.log(filter)

        var url = `http://localhost:5000/api/v1/freedomFighters?page=${parseInt(currentPage || 1)}`

        if (filter) {
            url = `http://localhost:5000/api/v1/freedomFighters?page=${parseInt(currentPage || 1)}&force=${filter || {}}`
        }

        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data.freedomFighters);
                setFreedomFightersData(data.freedomFighters);
                setTotalData(data.totalFreedomFighterCount)
            })
    }, [currentPage, filter])

    const handlePageClick = (e) => {
        setCurrentPage(parseInt(e?.selected) + 1)
        // const filter = e.target.force.value;
        // console.log(filter)


        // setCurrentPage(parseInt(e.selected + 1));
        // fetch(`http://localhost:5000/api/v1/freedomFighters?page=${parseInt((e?.selected + 1) || 1)}&force=${filter}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         setFreedomFightersData(data.freedomFighters);
        //         setTotalData(data.totalFreedomFighterCount)
        //     })
    }

    const handleFilter = (e, filterValue) => {
        e.preventDefault()

        const filter = e.target.filter.value;
        setFilter(filter)

        // console.log(e.target.force.value);
        // handlePageClick(e)
    }

    // const pageCount = Math.ceil(totalData / 2);
    const pageCount = Math.ceil(totalData / 10);


    return (
        <div>
            <div className="overflow-x-auto m-8">
                <div className='max-w-6xl mx-auto'>
                    <div className='rounded-md inline-block mb-2'>
                        {/* <Link href={`/freedom-fighters/add-new`} className='btn btn-sm btn-primary flex items-center gap-x-2'><SiAddthis /> Add New Member</Link> */}
                        {/* <Link href={`/freedom-fighters/add-new`} className='p-button-info btn btn-primary flex items-center gap-x-2 normal-case font-bold text-lg'><i className='pi pi-user-plus
'></i> Add Member</Link> */}

                        <Button label='Add Member' onClick={() => router.push('/freedom-fighters/add-new')} icon='pi pi-user-plus' className='p-button-info btn normal-case' />
                    </div>


                    {/* <form onSubmit={handleFilter} className='flex gap-x-2 mb-2'>
                            <select name='filter' onChange={(e) => setFilter(e.target.selected)} className="p-2 rounded-md text-gray-400 w-full" required>
                                <option value='' disabled selected>Filter</option>
                                <option value='Army'>Army</option>
                                <option value='Navy'>Navy</option>
                                <option value='Air Force'>Air Force</option>
                            </select>
                            <input type="submit" value='Go' className='bg-primary p-1 px-4 rounded-md cursor-pointer' />
                        </form> */}
                    <div className='p-4 border-2 shadow-md bg-white rounded-md'>
                        <div className='flex justify-between items-center mb-2'>
                            <div className='text-gray-600 text-xl font-bold'>
                                <p>Member List</p>
                            </div>
                            <div className='space-x-4'>
                                <Dropdown name='filter' value={filter}
                                    options={
                                        [
                                            { label: 'Army', value: 'Army' },
                                            { label: 'Navy', value: 'Navy' },
                                            { label: 'Air Force', value: 'Air Force' }
                                        ]
                                    }
                                    onChange={(e) => setFilter(e.value)} placeholder="Filter" />

                                {/* <select name='filter' onChange={(e) => { setFilter(e.target.value); }} className="p-3 rounded-md text-gray-400 mb-2" required>
                                    <option value='' disabled selected>Filter</option>
                                    <option key='force' value='Army'>Army</option>
                                    <option value='Navy'>Navy</option>
                                    <option value='Air Force'>Air Force</option>
                                </select> */}
                                {/* <div className='rounded-md float-right'>
                            <input onChange={(e) => setSearchValue(e.target.value)} className='input bg-white text-gray-700' placeholder='Search' />
                        </div> */}
                                <span className="p-input-icon-left w-full md:w-auto">
                                    <i className="pi pi-search" />
                                    <InputText type="search" onInput={(e) => setSearchValue(e.target.value)} placeholder="Search..." className="w-full lg:w-auto" />
                                </span>
                            </div>
                        </div>
                        <table className="table-auto container w-full mx-auto shadow-md">
                            <thead className='bg-slate-200 text-gray-500'>
                                <tr className='w-full text-left rounded-t-md'>
                                    <th className='p-2 rounded-tl-md'>Name</th>
                                    <th>Force</th>
                                    <th>Official Rank</th>
                                    <th>Upadhi</th>
                                    <th>Status</th>
                                    <th>Attended</th>
                                    <th className='rounded-tr-md'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='border bg-white'>
                                {
                                    freedomFightersData && freedomFightersData.filter(fighter => {
                                        if (searchValue == '') {
                                            return fighter;
                                        }
                                        else if (fighter.name.toLowerCase().includes(searchValue.toLowerCase())) {
                                            return fighter;
                                        }
                                    }).splice(currentPage * 10, 10)?.map(fighter =>
                                        <FreedomFighterRow key={fighter._id} freedomFighter={fighter} refreshData={handlePageClick}></FreedomFighterRow>
                                    )
                                }
                            </tbody>
                        </table>

                        <div className='w-full text-primary p-2 bg-white rounded-b-md'>
                            {/* <div>
                            <p>Showing {freedomFightersData?.length} of {totalData} data</p>
                        </div> */}
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel="next >"
                                // onPageChange={handlePageClick}
                                onPageChange={(e) => setCurrentPage(e.selected)}
                                pageRangeDisplayed={3}
                                pageCount={pageCount}
                                previousLabel="< prev"
                                renderOnZeroPageCount={null}
                                className='flex gap-x-4 justify-end px-1'
                                activeClassName='bg-primary text-white px-2 rounded-full font-semibold'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Home;


export const getStaticProps = async (context) => {
    const { totalFreedomFighterCount, freedomFighters } = await getFreedomFighters();
    const result = JSON.parse(JSON.stringify(freedomFighters))

    return {
        props: {
            freedomFighters: result,
            totalFreedomFighterCount
            // getStaticProps: JSON.parse(JSON.stringify(getStaticProps))
        },
        revalidate: 10,
    }
}