import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import FreedomFighterRow from '../../components/FreedomFighterRow/FreedomFighterRow';
import { getFreedomFighters } from '../../controllers/freedomFighter.controller';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import countryList from 'react-select-country-list'
import { InputTextarea } from 'primereact/inputtextarea';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Image from 'next/image';
import defaultUserPhoto from '../../Images/photo.png'


const Home = () => {

    const [loading, setLoading] = useState(false)
    const [members, setMembers] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [currentPage, setCurrentPage] = useState(0)
    const [filter, setFilter] = useState('')
    const [searchValue, setSearchValue] = useState('');
    const [addMemberDialog, setAddMemberDialog] = useState(false);
    const [memberType, setMemberType] = useState('')

    const [ranks, setRanks] = useState([]);
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState();
    const [force, setForce] = useState('');
    const [rank, setRank] = useState('');
    const [fighterRank, setFighterRank] = useState('');

    useEffect(() => {
        setCountries(countryList().getLabels())
    }, [])

    // countries?.map(country => console.log(country?.name?.common))



    //face members from DB
    useEffect(() => {
        setLoading(true)

        var url = `http://localhost:5000/api/v1/freedomFighters?page=${parseInt(currentPage || 1)}`

        if (filter) {
            url = `http://localhost:5000/api/v1/freedomFighters?page=${parseInt(currentPage || 1)}&force=${filter || {}}`
        }

        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data.freedomFighters);
                setMembers(data.freedomFighters);
                setTotalData(data.totalFreedomFighterCount)
                setLoading(false)
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


    const header = (
        <div className='flex justify-between items-center'>
            <div className='flex  items-center gap-x-2 text-gray-800 text-xl font-bold'>
                {members && <p>Member List</p>}
            </div>
        </div>
    );

    const memberNameBodyTemplate = async (rowData) => {

        if (!rowData.profilePhoto) {
            return <p className='bg-red-500'>Image available</p>
        }
        else {
            // convert image binary/Buffer data to base64 string
            const base64 = await btoa(new Uint8Array(rowData?.profilePhoto?.data).reduce(
                function (data, byte) {
                    return data + String.fromCharCode(byte);
                },
                ''
            ));
            return (
                <div className="flex align-items-center gap-2">
                    <Image alt={rowData.name} src={base64 || defaultUserPhoto} priority='high' width="8" height="8" className='rounded-full' />
                    <span>{rowData.name}</span>
                </div>
            )
        }
    }

    return (
        <div>

            <div className='bg-white p-2 max-w-7xl mx-auto rounded-md shadow-lg mt-2 min-h-[74vh]'>
                <DataTable value={members} header={header} dataKey="id" size='small' responsiveLayout="scroll" scrollHeight="65vh" loading={loading} stripedRows removableSort >
                    <Column header='Name' body={memberNameBodyTemplate}></Column>
                    <Column header='Member Type' field='category'></Column>
                    <Column header='Contact' field='mobile'></Column>
                    <Column header='Address' field='address'></Column>
                    {/* <Column header='Verification Status' body={actionBodyTemplate} exportable={false}></Column> */}
                </DataTable>
            </div>

            {/* <div className="overflow-x-auto">
                <div className='max-w-6xl mx-auto'>
                    <div className='p-2 border-2 shadow-md bg-white rounded-md'>
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
                                            { label: 'Air Force', value: 'Air Force' },
                                            { label: 'General Invitees', value: 'General Invitees' }
                                        ]
                                    }
                                    onChange={(e) => setFilter(e.value)} placeholder="Filter" />
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
                                    <th>Category</th>
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
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel="next >"
                                // onPageChange={handlePageClick}
                                onPageChange={(e) => setCurrentPage(e.selected)}
                                pageRangeDisplayed={3}
                                pageCount={pageCount}
                                previousLabel="< prev"
                                renderOnZeroPageCount={null}
                                className='flex gap-x-4 justify-center items-center'
                                activeClassName='bg-primary/30 text-gray-900 px-4 py-2 rounded-full font-semibold btn btn-circle btn-ghost'
                            />
                        </div>
                    </div>
                </div>
            </div> */}
        </div >
    );
};

export default Home;


// export const getStaticProps = async (context) => {
//     const { totalFreedomFighterCount, freedomFighters } = await getFreedomFighters();
//     // const result = JSON.parse(JSON.stringify(freedomFighters))
//     // const result = JSON.parse(JSON.stringify(freedomFighters))

//     return {
//         props: {
//             // freedomFighters: result,
//             totalFreedomFighterCount
//             // getStaticProps: JSON.parse(JSON.stringify(getStaticProps))
//         },
//         revalidate: 10,
//     }
// }