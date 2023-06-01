import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useEffect, useRef, useState } from 'react';
import { RadioButton } from "primereact/radiobutton";
import countryList from 'react-select-country-list'
import { Toast } from 'primereact/toast';
import { Controller, useForm } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { Checkbox } from 'primereact/checkbox';

const AddNew = () => {

    const [rank, setRank] = useState()
    const [fighterRank, setFighterRank] = useState('');
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState();
    const [category, setCategory] = useState()
    const [categories, setCategories] = useState([])
    const [force, setForce] = useState()
    const [image, setImage] = useState(null);
    const [ingredient, setIngredient] = useState('');
    const [profession, setProfession] = useState('')
    const [formData, setFormData] = useState({});
    const [vipStatus, setVipStatus] = useState(false)

    const toast = useRef(null);

    useEffect(() => {
        setCountries(countryList().getLabels())

        fetch('http://localhost:5000/api/v1/memberCategory')
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                const categoryNames = data.data.map(category => { return category.name })
                setCategories(categoryNames)
            })
    }, [])


    // const categories = [
    //     'Freedom Fighter',
    //     'General Invitees',
    //     'Retired Officers',
    //     'Retired Others'
    // ]

    const forces = [
        'Army',
        'Navy',
        'Air Force'
    ]

    const armyRank = [
        { label: 'General', value: { rank: 'General', point: 1 } },
        { label: 'Lieutenant general', value: { rank: 'Lieutenant general', point: 2 } },
        { label: 'Major general', value: { rank: 'Major general', point: 3 } },
        { label: 'Brigadier general', value: { rank: 'Brigadier general', point: 4 } },
        { label: 'Colonel', value: { rank: 'Colonel', point: 5 } },
        { label: 'Lieutenant colonel', value: { rank: 'Lieutenant colonel', point: 6 } },
        { label: 'Major', value: { rank: 'Major', point: 7 } },
        { label: 'Captain', value: { rank: 'Captain', point: 8 } },
        { label: 'Lieutenant', value: { rank: 'Lieutenant', point: 9 } },
        { label: 'Second lieutenant', value: { rank: 'Second lieutenant', point: 10 } },
        { label: 'Officer cadet', value: { rank: 'Officer cadet', point: 11 } },
        { label: 'Master warrant officer', value: { rank: 'Master warrant officer', point: 12 } },
        { label: 'Senior warrant officer', value: { rank: 'Senior warrant officer', point: 13 } },
        { label: 'Warrant officer', value: { rank: 'Warrant officer', point: 14 } },
        // { label: 'Regiment Sergeant Major', value: { rank: 'Regiment Sergeant Major', point: 15 } },
        // { label: 'Quarter Master Sergeant', value: { rank: 'Quarter Master Sergeant', point: 16 } },
        // { label: 'Sergeant Major', value: { rank: 'Sergeant Major', point: 17 } },
        // { label: 'Master Sergeant', value: { rank: 'Master Sergeant', point: 18 } },
        { label: 'Sergeant', value: { rank: 'Sergeant', point: 15 } },
        { label: 'Corporal', value: { rank: 'Corporal', point: 16 } },
        { label: 'Lance corporal', value: { rank: 'Lance corporal', point: 17 } },
        { label: 'Sainik', value: { rank: 'Sainik', point: 18 } }
    ]
    const navyRank = [
        { label: 'Admiral', value: { rank: 'Admiral', point: 1 } },
        { label: 'Vice admiral', value: { rank: 'Vice admiral', point: 2 } },
        { label: 'Rear admiral', value: { rank: 'Rear admiral', point: 3 } },
        { label: 'Commodore', value: { rank: 'Commodore', point: 4 } },
        { label: 'Captain', value: { rank: 'Captain', point: 5 } },
        { label: 'Commander', value: { rank: 'Commander', point: 6 } },
        { label: 'Lieutenant commander', value: { rank: 'Lieutenant commander', point: 7 } },
        { label: 'Lieutenant', value: { rank: 'Lieutenant', point: 8 } },
        { label: 'Sub-lieutenant', value: { rank: 'Sub-lieutenant', point: 9 } },
        { label: 'Acting sub-lieutenant', value: { rank: 'Acting sub-lieutenant', point: 10 } },
        { label: 'Midshipman', value: { rank: 'Midshipman', point: 11 } },
        { label: 'Officer cadet', value: { rank: 'Officer cadet', point: 12 } },
        { label: 'Master chief petty officer', value: { rank: 'Master chief petty officer', point: 13 } },
        { label: 'Senior chief petty officer', value: { rank: 'Senior chief petty officer', point: 14 } },
        { label: 'Chief petty officer', value: { rank: 'Chief petty officer', point: 15 } },
        { label: 'Leading seaman', value: { rank: 'Leading seaman', point: 16 } },
        { label: 'Able seaman', value: { rank: 'Able seaman', point: 17 } },
        { label: 'Ordinary seaman', value: { rank: 'Ordinary seaman', point: 18 } },
    ]
    const airForceRank = [
        { label: 'Air Chief Marshal', value: { rank: 'Air Chief Marshal', point: 1 } },
        { label: 'Air Marshal', value: { rank: 'Air Marshal', point: 2 } },
        { label: 'Air Vice-Marshal', value: { rank: 'Air Vice-Marshal', point: 3 } },
        { label: 'Air Commodore', value: { rank: 'Air Commodore', point: 4 } },
        { label: 'Group Captain', value: { rank: 'Group Captain', point: 5 } },
        { label: 'Wing Commander', value: { rank: 'Wing Commander', point: 6 } },
        { label: 'Squadron Leader', value: { rank: 'Squadron Leader', point: 7 } },
        { label: 'Flight Lieutenant', value: { rank: 'Flight Lieutenant', point: 8 } },
        { label: 'Flying Officer', value: { rank: 'Flying Officer', point: 9 } },
        { label: 'Pilot Officer', value: { rank: 'Pilot Officer', point: 10 } },
        { label: 'Officer cadet', value: { rank: 'Officer cadet', point: 11 } },
        { label: 'Master warrant officer', value: { rank: 'Master warrant officer', point: 12 } },
        { label: 'Senior warrant officer', value: { rank: 'Senior warrant officer', point: 13 } },
        { label: 'Warrant officer', value: { rank: 'Warrant officer', point: 14 } },
        { label: 'Sergeant', value: { rank: 'Sergeant', point: 15 } },
        { label: 'Corporal', value: { rank: 'Corporal', point: 16 } },
        { label: 'Leading aircraftman', value: { rank: 'Leading aircraftman', point: 17 } },
        { label: 'Aircraftman 1', value: { rank: 'Aircraftman 1', point: 18 } },
        { label: 'Aircraftman 2', value: { rank: 'Aircraftman 2', point: 19 } }
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
        console.log(typeof value);
        // setFormData({
        //     ...formData, [name]: value
        // });
        // convert object value to string as object is not accessible from formData
        if (typeof value == 'object') {
            console.log('object');
            // console.log(JSON.parse(JSON.stringify(value)));
            setFormData({
                ...formData, [name]: JSON.stringify(value)
            });
        }

        else {
            console.log('not object');
            setFormData({
                ...formData, [name]: value
            });
        }
    };

    const handlePhotoChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleInsertNewMember = async (event) => {
        event.preventDefault();

        const userDataWithPhoto = new FormData();
        const userPhoto = new FormData()
        Object.keys(formData).forEach((key) => {
            // userDataWithPhoto.append(key, formData[key]);
            // console.log(typeof formData[key]);
            if (typeof formData[key] == 'object') {
                userDataWithPhoto.append(key, JSON.parse(formData[key]));
                // console.log(userDataWithPhoto.get(key));
            }

            else {
                userDataWithPhoto.append(key, formData[key]);
            }
        });
        // console.log(fighterRank);
        userPhoto.append("image", image);
        // userDataWithPhoto.append("freedomFighterRank", JSON.stringify(fighterRank));
        if (category == 'Freedom Fighter') {
            userDataWithPhoto.append('freedomFighterRank', JSON.stringify(fighterRank))
        }
        if (profession == 'Armed Forces') {
            // console.log(force);
            userDataWithPhoto.append('force', force)
            userDataWithPhoto.append('officialRank', JSON.stringify(rank))
        }
        if (vipStatus) {
            userDataWithPhoto.append('vipStatus', vipStatus)
        }

        // console.log(userDataWithPhoto.getAll('freedomFighterRank'));
        console.log(userPhoto.get('image'));

        // try {
        //     await fetch('https://api.imgbb.com/1/upload?key=a0bd0c6e9b17f5f8fa7f35d20163bdf3', {
        //         method: 'POST',
        //         body: userPhoto
        //     })
        //         .then(res => res.json())
        //         .then(data => {
        //             if (data.data.url) {
        //                 userDataWithPhoto.append('photo', data.data.url)
        //             }
        //             else {
        //                 console.log('Failed Image Upload');
        //             }
        //         })
        // } catch (error) {
        //     console.error('Error occurred during image upload:', error);
        // }
        console.log(userDataWithPhoto);

        await fetch("http://localhost:5000/api/v1/freedomFighters", {
            method: "POST",
            headers: {
                'encType': 'multipart/form-data'
                // 'content-type': 'application/json'
            },
            // do not stringify. if you do, backend will not get the data
            body: userDataWithPhoto
        })
            .then(res => res.json())
            .then(data => {
                if (data.status == 'Success') {
                    console.log(data);
                    setFile(null)
                    setVipStatus(false)
                    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Member Added', life: 3000 });
                    event.target.reset()
                }
                else if (data.status == 'Failed') {
                    console.log(data.error);
                    toast.current.show({ severity: 'error', summary: 'Failed!', detail: data.error, life: 3000 });
                }
            })
        // console.log(userDataWithPhoto.get('freedomFighterRank'))
        // console.log(await response.json());
    };


    const { control, register, handleSubmit, watch, formState: { errors }, reset } = useForm();

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };



    return (
        <div>

            {/* add new member form  */}
            <div className='mx-auto max-w-7xl'>
                <Toast ref={toast} />
                <form onSubmit={handleInsertNewMember} className='w-full mx-auto space-y-4 bg-white p-4 shadow-xl rounded-md'>
                    {/* <form onSubmit={handleSubmit(addNew)} className='w-4/5 mx-auto space-y-4 bg-white p-4 shadow-xl rounded-md'> */}
                    <p className='text-lg font-semibold mx-auto'>Add New Member</p>
                    <div className='flex w-full gap-x-6 my-4'>
                        <div className="p-float-label w-1/3">
                            <InputText name='name' id='name'
                                onChange={handleChange}
                                className='w-full' required />
                            <label htmlFor="name" >*Full Name</label>
                        </div>
                        <div className='p-float-label w-1/3'>
                            <InputText name='email' id='email'
                                onChange={handleChange}
                                className='w-full' required />
                            <label htmlFor="email">*Email</label>
                        </div>
                        <div className='flex items-center gap-2 w-1/3'>
                            <Checkbox inputId='vipStatus' checked={vipStatus} onChange={e => setVipStatus(e.checked)}></Checkbox>
                            <label htmlFor="vipStatus" className='text-gray-500'>Add as VIP Member</label>
                        </div>
                    </div>

                    <div className='flex gap-x-6 my-4'>
                        <div className='w-1/3'>
                            <Dropdown name='category' options={categories} value={category}
                                onChange={(e) => {
                                    handleChange(e)
                                    setCategory(e.value)
                                }} placeholder="*Select Member Type" className='text-black w-full' required />
                        </div>

                        <div className='w-1/3'>
                            <Dropdown name='freedomFighterRank' options={fighterRanks} value={fighterRank}
                                onChange={(e) => {
                                    // handleChange(e)
                                    console.log(e.value);
                                    setFighterRank(e.value)
                                }} placeholder="*Freedom Fighter Rank" className='text-black w-full' disabled={category !== 'Freedom Fighter'} required={category == 'Freedom Fighter'} />
                        </div>

                        <div className='w-1/3'>
                            <InputText name='freedomFighterNumber'
                                onChange={(e) => {
                                    handleChange(e)
                                }} placeholder="*Freedom Fighter Number" className='text-black w-full' disabled={category !== 'Freedom Fighter'} required={category == 'Freedom Fighter'} />
                        </div>
                    </div>
                    <div className='flex w-full gap-x-6 my-4'>
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
                        {/* <div className='w-1/3 -mt-4'>
                            <label className='mr-8 ml-2 text-gray-600 text-xs'>*Status: </label>
                            <div className='flex items-center p-2 bg-white text-gray-700 rounded-md border hover:border-primary'>
                                <div className="flex flex-wrap gap-3">
                                    <div className="flex align-items-center">
                                        <RadioButton inputId="status1" name="status" value="Alive" onChange={(e) => {
                                            handleChange(e)
                                            setIngredient(e.value)
                                        }} checked={ingredient === 'Alive'} />
                                        <label htmlFor="status1" className="ml-2">Alive</label>
                                    </div>
                                    <div className="flex align-items-center">
                                        <RadioButton inputId="status2" name="status" value="Dead" onChange={(e) => {
                                            handleChange(e)
                                            setIngredient(e.value)
                                        }} checked={ingredient === 'Dead'} />
                                        <label htmlFor="status2" className="ml-2">Dead</label>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className='flex w-full gap-x-6 my-4'>
                        <div className='w-1/3'>
                            <Dropdown name='careerStatus' options={['Civilian', 'Armed Forces']} value={profession}
                                onChange={(e) => {
                                    handleChange(e)
                                    setProfession(e.value)
                                }} placeholder="*Select Profession" className='text-black w-full' required />
                        </div>
                        <div className='w-1/3'>
                            <Dropdown name='force' options={forces} value={force}
                                onChange={(e) => {
                                    setForce(e.value)
                                    // handleChange(e)
                                }} placeholder="*Select a Force" className='text-black w-full' disabled={profession !== 'Armed Forces'} required={profession == 'Armed Forces'} />
                        </div>
                        <div className='w-1/3'>
                            <Dropdown name='officialRank' options={force && (force == 'Army' ? armyRank : (force == 'Navy' ? navyRank : airForceRank))} value={rank} onChange={(e) => {
                                setRank(e.value)
                                // handleChange(e)
                            }} placeholder="*Official Rank" className='text-black w-full' disabled={profession !== 'Armed Forces'} required={profession == 'Armed Forces'} />
                        </div>
                    </div>
                    <div className='flex gap-x-6'>
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
                            onChange={handlePhotoChange}
                            className="file-input file-input-info input-bordered file-input-sm w-full bg-white text-gray-400" />
                    </div>
                    {/* <div className='flex gap-x-6'>
                        <div>
                            <Controller
                                name="category"
                                control={control}
                                rules={{ required: 'Category is required.' }}
                                render={({ field, fieldState }) => (
                                    <>
                                        <Dropdown
                                            value={field.value}
                                            placeholder="Member Category"
                                            name="category"
                                            options={categories}
                                            control={control}
                                            onChange={(e) => field.onChange(e.value)}
                                            className={classNames({ 'p-invalid': fieldState.error })}
                                        />
                                        <p>{getFormErrorMessage(field.name)}</p>
                                    </>
                                )}
                            />
                        </div>
                        <div>
                            <Controller
                                name="freedomFighterRank"
                                control={control}
                                rules={{ required: 'Freedom Fighter Rank is required.' }}
                                render={({ field, fieldState }) => (
                                    <>
                                        <Dropdown
                                            value={field.value}
                                            // disabled={field.value !== 'Freedom Fighter'}
                                            placeholder="Freedom Fighter Rank"
                                            name="freedomFighterRank"
                                            options={fighterRanks}
                                            control={control}
                                            onChange={(e) => field.onChange(e.value)}
                                            className={classNames({ 'p-invalid': fieldState.error })}
                                        />
                                        <p>{getFormErrorMessage(field.name)}</p>
                                    </>
                                )}
                            />
                        </div>

                    </div>
                    <div>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: 'Name is required.' }}
                            render={({ field, fieldState }) => (
                                <>
                                    <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                    <p>{getFormErrorMessage(field.name)}</p>
                                </>
                            )}
                        />
                    </div> */}
                    <div className='text-end'>
                        <Button type='submit' label="Submit" className='p-button-info p-button-sm' />
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
                        <div className='flex w-full gap-x-6'>
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