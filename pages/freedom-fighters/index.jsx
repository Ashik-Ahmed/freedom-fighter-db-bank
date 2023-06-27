import React, { useEffect, useState } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
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
import { useRouter } from 'next/router';
import EditMember from '../../components/EditMember/EditMember';


const Home = () => {

    const [loading, setLoading] = useState(false)
    const [members, setMembers] = useState([]);
    const [member, setMember] = useState(null);
    const [editMemberDialogue, setEditMemberDialogue] = useState(false)
    const [deleteMemberDialogue, setDeleteMemberDialogue] = useState(false);
    const [currentPage, setCurrentPage] = useState(0)
    const [filter, setFilter] = useState('')
    const [countries, setCountries] = useState([]);
    const [totalData, setTotalData] = useState(0);
    // const [searchValue, setSearchValue] = useState('');
    // const [addMemberDialog, setAddMemberDialog] = useState(false);
    // const [memberType, setMemberType] = useState('')

    // const [ranks, setRanks] = useState([]);
    // const [country, setCountry] = useState();
    // const [force, setForce] = useState('');
    // const [rank, setRank] = useState('');
    // const [fighterRank, setFighterRank] = useState('');
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        category: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        mobile: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
    });

    const router = useRouter()

    useEffect(() => {
        setCountries(countryList().getLabels())
    }, [])

    // countries?.map(country => console.log(country?.name?.common))

    const getAllMembers = () => {
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
    }

    //face members from DB
    useEffect(() => {
        getAllMembers()
    }, [])


    //delete a Member
    const handleDeleteMember = (id) => {
        // console.log(id);
        fetch(`http://localhost:5000/api/v1/freedomFighters/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                getAllMembers()
            })
        setDeleteMemberDialogue(null)
    }

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const header = (
        <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
            <h4 className="m-0 text-lg">Member List</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </span>
        </div>
    );


    const forceBodyTemplate = (rowData) => {
        return (
            <div>
                {
                    rowData?.force ?
                        <div>{rowData.force} <span className='text-xs italic'>({rowData?.officialRank?.point > 13 ? 'Officer' : 'JCO/OR'})</span> </div>
                        :
                        <div>Civilian</div>
                }
            </div>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div>
                <Button onClick={() => {
                    router.push(`/freedom-fighters/${rowData._id}/details`)
                }} icon="pi pi-info" rounded outlined className="mr-2 p-button-sm p-button-info" />
                <Button onClick={() => {
                    setMember(rowData);
                    setEditMemberDialogue(true)
                }} icon="pi pi-user-edit" rounded outlined className='p-button p-button-sm p-button-success mr-2' />
                <Button onClick={() => {
                    setMember(rowData)
                    setDeleteMemberDialogue(true)
                }} icon="pi pi-trash" rounded outlined severity="danger" className='p-button-sm p-button-danger' />
            </div >
        )
    }

    return (
        <div>
            <div className='bg-white p-2 max-w-7xl mx-auto rounded-md shadow-lg min-h-[97vh]'>
                <DataTable value={members} header={header} rowsPerPageOptions={[10, 25, 50]}
                    filters={filters} filterDisplay="menu" globalFilterFields={['name', 'category', 'force', 'officialRank.rank', 'mobile', 'address']} emptyMessage="No Members found."
                    dataKey="id" size='small' responsiveLayout="scroll" scrollHeight="84vh" loading={loading} stripedRows removableSort >
                    <Column header="#" headerStyle={{ width: '3rem' }} body={(data, options) => options.rowIndex + 1}></Column>
                    <Column header='Name' field='name' sortable ></Column>
                    <Column header='Category' field='category'></Column>
                    <Column header='Force' body={forceBodyTemplate}></Column>
                    {/* <Column header='Force' body={typeBodyTemplate}></Column> */}
                    <Column header='Contact' field='mobile'></Column>
                    {/* <Column header='Address' field='address'></Column> */}
                    <Column header='Invitation Count' field='invitationCount' style={{ textAlign: 'center' }}></Column>
                    <Column header='Action' body={actionBodyTemplate} ></Column>
                </DataTable >
            </div >

            {/* edit member dialog box  */}
            < Dialog header={`Edit Member`} visible={editMemberDialogue} onHide={() => setEditMemberDialogue(false)} breakpoints={{ '960px': '75vw' }} style={{ width: '70vw' }} >
                <div className='mx-auto max-w-7xl'>
                    <EditMember member={member} getAllMembers={getAllMembers} setEditMemberDialogue={setEditMemberDialogue} />

                    {/* action='http://localhost:5000/api/v1/freedomFighters' method='POST' encType='multipart/form-data'*/}
                    {/* <form onSubmit={handleEditMember} className='space-y-4 bg-gray-100 bg-opacity-90 p-4 shadow-xl rounded-md'>
                        <p className='text-2xl font-bold text-primary mx-auto'>Please fill the information</p>
                        <div>
                            <Dropdown name='memberType' options={memberTypes} value={memberType}
                                onChange={(e) => {
                                    handleChange(e)
                                    setMemberType(e.value)
                                }} placeholder="*Select Member Type" className='text-black w-full' required />
                        </div>
                        <div className='flex w-full gap-x-12'>
                            <div className="p-float-label w-1/2">
                                <InputText name='fullName' id='fullName'
                                    onChange={handleChange}
                                    className='w-full' required />
                                <label htmlFor="fullName" >*Full Name</label>
                            </div>
                            <div className='p-float-label w-1/2'>
                                <InputText name='email' id='email'
                                    onChange={handleChange}
                                    className='w-full' required />
                                <label htmlFor="email">*Email</label>
                            </div>
                        </div>
                        <div className='flex w-full gap-x-12 items-center'>
                            <div className='p-float-label w-1/3'>
                                <InputText name='mobile' id='mobile'
                                    onChange={handleChange}
                                    className='w-full' required />
                                <label htmlFor="mobile">*Contact</label>
                            </div>
                            <div className='w-1/3'>
                                <Dropdown name='country' options={countries} value={country}
                                    onChange={(e) => {
                                        handleChange(e)
                                        setCountry(e.value)
                                    }} placeholder="*Select a Country" className='text-black w-full' required />
                            </div>
                            <div className='w-1/3 flex items-center py-1 bg-white rounded-md border-2'>
                                <label className='mr-8 ml-2'>*Status: </label>
                                <div className='flex gap-x-4'>
                                    <div className="form-control">
                                        <label className="label cursor-pointer space-x-2">
                                            <input name='status' value='Alive' type="radio" className="radio checked:bg-blue-500 border border-primary" required />
                                            <span className="label-text text-gray-500">Alive</span>
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="label cursor-pointer space-x-2">
                                            <input name='status' value='Dead' type="radio" className="radio checked:bg-red-500 border border-primary" required />
                                            <span className="label-text text-gray-500">Dead</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex w-full gap-x-12'>

                            <div className='w-1/3'>
                                <Dropdown name='force' options={forces} value={force}
                                    onChange={(e) => {
                                        handleChange(e)
                                        setForce(e.value)
                                    }} placeholder="*Select a Force" className='text-black w-full' required />
                            </div>
                            <div className='w-1/3'>
                                <Dropdown name='officialRank' options={force && (force == 'Army' ? armyRank : (force == 'Navy' ? navyRank : airForceRank))} value={rank} onChange={(e) => {
                                    handleChange(e)
                                    setRank(e.value)
                                }} placeholder="*Official Rank" className='text-black w-full' required />
                            </div>
                            <div className='w-1/3'>
                                <Dropdown name='freedomFighterRank' options={fighterRanks} value={fighterRank}
                                    onChange={(e) => {
                                        handleChange(e)
                                        console.log(e.value);
                                        setFighterRank(e.value)
                                    }} placeholder="*Freedom Fighter Rank" className='text-black w-full' required />

                            </div>
                        </div>
                        <div className='flex gap-x-12'>
                            <div className="relative w-1/2">
                                <div className="p-float-label w-full">
                                    <InputTextarea name='address' id='address'
                                        onChange={handleChange}
                                        className=" w-full" required />
                                    <label htmlFor="address">*Address</label>
                                </div>
                            </div>
                            <div className="relative w-1/2">
                                <div className="p-float-label w-full">
                                    <InputTextarea name='description' id='description'
                                        onChange={handleChange}
                                        className=" w-full" />
                                    <label htmlFor="description">Description</label>
                                </div>
                            </div>
                        </div>
                        <div className='relative'>
                            <label className='text-gray-400 ml-1'>Photo</label>
                            <input name='file' type="file"
                                onChange={handleFileChange}
                                className="file-input file-input-primary input-bordered file-input-sm w-full bg-white text-gray-400" />
                        </div>

                        <div className='text-center pt-20'>
                            <Button type='submit' label="Submit" icon="pi pi-check" className='p-button-info p-button-sm' />
                        </div>
                    </form> */}
                </div>
            </Dialog >

            {/* dialogue delete member from primary selected  */}
            < Dialog visible={deleteMemberDialogue} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal onHide={() => setDeleteMemberDialogue(false)}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3 text-red-500" style={{ fontSize: '2rem' }} />
                    {member && (
                        <span>
                            Are you sure you want to delete <b>{member.name}</b>?
                        </span>
                    )}

                    <div className='flex gap-x-2 mt-4 justify-end'>
                        <Button label="No" icon="pi pi-times" className='p-button-sm' outlined onClick={() => setDeleteMemberDialogue(false)} />
                        <Button label="Yes" icon="pi pi-check" className='p-button-danger p-button-sm' severity="danger" onClick={() => handleDeleteMember(member._id)} />
                    </div>
                </div>
            </Dialog >

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