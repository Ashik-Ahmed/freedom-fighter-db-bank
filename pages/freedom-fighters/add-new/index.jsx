import React from 'react';

const index = () => {


    const handleInsertFreedomFighter = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const fullName = data.get('fullName');
        const email = data.get('email');
        const contact = data.get('contact');
        const status = data.get('status');
        const force = data.get('force');
        const officialRank = data.get('officialRank');
        const freedomFighterRank = data.get('freedomFighterRank');
        const address = data.get('address');
        const description = data.get('description');
        const fighter = {
            name: fullName,
            email,
            mobile: contact,
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

        fetch('http://localhost:5000/api/v1/freedomFighters', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(fighter),
        }).then(res => res.json()).then(data => {
            console.log(data)
        })
    }

    return (
        <div>
            <div>
                <div className='text-center my-4'>
                    <p className='text-3xl font-extrabold text-primary'>Add Freedom Fighter</p>
                </div>
                <div className='mx-auto max-w-7xl  pb-4'>
                    <form onSubmit={handleInsertFreedomFighter} className='space-y-4 bg-gray-100 bg-opacity-90 p-4 shadow-xl rounded-md'>
                        <p className='text-2xl font-bold text-primary mx-auto'>Please fill the information</p>
                        <div className='flex w-full gap-x-12'>
                            <div className="relative w-1/2">
                                <input name='fullName' type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">*Full Name</label>
                            </div>
                            <div className="relative w-1/2">
                                <input name='email' type="email" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">*Email</label>
                            </div>
                        </div>
                        <div className='flex w-full gap-x-12 items-center'>
                            <div className="relative w-1/2">
                                <input name='contact' type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">*Contact Number</label>
                            </div>
                            <div className='relative w-1/2 flex items-center bg-white p-1 rounded-md text-gray-400'>
                                <label className='mr-8 ml-2'>*Status: </label>
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
                        <div className='flex w-full gap-x-12'>
                            <div className="relative w-1/2">
                                <select name='force' className="p-3 rounded-md text-gray-400 w-full" required>
                                    <option disabled selected>*Select Force</option>
                                    <option>Army</option>
                                    <option>Navy</option>
                                    <option>Air Force</option>
                                </select>
                            </div>
                            <div className="relative w-1/2">
                                <select name='officialRank' className="p-3 rounded-md text-gray-400 w-full" required>
                                    <option disabled selected>*Armed Forces Rank</option>
                                    <option>Brigadier General</option>
                                    <option>Colonel</option>
                                    <option>Lt. Colonel</option>
                                    <option>Major</option>
                                    <option>Major General</option>
                                </select>
                            </div>
                        </div>
                        <div className="relative">
                            <select name='freedomFighterRank' className="p-3 rounded-md text-gray-400 w-full" required>
                                <option disabled selected>*Freedom Fighter Rank</option>
                                <option>Bir Shreshtho</option>
                                <option>Bir Bikrom</option>
                                <option>Bir Uttam</option>
                                <option>Bir Muktijoddha</option>
                            </select>
                        </div>
                        <div className="relative">
                            <textarea name='address' type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">*Address</label>
                        </div>
                        <div className="relative">
                            <textarea name='description' type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Description</label>
                        </div>
                        <div className='relative'>
                            <label className='text-gray-400 ml-1'>Photo</label>
                            <input name='photo' type="file" className="file-input file-input-primary input-bordered file-input-sm w-full bg-white text-gray-400" />
                        </div>
                        <div className='text-center'>
                            <input type="submit" value='Submit' className='btn btn-primary hover:bg-secondary border-0 w-1/4' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default index;