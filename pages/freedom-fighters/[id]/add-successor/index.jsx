import { useRouter } from 'next/router';
import { Toast } from 'primereact/toast';
import React, { useRef } from 'react';
import FreedomFighter from '..';

const AddSuccessor = () => {

    const toast = useRef(null);
    const router = useRouter();

    const { id } = router.query;

    const addSuccessor = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        const fullName = data.get('fullName')
        const email = data.get('email')
        const contact = data.get('contact')
        const birthday = data.get('birthday')
        const relation = data.get('relation')
        const occupation = data.get('occupation')
        const address = data.get('address')

        const successorData = {
            freedomFighterId: id,
            name: fullName,
            email,
            mobile: contact,
            address,
            birthday,
            occupation,
            relation
        }

        console.log(successorData)


        fetch('http://localhost:5000/api/v1/successor', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(successorData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.status == 'Success') {
                    e.target.reset()
                    router.push(`/freedom-fighters/${id}/successor`)
                    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Successor Added', life: 3000 })
                }
                else {
                    toast.current.show({ severity: 'error', summary: 'Failed!', detail: 'Please try again.', life: 3000 });
                }
            })


    }

    return (
        <FreedomFighter>
            <Toast ref={toast} />
            <div>
                <div className='bg-primary text-xl text-center text-gray-100 font-semibold'>
                    <p>Please Add a Successsor</p>
                </div>

                <div>
                    <form onSubmit={addSuccessor} className='space-y-4 bg-gray-100 bg-opacity-90 p-4 shadow-xl rounded-md'>
                        <p className='text-2xl font-bold text-primary mx-auto'>Please fill the information</p>
                        <div className='flex w-full gap-x-12'>
                            <div className="relative w-1/2">
                                <input name='fullName' type="text" id="fullName" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="fullName" className="absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-4  top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/3 peer-focus:top-2  peer-focus:-translate-y-4 left-1">*Full Name</label>
                            </div>
                            <div className="relative w-1/2">
                                <input name='email' type="email" id="email" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="email" className="absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-4  top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/3 peer-focus:top-2  peer-focus:-translate-y-4 left-1">*Email</label>
                            </div>
                        </div>
                        <div className='flex w-full gap-x-12 items-center'>
                            <div className="relative w-1/2">
                                <input name='contact' type="text" id="contact" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="contact" className="absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-4  top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/3 peer-focus:top-2  peer-focus:-translate-y-4 left-1">*Contact Number</label>
                            </div>
                            <div className="relative w-1/2">
                                <input name='relation' type="text" id="relation" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="relation" className="absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-4  top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/3 peer-focus:top-2  peer-focus:-translate-y-4 left-1">*Relation</label>
                            </div>
                        </div>
                        <div className='flex w-full gap-x-12 items-center'>
                            <div className="relative w-1/2">
                                <input name='occupation' type="text" id="occupation" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label for="occupation" className="absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-4  top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/3 peer-focus:top-2  peer-focus:-translate-y-4 left-1">Occupation</label>
                            </div>
                            <div className="relative w-1/2">
                                <input name='birthday' type="date" id="birthday" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label for="birthday" className="absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-4  top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/3 peer-focus:top-2  peer-focus:-translate-y-4 left-1">Date of Birth</label>
                            </div>
                        </div>
                        <div className='flex gap-x-12'>
                            <div className="relative w-1/2">
                                <textarea name='address' type="text" id="address" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="address" className="absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-4  top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/3 peer-focus:top-2  peer-focus:-translate-y-4 left-1">*Address</label>
                            </div>
                            <div className="relative w-1/2">
                                <input name='description' type="file" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-white" placeholder=" " />
                                <label for="fullName" className="absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-4  top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/3 peer-focus:top-2  peer-focus:-translate-y-4 left-1">Photo</label>
                            </div>
                        </div>
                        {/* <div className='relative'>
                            <label className='text-gray-400 ml-1'>Photo</label>
                            <input name='profilePhoto' type="file" className="file-input file-input-primary input-bordered file-input-sm w-full bg-white text-gray-400" />
                        </div> */}

                        <div className='text-center pt-4'>
                            <input type="submit" value='Submit' className='btn btn-primary hover:bg-secondary border-0 w-1/4' />
                        </div>
                    </form>
                </div>
            </div>
        </FreedomFighter>
    );
};

export default AddSuccessor;