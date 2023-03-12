import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useEffect, useState } from 'react';
import countryList from 'react-select-country-list'

const AddNew = () => {

    const [ranks, setRanks] = useState([]);
    const [rank, setRank] = useState()
    const [fighterRank, setFighterRank] = useState('');
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState();
    const [memberType, setMemberType] = useState()
    const [force, setForce] = useState()
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setCountries(countryList().getLabels())
    }, [])


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
        { label: 'Bir Shreshtho', value: { rank: 'Bir Shreshtho', point: 70 } },
        { label: 'Bir Uttam', value: { rank: 'Bir Uttam', point: 71 } },
        { label: 'Bir Bikrom', value: { rank: 'Bir Bikrom', point: 72 } },
        { label: 'Bir Protik', value: { rank: 'Bir Protik', point: 73 } },
        { label: 'Bir Muktijoddha', value: { rank: 'Bir Muktijoddha', point: 74 } }
    ]



    const handleChange = (event) => {
        const { name, value } = event.target;
        // setFormData({
        //   ...formData, [name]: value
        // });
        // convert object value to string as object is not accessible from formData
        if (typeof value == 'object') {
            console.log(JSON.parse(JSON.stringify(value)));
            setFormData({
                ...formData, [name]: JSON.stringify(value)
            });
        }

        else {
            setFormData({
                ...formData, [name]: value
            });
        }
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleInsertNewMember = async (event) => {
        event.preventDefault();

        const userDataWithPhoto = new FormData();
        Object.keys(formData).forEach((key) => {
            // console.log(typeof formData[key]);
            if (typeof formData[key] == 'object') {
                userDataWithPhoto.append(key, JSON.parse(JSON.stringify(formData[key])));
                console.log(userDataWithPhoto.get(key));
            }

            else {
                userDataWithPhoto.append(key, formData[key]);
            }
        });
        // console.log(fighterRank);
        userDataWithPhoto.append("file", file);
        // userDataWithPhoto.append("freedomFighterRank", JSON.stringify(fighterRank));

        console.log(userDataWithPhoto.getAll('force'));


        // fetch("http://localhost:5000/api/v1/freedomFighters", {
        //     method: "POST",
        //     headers: {
        //         'encType': 'multipart/form-data'
        //     },
        //     // do not stringify. if you do, backend will not get the data
        //     body: userDataWithPhoto
        // });
        // console.log(userDataWithPhoto.get('freedomFighterRank'))
        // console.log(await response.json());

    };

    // countries?.map(country => console.log(country?.name?.common))

    // const armyRank = [
    //     'General',
    //     'Lieutenant general',
    //     'Major general',
    //     'Brigadier general',
    //     'Colonel',
    //     'Lieutenant colonel',
    //     'Major',
    //     'Captain',
    //     'Lieutenant',
    //     'Second lieutenant',
    //     'Officer cadet',
    //     'Master warrant officer',
    //     'Senior warrant officer',
    //     'Warrant officer',
    //     'Regiment Sergeant Major',
    //     'Quarter Master Sergeant',
    //     'Sergeant Major',
    //     'Master Sergeant',
    //     'Sergeant',
    //     'Corporal',
    //     'Lance corporal',
    //     'Sainik'
    // ]
    // const navyRank = [
    //     'Admiral',
    //     'Vice admiral',
    //     'Rear admiral',
    //     'Commodore',
    //     'Captain',
    //     'Commander',
    //     'Lieutenant commander',
    //     'Lieutenant',
    //     'Sub-lieutenant',
    //     'Acting sub-lieutenant',
    //     'Midshipman',
    //     'Officer cadet',
    //     'Master chief petty officer',
    //     'Senior chief petty officer',
    //     'Chief petty officer',
    //     'Leading seaman',
    //     'Able seaman',
    //     'Ordinary seaman'
    // ]
    // const airForceRank = [
    //     'Air Chief Marshal',
    //     'Air Marshal',
    //     'Air Vice-Marshal',
    //     'Air Commodore',
    //     'Group Captain',
    //     'Wing Commander',
    //     'Squadron Leader',
    //     'Flight Lieutenant',
    //     'Flight Sergeant',
    //     'Flying Officer',
    //     'Pilot Officer',
    //     'Officer cadet',
    //     'Master warrant officer',
    //     'Senior warrant officer',
    //     'Warrant officer',
    //     'Sergeant',
    //     'Corporal',
    //     'Leading aircraftman',
    //     'Aircraftman 1',
    //     'Aircraftman 2'
    // ]

    // const handleSelectForce = (e) => {
    //     const force = e.target.value;
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

    return (
        <div>

            {/* add new member form  */}
            <div className='mx-auto max-w-7xl  pb-4'>


                {/* action='http://localhost:5000/api/v1/freedomFighters' method='POST' encType='multipart/form-data'*/}
                <form onSubmit={handleInsertNewMember} className='space-y-4 bg-gray-100 bg-opacity-90 p-4 shadow-xl rounded-md'>
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

                            {/* <select name='freedomFighterRank' onChange={(e) => console.log(e.value)} className="p-2.5 border-1 hover:border-primary rounded-md bg-white w-full" required>
                      <option value='' disabled selected>*Freedom Fighter Rank</option>
                      {
                        fighterRanks.map((fighter, index) => <option key={index} value={JSON.stringify(fighter)} className='p-2 hover:bg-gray-500'>{fighter.rank}</option>)
                      }
                    </select> */}
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
                </form>
            </div>


            {/* <div>
                <div className='text-center my-4'>
                    <p className='text-3xl font-extrabold text-primary'>Add Member</p>
                </div>
                <div className='mx-auto max-w-7xl  pb-4'>
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
                </div>
            </div> */}
        </div >
    );
};

export default AddNew;