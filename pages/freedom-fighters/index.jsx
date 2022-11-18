import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SiAddthis, SiMetafilter } from 'react-icons/si';
import ReactPaginate from 'react-paginate';
import FreedomFighterRow from '../../components/FreedomFighterRow/FreedomFighterRow';
import { getFreedomFighters } from '../../controllers/freedomFighter.controller'

const Home = ({ totalFreedomFighterCount, freedomFighters }) => {

    // const router = useRouter();
    const [freedomFightersData, setFreedomFightersData] = useState(freedomFighters);
    const [totalData, setTotalData] = useState(totalFreedomFighterCount);
    const [currentPage, setCurrentPage] = useState(0)
    const [filter, setFilter] = useState()

    //refresh the component
    // const refreshData = () => {
    //     router.replace(router.asPath);
    // }

    useEffect(() => {

        var url = `http://localhost:5000/api/v1/freedomFighters?page=${parseInt(currentPage || 1)}`

        if (filter) {
            url = `http://localhost:5000/api/v1/freedomFighters?page=${parseInt(currentPage || 1)}&force=${filter || {}}`
        }
        console.log(url)

        fetch(url)
            .then(res => res.json())
            .then(data => {
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

    const handleFilter = (e) => {
        e.preventDefault()

        const filter = e.target.force.value;
        setFilter(filter)

        // console.log(e.target.force.value);
        // handlePageClick(e)
    }

    // const pageCount = Math.ceil(totalData / 2);
    const pageCount = Math.ceil(totalData / 10);


    return (
        <div>
            <div className="overflow-x-auto m-8">
                <div className='max-w-7xl mx-auto'>
                    <div className="flex justify-between">
                        <div className='bg-primary p-2 rounded-md inline-block mb-2'>
                            <Link href={`/freedom-fighters/add-new`} className='flex items-center gap-x-2'><SiAddthis /> Add Freedom Fighter</Link>
                        </div>
                        <form onSubmit={handleFilter} className='flex gap-x-2 mb-2'>
                            <select name='force' className="p-2 rounded-md text-gray-400 w-full" required>
                                <option value='' disabled selected>Filter by force</option>
                                <option value='Army'>Army</option>
                                <option value='Navy'>Navy</option>
                                <option value='Air Force'>Air Force</option>
                            </select>
                            <input type="submit" value='Go' className='bg-primary p-1 px-4 rounded-md cursor-pointer' />
                        </form>
                    </div>
                    <table className="table-auto container w-full mx-auto shadow-md">
                        <thead className='bg-primary '>
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
                                freedomFightersData && freedomFightersData?.map(fighter =>
                                    <FreedomFighterRow key={fighter._id} freedomFighter={fighter} refreshData={handlePageClick}></FreedomFighterRow>
                                )
                            }
                        </tbody>
                    </table>

                    <div className='flex w-full justify-between text-primary p-2 bg-gray-100 rounded-b-md'>
                        <div>
                            <p>Showing {freedomFightersData?.length} of {totalData} data</p>
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
            </div>
        </div>
    );
};

export default Home;


export const getStaticProps = async (context) => {
    const { totalFreedomFighterCount, freedomFighters } = await getFreedomFighters();
    console.log(freedomFighters)
    const result = JSON.parse(JSON.stringify(freedomFighters))

    return {
        props: {
            freedomFighters: result,
            totalFreedomFighterCount
            // getStaticProps: JSON.parse(JSON.stringify(getStaticProps))
        }
    }
}