import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SiAddthis } from 'react-icons/si';
import ReactPaginate from 'react-paginate';
import FreedomFighterRow from '../../components/FreedomFighterRow/FreedomFighterRow';

const Home = () => {

    const router = useRouter();
    const [freedomFightersData, setFreedomFightersData] = useState();
    const [totalData, setTotalData] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/freedomFighters?page=${currentPage}`)
            .then(res => res.json())
            .then(data => {
                setFreedomFightersData(data.freedomFighters);
                setTotalData(data.totalFreedomFighterCount)
            })
        // setFreedomFightersData(freedomFighters);
        // console.log('Total:' + data.totalFreedomFighterCount)
        // setTotalData(totalFreedomFighterCount);
    }, [currentPage])

    // console.log(freedomFightersData)

    //refresh the component
    const refreshData = () => {
        router.replace(router.asPath);
    }

    const handlePageClick = (e) => {
        setCurrentPage(parseInt(e.selected + 1))
    }

    // const pageCount = Math.ceil(totalData / 2);
    const pageCount = Math.ceil(totalData / 2);


    return (
        <div>
            <div className="overflow-x-auto m-8">
                <div className='max-w-7xl mx-auto'>
                    <div className='bg-primary p-2 rounded-md inline-block mb-2'>
                        <Link href={`${router.asPath}/add-new`} className='flex items-center gap-x-2'><SiAddthis /> Add Freedom Fighter</Link>
                    </div>
                    <table className="table-auto container w-full mx-auto shadow-md">
                        <thead className='bg-primary '>
                            <tr className='w-full text-left rounded-t-md'>
                                <th className='p-2 rounded-tl-md'>Name</th>
                                <th>Contact</th>
                                <th>Rank</th>
                                <th>Upadhi</th>
                                <th>Attended</th>
                                <th className='rounded-tr-md'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='border bg-white'>
                            {
                                freedomFightersData && freedomFightersData?.map(fighter =>
                                    <FreedomFighterRow key={fighter._id} freedomFighter={fighter} refreshData={refreshData}></FreedomFighterRow>
                                )
                            }
                        </tbody>
                    </table>

                    <div className='flex w-full justify-between text-primary p-2 bg-gray-100'>
                        <div>
                            <p>Showing {freedomFightersData?.length} of {totalData} data</p>
                        </div>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="< previous"
                            renderOnZeroPageCount={null}
                            className=' flex gap-x-4 justify-end'
                        />
                    </div>

                    {/* pagination  */}
                    {/* <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                        <div class="flex flex-1 justify-between sm:hidden">
                            <a href="#" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
                            <a href="#" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
                        </div>
                        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p class="text-sm text-gray-700">
                                    Showing
                                    <span class="font-medium">1</span>
                                    to
                                    <span class="font-medium">10</span>
                                    of
                                    <span class="font-medium">97</span>
                                    results
                                </p>
                            </div>
                            <div>
                                <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                    <a href="#" class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                                        <span class="sr-only">Previous</span>

                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                                        </svg>
                                    </a>

                                    <a href="#" aria-current="page" class="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20">1</a>
                                    <a href="#" class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">2</a>
                                    <a href="#" class="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex">3</a>
                                    <span class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">...</span>
                                    <a href="#" class="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex">8</a>
                                    <a href="#" class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">9</a>
                                    <a href="#" class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">10</a>
                                    <a href="#" class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                                        <span class="sr-only">Next</span>

                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                                        </svg>
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>
        </div>
    );
};

export default Home;


// export const getStaticProps = async (context) => {
//     const { totalFreedomFighterCount, freedomFighters } = await getFreedomFighter();
//     // console.log(users)
//     const result = JSON.parse(JSON.stringify(freedomFighters))

//     return {
//         props: {
//             freedomFighters: result,
//             totalFreedomFighterCount
//             // getStaticProps: JSON.parse(JSON.stringify(getStaticProps))
//         }
//     }
// }