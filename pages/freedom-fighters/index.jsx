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


const Home = ({ totalFreedomFighterCount, freedomFighters }) => {

    const [freedomFightersData, setFreedomFightersData] = useState(freedomFighters);
    const [totalData, setTotalData] = useState(totalFreedomFighterCount);
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


    const memberTypes = [
        'Freedom Fighter',
        'General Invitees',
        'Retired',
        'Retired ORs/Other'
    ]

    const forces = [
        'Army',
        'Navy',
        'Air Force'
    ]

    const armyRank = [
        'General',
        'Lieutenant general',
        'Major general',
        'Brigadier general',
        'Colonel',
        'Lieutenant colonel',
        'Major',
        'Captain',
        'Lieutenant',
        'Second lieutenant',
        'Officer cadet',
        'Master warrant officer',
        'Senior warrant officer',
        'Warrant officer',
        'Regiment Sergeant Major',
        'Quarter Master Sergeant',
        'Sergeant Major',
        'Master Sergeant',
        'Sergeant',
        'Corporal',
        'Lance corporal',
        'Sainik'
    ]
    const navyRank = [
        'Admiral',
        'Vice admiral',
        'Rear admiral',
        'Commodore',
        'Captain',
        'Commander',
        'Lieutenant commander',
        'Lieutenant',
        'Sub-lieutenant',
        'Acting sub-lieutenant',
        'Midshipman',
        'Officer cadet',
        'Master chief petty officer',
        'Senior chief petty officer',
        'Chief petty officer',
        'Leading seaman',
        'Able seaman',
        'Ordinary seaman'
    ]
    const airForceRank = [
        'Air Chief Marshal',
        'Air Marshal',
        'Air Vice-Marshal',
        'Air Commodore',
        'Group Captain',
        'Wing Commander',
        'Squadron Leader',
        'Flight Lieutenant',
        'Flight Sergeant',
        'Flying Officer',
        'Pilot Officer',
        'Officer cadet',
        'Master warrant officer',
        'Senior warrant officer',
        'Warrant officer',
        'Sergeant',
        'Corporal',
        'Leading aircraftman',
        'Aircraftman 1',
        'Aircraftman 2'
    ]

    const fighterRanks = [
        'Bir Shreshtho',
        'Bir Bikrom',
        'Bir Uttam',
        'Bir Muktijoddha'
    ]

    const clearAllState = () => {
        setAddMemberDialog(false);
        setCountry('');
        setForce('');
        setRanks('');
        setFighterRank('');
        setMemberType('');
    }


    // use of formik 
    // const formik = useFormik({
    //     initialValues: {
    //         type: '',
    //         fullName: '',
    //         email: '',
    //         contact: '',
    //         country: '',
    //         status: '',
    //         force: '',
    //         officialRank: '',
    //         freedomFighterRank: '',
    //         address: '',
    //     },
    //     validate: (data) => {
    //         let errors = {};
    //         if (!data.type) {
    //             errors.type = 'Member type is required.';
    //         }
    //         if (!data.fullName) {
    //             errors.name = 'Name is required.';
    //         }

    //         if (!data.email) {
    //             errors.email = 'Email is required.';
    //         }
    //         else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
    //             errors.email = 'Invalid email address. E.g. example@email.com';
    //         }

    //         if (!data.contact) {
    //             errors.contact = 'Contact Number is required.';
    //         }

    //         if (!data.country) {
    //             errors.country = 'Country name is required.';
    //         }

    //         if (!data.status) {
    //             errors.status = 'Status  is required.';
    //         }

    //         if (!data.force) {
    //             errors.force = 'Force  is required.';
    //         }

    //         if (!data.officialRank) {
    //             errors.officialRank = 'Official rank  is required.';
    //         }

    //         if (!data.freedomFighterRank) {
    //             errors.freedomFighterRank = 'Freedom fighter rank  is required.';
    //         }

    //         if (!data.address) {
    //             errors.address = 'Address is required.';
    //         }

    //         return errors;
    //     },
    //     onSubmit: (data) => {
    //         setFormData(data);
    //         setShowMessage(true);

    //         formik.resetForm();
    //     }
    // });

    // const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    // const getFormErrorMessage = (name) => {
    //     return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    // };






    // const handleSelectForce = (e) => {
    //     // const force = e.target.value;
    //     if (force == 'Army') {
    //         setRanks(armyRank);
    //     }
    //     if (force == 'Navy') {
    //         setRanks(navyRank)
    //     }
    //     if (force == 'Air Force') {
    //         setRanks(airForceRank);
    //     }
    // }


    // const handleFileInput = (e) => {
    //     e.preventDefault()
    //     const formData = new FormData();
    //     formData.append('photo', e.target.files[0])
    //     // console.log(e.target.files[0])
    //     // const originalFileName = e.target.files[0].name;
    //     // const fileName = originalFileName.toLowerCase().replace(/\s+/g, '');
    //     // console.log(e.target.files[0]);

    //     fetch('http://localhost:5000/api/v1/freedomFighters/profilePhotoUpload', {
    //         method: 'POST',
    //         body: formData
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //         })

    // }

    // const handleInsertFreedomFighter = async (e) => {
    //     e.preventDefault();
    //     const data = new FormData(e.target);
    //     const fullName = data.get('fullName');
    //     const email = data.get('email');
    //     const contact = data.get('contact');
    //     // const photo = data.files[0];
    //     const photo = e.target.file;
    //     const status = data.get('status');
    //     const country = data.get('country');
    //     const force = data.get('force');
    //     const officialRank = data.get('officialRank');
    //     const freedomFighterRank = data.get('freedomFighterRank');
    //     const address = data.get('address');
    //     const description = data.get('description');

    //     // console.log(photo.toLowerCase().replace(/\s+/g, ''));

    //     // await fetch('http://localhost:5000/api/v1/freedomFighters/profilePhotoUpload', {
    //     //     method: 'POST',
    //     //     headers: {
    //     //         'encType': 'multipart/form-data'
    //     //     }
    //     // })
    //     //     .then(res => res.json())
    //     //     .then(data => { console.log(data) })

    //     const fighter = {
    //         name: fullName,
    //         email,
    //         photo,
    //         mobile: contact,
    //         country,
    //         status,
    //         force,
    //         officialRank: {
    //             rank: officialRank,
    //             point: 20
    //         },
    //         freedomFighterRank: {
    //             rank: freedomFighterRank,
    //             point: 15
    //         },
    //         address,
    //         description
    //     }
    //     // console.log(fighter)


    //     fetch('http://localhost:5000/api/v1/freedomFighters', {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json',
    //         },
    //         body: JSON.stringify(fighter),
    //     })
    //     // .then(res => res.json()).then(data => {
    //     //     console.log(data)
    //     //     if (data.status == 'success') {
    //     //         e.target.reset();
    //     //     }
    //     // })
    // }


    //face members from DB
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

                        <Button label='Add Member' onClick={() => setAddMemberDialog(true)} icon='pi pi-plus' className='p-button-info btn normal-case' />
                    </div>

                    {/* add new member dialog box  */}
                    <Dialog header="Add New Member" visible={addMemberDialog} onHide={() => clearAllState()} breakpoints={{ '960px': '75vw' }} style={{ width: '80vw' }} >
                        <div className='mx-auto max-w-7xl  pb-4'>

                            {/* <form action='http://localhost:5000/api/v1/freedomFighters/profilePhotoUpload' method='POST' encType='multipart/form-data'>
    <input name='photo' type="file" className="file-input file-input-primary input-bordered file-input-sm w-full bg-white text-gray-400" />
    <input type="submit" value='Upload' className='bg-primary p-1' />
</form> */}

                            {/* onSubmit={handleInsertFreedomFighter} */}
                            <form action='http://localhost:5000/api/v1/freedomFighters' method='POST' encType='multipart/form-data' className='space-y-4 bg-gray-100 bg-opacity-90 p-4 shadow-xl rounded-md'>
                                <p className='text-2xl font-bold text-primary mx-auto'>Please fill the information</p>
                                <div>
                                    <Dropdown name='type' options={memberTypes} value={memberType} onChange={(e) => setMemberType(e.value)} placeholder="*Select Member Type" className='text-black w-full' required />
                                </div>
                                <div className='flex w-full gap-x-12'>
                                    {/* <div className="relative w-1/2">
                                        <input name='fullName' type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                        <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/3 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">*Full Name</label>
                                    </div> */}

                                    <div className="p-float-label w-1/2">
                                        <InputText name='fullName' id='fullName' className='w-full' required />
                                        <label htmlFor="fullName" >*Full Name</label>
                                    </div>
                                    {/* <div className="relative w-1/2">
                                        <input name='email' type="email" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                        <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/3 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">*Email</label>
                                    </div> */}
                                    <div className='p-float-label w-1/2'>
                                        <InputText name='email' id='email' className='w-full' required />
                                        <label htmlFor="email">*Email</label>
                                    </div>
                                </div>
                                <div className='flex w-full gap-x-12 items-center'>
                                    {/* <div className="relative w-1/3">
                                        <input name='contact' type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                        <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/3 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">*Contact Number</label>
                                    </div> 
                                    
                                    <div className="relative w-1/3">
                                        <select onChange={e => setCountry(e.target.value)} name='country' className="p-3 rounded-md text-gray-400 w-full" required>
                                            <option value='' disabled selected>*Country</option>
                                            {
                                                countries.map(country => <option key={country} value={country}>{country}</option>)
                                            }

                                        </select>
                                    </div>
                                    <div className='relative w-1/3 flex items-center bg-white p-1 rounded-md text-gray-400'>
                                        <label className='mr-8 ml-2'>*Status: </label>
                                        <div className='flex gap-x-4'>
                                            <div className="form-control">
                                                <label className="label cursor-pointer space-x-2">
                                                    <span className="label-text text-gray-400">Alive</span>
                                                    <input name='status' value='Alive' type="radio" className="radio checked:bg-blue-500 border border-primary" checked />
                                                </label>
                                            </div>
                                            <div className="form-control">
                                                <label className="label cursor-pointer space-x-2">
                                                    <span className="label-text text-gray-400">Dead</span>
                                                    <input name='status' value='Dead' type="radio" className="radio checked:bg-red-500 border border-primary" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>*/}
                                    <div className='p-float-label w-1/3'>
                                        <InputText name='contact' id='contact' className='w-full' required />
                                        <label htmlFor="contact">*Contact</label>
                                    </div>
                                    <div className='w-1/3'>
                                        <Dropdown name='country' options={countries} value={country} onChange={(e) => setCountry(e.value)} placeholder="*Select a Country" className='text-black w-full' required />
                                    </div>
                                    {/* <div className='w-1/3 flex gap-x-2'>
                                        <div>
                                            <p>Status:</p>
                                        </div>
                                        <div className="field-radiobutton">
                                            <RadioButton inputId="status1" name="status" value="Alive" />
                                            <label htmlFor="status1">Alive</label>
                                        </div>
                                        <div className="field-radiobutton">
                                            <RadioButton inputId="status2" name="status" value="Dead" />
                                            <label htmlFor="status2">Dead</label>
                                        </div>
                                    </div> */}
                                    <div className='relative w-1/3 flex items-center bg-white p-1 rounded-md border-2'>
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
                                    {/* <div className="relative w-1/3">
                                        <select onChange={handleSelectForce} name='force' className="p-3 rounded-md text-gray-400 w-full" required>
                                            <option value='' disabled selected>*Select Force</option>
                                            <option value="Army">Army</option>
                                            <option value="Navy">Navy</option>
                                            <option value="Air Force">Air Force</option>

                                        </select>
                                    </div> 
                                    <div className="relative w-1/3">
                                        <select name='officialRank' className="p-3 rounded-md text-gray-400 w-full" required>
                                            <option value='' disabled selected>*Official Rank</option>
                                            {
                                                ranks?.map((rank, index) => <option key={index} value={rank}>{rank}</option>)
                                            }
                                        </select>
                                    </div>
                                    <div className="relative w-1/3">
                                        <select name='freedomFighterRank' className="p-3 rounded-md text-gray-400 w-full" required>
                                            <option value='' disabled selected>*Freedom Fighter Rank</option>
                                            <option value='Bir Shreshtho'>Bir Shreshtho</option>
                                            <option value='Bir Bikrom'>Bir Bikrom</option>
                                            <option value='Bir Uttam'>Bir Uttam</option>
                                            <option value='Bir Muktijoddha'>Bir Muktijoddha</option>
                                        </select>
                                    </div> */}

                                    <div className='w-1/3'>
                                        <Dropdown name='force' options={forces} value={force} onChange={(e) => setForce(e.value)} placeholder="*Select a Force" className='text-black w-full' required />
                                    </div>
                                    <div className='w-1/3'>
                                        <Dropdown name='officialRank' options={force && (force == 'Army' ? armyRank : (force == 'Navy' ? navyRank : airForceRank))} value={rank} onChange={(e) => setRank(e.value)} placeholder="*Official Rank" className='text-black w-full' required />
                                    </div>
                                    <div className='w-1/3'>
                                        <Dropdown name='freedomFighterRank' options={fighterRanks} value={fighterRank} onChange={(e) => setFighterRank(e.value)} placeholder="*Freedom Fighter Rank" className='text-black w-full' required />
                                    </div>
                                </div>
                                <div className='flex gap-x-12'>
                                    <div className="relative w-1/2">
                                        {/* <textarea name='address' type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                        <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/3 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">*Address</label> */}

                                        <div className="p-float-label w-full">
                                            <InputTextarea name='address' id='address' className=" w-full" required />
                                            <label htmlFor="address">*Address</label>
                                        </div>
                                    </div>
                                    <div className="relative w-1/2">
                                        {/* <textarea name='description' type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                        <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/3 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Description</label> */}

                                        <div className="p-float-label w-full">
                                            <InputTextarea name='description' id='description' className=" w-full" />
                                            <label htmlFor="description">Description</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='relative'>
                                    <label className='text-gray-400 ml-1'>Photo</label>
                                    <input name='photo' type="file" className="file-input file-input-primary input-bordered file-input-sm w-full bg-white text-gray-400" />
                                </div>

                                <div className='text-center pt-20'>
                                    <Button type='submit' label="Submit" icon="pi pi-check" className='p-button-info p-button-sm' />
                                </div>
                            </form>

                            {/* <form encType='multipart/form-data' className='relative -mt-36 mx-4'>
                                <label className='text-gray-400 ml-1'>Photo <span className='text-xs italic'>( Max. size 1MB )</span></label>
                                <div className='flex gap-x-8'>
                                    <input onChange={handleFileInput} name='photo' type="file" className="w-1/3 file-input file-input-primary input-bordered file-input-sm bg-white text-gray-400" />
                                    <input type="submit" value='Upload' className='bg-primary p-1 cursor-pointer rounded-md px-6' />
                                </div>
                            </form> */}
                            {/* <form action='http://localhost:5000/api/v1/freedomFighters/profilePhotoUpload' method='POST' encType='multipart/form-data'>
                                <input name='profilePhoto' type="file" className="file-input file-input-primary input-bordered file-input-sm w-full bg-white text-gray-400" />
                                <input type="submit" value='Submit' className='bg-primary p-1' />
                            </form> */}
                        </div>
                    </Dialog>


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
                                className='flex gap-x-4 justify-center items-center'
                                activeClassName='bg-primary/30 text-gray-900 px-4 py-2 rounded-full font-semibold btn btn-circle btn-ghost'
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
    // const result = JSON.parse(JSON.stringify(freedomFighters))
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