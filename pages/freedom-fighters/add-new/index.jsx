import React, { useEffect, useState } from 'react';
import countryList from 'react-select-country-list'

const AddNew = () => {

    const [ranks, setRanks] = useState([]);
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState();

    useEffect(() => {
        setCountries(countryList().getLabels())
    }, [])

    // countries?.map(country => console.log(country?.name?.common))

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

    const handleSelectForce = (e) => {
        const force = e.target.value;
        if (force == 'Army') {
            setRanks(armyRank);
        }
        if (force == 'Navy') {
            setRanks(navyRank)
        }
        if (force == 'Air Force') {
            setRanks(airForceRank);
        }
    }


    const handleFileInput = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('photo', e.target.files[0])
        // console.log(e.target.files[0])
        // const originalFileName = e.target.files[0].name;
        // const fileName = originalFileName.toLowerCase().replace(/\s+/g, '');
        // console.log(e.target.files[0]);

        fetch('http://localhost:5000/api/v1/freedomFighters/profilePhotoUpload', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })

    }

    const handleInsertFreedomFighter = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const fullName = data.get('fullName');
        const email = data.get('email');
        const contact = data.get('contact');
        // const photo = data.files[0];
        const photo = e.target.file;
        const status = data.get('status');
        const country = data.get('country');
        const force = data.get('force');
        const officialRank = data.get('officialRank');
        const freedomFighterRank = data.get('freedomFighterRank');
        const address = data.get('address');
        const description = data.get('description');

        // console.log(photo.toLowerCase().replace(/\s+/g, ''));

        // await fetch('http://localhost:5000/api/v1/freedomFighters/profilePhotoUpload', {
        //     method: 'POST',
        //     headers: {
        //         'encType': 'multipart/form-data'
        //     }
        // })
        //     .then(res => res.json())
        //     .then(data => { console.log(data) })

        const fighter = {
            name: fullName,
            email,
            photo,
            mobile: contact,
            country,
            status,
            force,
            officialRank: {
                rank: officialRank,
                point: 20
            },
            freedomFighterRank: {
                rank: freedomFighterRank,
                point: 15
            },
            address,
            description
        }
        // console.log(fighter)


        fetch('http://localhost:5000/api/v1/freedomFighters', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(fighter),
        })
        // .then(res => res.json()).then(data => {
        //     console.log(data)
        //     if (data.status == 'success') {
        //         e.target.reset();
        //     }
        // })
    }

    return (
        <div>
            <div>
                <div className='text-center my-4'>
                    <p className='text-3xl font-extrabold text-primary'>Add Member</p>
                </div>
                <div className='mx-auto max-w-7xl  pb-4'>

                    {/* <form action='http://localhost:5000/api/v1/freedomFighters/profilePhotoUpload' method='POST' encType='multipart/form-data'>
                        <input name='photo' type="file" className="file-input file-input-primary input-bordered file-input-sm w-full bg-white text-gray-400" />
                        <input type="submit" value='Upload' className='bg-primary p-1' />
                    </form> */}

                    {/* onSubmit={handleInsertFreedomFighter} */}
                    <form action='http://localhost:5000/api/v1/freedomFighters' method='POST' encType='multipart/form-data' className='space-y-4 bg-gray-100 bg-opacity-90 p-4 shadow-xl rounded-md'>
                        <p className='text-2xl font-bold text-primary mx-auto'>Please fill the information</p>
                        <div className='flex w-full gap-x-12'>
                            <div className="relative w-1/2">
                                <input name='fullName' type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/3 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">*Full Name</label>
                            </div>
                            <div className="relative w-1/2">
                                <input name='email' type="email" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/3 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">*Email</label>
                            </div>
                        </div>
                        <div className='flex w-full gap-x-12 items-center'>
                            <div className="relative w-1/3">
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
                            </div>
                        </div>
                        <div className='flex w-full gap-x-12'>
                            <div className="relative w-1/3">
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
                            </div>
                        </div>
                        <div className='flex gap-x-12'>
                            <div className="relative w-1/2">
                                <textarea name='address' type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/3 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">*Address</label>
                            </div>
                            <div className="relative w-1/2">
                                <textarea name='description' type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/3 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Description</label>
                            </div>
                        </div>
                        <div className='relative'>
                            <label className='text-gray-400 ml-1'>Photo</label>
                            <input name='photo' type="file" className="file-input file-input-primary input-bordered file-input-sm w-full bg-white text-gray-400" />
                        </div>

                        <div className='text-center pt-20'>
                            <input type="submit" value='Submit' className='btn btn-primary hover:bg-secondary border-0 w-1/4' />
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
            </div>
        </div >
    );
};

export default AddNew;