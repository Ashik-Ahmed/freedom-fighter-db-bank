import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import userPhoto from '../../../Images/photo.png'
import { HiEye, HiEyeOff } from 'react-icons/hi'

const MyProfile = () => {

    const router = useRouter();
    const cookie = new Cookies();

    const [edit, setEdit] = useState(false);
    const [user, setUser] = useState();
    const [updateForm, setUpdateForm] = useState(false);
    const [changePassword, setChangePassword] = useState(false);

    const [currentPassView, setCurrentPassView] = useState(false)
    const [newPassView, setNewPassView] = useState(false)
    const [confirmPassView, setConfirmPassView] = useState(false)

    const [currentPassError, setCurrentPassError] = useState('')
    const [newPassError, setNewPassError] = useState('')

    const { id } = router.query;


    //get the logged in user
    const getLoggedInUser = () => {
        fetch('http://localhost:5000/api/v1/users/getLoggedInUser', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${cookie.get('TOKEN')}`
            }
        })
            .then(res => res.json())
            .then(data => setUser(data.user))
    }

    useEffect(() => {
        getLoggedInUser();
    }, [])

    const handleProfileUpdate = (e) => {
        e.preventDefault();

        const name = e.target.name.value || user?.name;
        const birthday = e.target.birthday.value || user?.birthday;
        const mobile = e.target.phone.value || user?.mobile;
        const sex = e.target.sex.value || user?.sex;
        const bio = e.target.bio.value || user?.bio;
        const photo = e.target.photo.value || user?.photo;

        console.log(name, birthday, mobile, sex, bio, photo);

        const updatedProfile = {
            name,
            birthday,
            mobile,
            sex,
            bio,
            photo
        }

        fetch(`http://localhost:5000/api/v1/users/updateUserProfile/${user._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${cookie.get('TOKEN')}`
            },
            body: JSON.stringify(updatedProfile)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.data?.modifiedCount) {
                    // toast.success('Profile Successfully Updated');
                    e.target.reset();
                    setUpdateForm(false)
                    getLoggedInUser();
                }
                else {
                    console.log(data.error)
                }
            })
    }



    //password change
    const handlePasswordChange = (e) => {
        e.preventDefault();

        setCurrentPassError('');
        setNewPassError('');

        const currentPassword = e.target.currentPassword.value;
        const newPassword = e.target.newPassword.value;
        const confirmPassword = e.target.confirmPassword.value;

        const passwords = {
            currentPassword,
            newPassword,
            confirmPassword
        }

        fetch(`http://localhost:5000/api/v1/users/updateUserPassword/${user?.email}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${cookie.get('TOKEN')}`
            },
            body: JSON.stringify(passwords)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.data?.modifiedCount) {
                    // toast.success('Password Successfully Updated');
                    e.target.reset();
                    getLoggedInUser();
                    setChangePassword(false);
                    setCurrentPassView(false);
                    setNewPassView(false);
                    setConfirmPassView(false)
                }
                else {
                    console.log(data.message)

                    if (data.message == 'Current password is wrong') {
                        setCurrentPassError(data.message);
                    }
                    if (data.message == "New password didn't match") {
                        setNewPassError(data.message)
                    }
                }
            })
    }


    return (
        <div className='w-full md:flex text-gray-700'>
            <div class="indicator bg-white rounded mt-28 m-4 w-1/3 h-fit">
                <div>
                    <Image class="mask mask-hexagon indicator-item indicator-center bg-cyan-500 -mt-6 w-40" width='160' height='160' src={user?.photo || userPhoto} alt='' />
                </div>
                <div className='mt-16 pl-4 w-full'>
                    <div className='text-left py-8'>
                        <div className='flex items-baseline justify-between'>
                            <p className='font-bold w-1/3'>Name</p>
                            <span className='w-2/3'>: {user?.name}</span>
                        </div>
                        <div className='flex items-baseline justify-between mt-1'>
                            <p className='font-bold w-1/3'>Email</p>
                            <span className='w-2/3'>: {user?.email || 'N/A'}</span>
                        </div>
                        <div className='flex items-baseline justify-between mt-1'>
                            <p className='font-bold w-1/3'>Role</p>
                            <span className='w-2/3'>: {user?.role || 'N/A'}</span>
                        </div>
                        <div className='flex items-baseline justify-between mt-1'>
                            <p className='font-bold w-1/3'>Birthday</p>
                            <span className='w-2/3'>: {user?.birthday || 'N/A'}</span>
                        </div>
                        <div className='flex items-baseline justify-between mt-1'>
                            <p className='font-bold w-1/3'>Phone</p>
                            <span className='w-2/3'>: {user?.mobile || 'N/A'}</span>
                        </div>
                        <div className='flex items-baseline justify-between mt-1'>
                            <p className='font-bold w-1/3'>Sex</p>
                            <span className='w-2/3'>: {user?.sex || 'N/A'}</span>
                        </div>
                        <div className='flex items-baseline justify-between mt-1'>
                            <p className='font-bold w-1/3'>Bio</p>
                            <span className='w-2/3'>: {user?.bio || 'N/A'}</span>
                        </div>
                        <div>
                            <p onClick={(e) => setChangePassword(true)} className='link inline text-red-500'>Change Password</p>
                        </div>
                    </div>
                    <div className='text-center'>
                        <button onClick={() => setUpdateForm(true)} className='btn bg-primary hover:bg-secondary border-0 w-2/3 my-6'>Edit Profile</button>
                    </div>
                </div>
            </div>

            {
                changePassword &&

                // Add Member Modal
                <div class="bg-slate-600 bg-opacity-40 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                    <div class="bg-white px-2 py-2 rounded-md text-center">
                        <button onClick={() => { setChangePassword(false); setCurrentPassView(false); setNewPassView(false); setConfirmPassView(false) }} className='text-black font-bold float-right bg-gray-300 px-3 py-1 rounded-full relative'>X</button>
                        <div className='m-10'>
                            <h1 class="text-lg mb-6 font-bold text-secondary border-secondary border-b-2 pb-1 inline-block">Change Password</h1>
                            <form onSubmit={(e) => handlePasswordChange(e)} className='flex flex-col gap-4'>
                                <div>
                                    <div className='bg-gray-200 rounded-md'>
                                        <input type={currentPassView ? "text" : "password"} name='currentPassword' placeholder='Current Password' className='input  bg-gray-200 text-gray-700' required />
                                        <label onClick={() => setCurrentPassView(!currentPassView)} className='px-2 inline-block'>{currentPassView ? <HiEye /> : <HiEyeOff />}</label>
                                    </div>
                                    {
                                        currentPassError &&
                                        <div>
                                            <p className='text-xs text-red-500 text-left'>Current password is wrong</p>
                                        </div>
                                    }
                                </div>
                                <div className='bg-gray-200 rounded-md'>
                                    <input type={newPassView ? "text" : "password"} name='newPassword' placeholder='New Password' className='input  bg-gray-200 text-gray-700' required />
                                    <label onClick={() => setNewPassView(!newPassView)} className='px-2 inline-block'>{newPassView ? <HiEye /> : <HiEyeOff />}</label>
                                </div>
                                <div>
                                    <div className='bg-gray-200 rounded-md'>
                                        <input type={confirmPassView ? "text" : "password"} name='confirmPassword' placeholder='Confirm New Password' className='input  bg-gray-200 text-gray-700' required />
                                        {/* <button onClick={() => setConfirmPassView(!confirmPassView)} className='px-2'>{confirmPassView ? <HiEye /> : <HiEyeOff />}</button> */}
                                        <label onClick={() => setConfirmPassView(!confirmPassView)} className='px-2 inline-block'>{confirmPassView ? <HiEye /> : <HiEyeOff />}</label>
                                    </div>
                                    {
                                        newPassError &&
                                        <div>
                                            <p className='text-xs text-red-500 text-left'>New password didn't match</p>
                                        </div>
                                    }
                                </div>
                                <button type='submit' class="bg-primary hover:bg-secondary px-7 py-2 ml-2 rounded-md text-md text-white font-semibold cursor-pointer" >Submit</button>
                            </form>
                        </div>
                    </div>
                </div >
            }

            {
                updateForm &&
                <div className='w-2/3 bg-white rounded m-4 p-4 h-fit'>
                    <p className='text-lg font-bold text-secondary border-secondary border-b-2 inline p-1'>Update Your Profile</p>

                    <form onSubmit={handleProfileUpdate}>
                        <div className='mt-8'>
                            <div className='flex gap-4 justify-between'>
                                <div class="form-control w-full max-w-xs">
                                    <label class="label">
                                        <span class="label-text text-gray-700">Full Name</span>
                                    </label>
                                    <input name='name' type="text" placeholder={user?.name || "Type here"} class="input input-sm input-bordered w-full max-w-xs bg-gray-200 text-gray-700" />
                                </div>
                                <div class="form-control w-full max-w-xs">
                                    <label class="label">
                                        <span class="label-text text-gray-700">Date of Birth</span>
                                    </label>
                                    <input name='birthday' type="date" placeholder="Type here" class="input input-sm input-bordered w-full max-w-xs bg-gray-200 text-gray-700" />
                                </div>
                            </div>
                            <div className='flex gap-4 justify-between mt-4'>
                                <div class="form-control w-full max-w-xs">
                                    <label class="label">
                                        <span class="label-text text-gray-700">Contact</span>
                                    </label>
                                    <input name='phone' type="text" placeholder={user?.mobile || "Type here"} class="input input-sm input-bordered w-full max-w-xs bg-gray-200 text-gray-700" />
                                </div>
                                <div class="form-control w-full max-w-xs">
                                    <label class="label">
                                        <span class="label-text text-gray-700">Sex</span>
                                    </label>
                                    <select name='sex' class="select select-sm select-bordered w-full max-w-xs bg-gray-200 text-gray-700">
                                        <option disabled selected>{user?.sex || 'N/A'}</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Common</option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex gap-4 justify-between mt-4'>
                                <div class="form-control w-full">
                                    <label class="label">
                                        <span class="label-text text-gray-700">Bio</span>
                                    </label>
                                    <textarea name='bio' type="text" placeholder={user?.bio || "Type here"} class="textarea textarea-bordered w-full bg-gray-200 text-gray-700" />
                                </div>
                            </div>
                            <div class="form-control w-full">
                                <label class="label">
                                    <span class="label-text text-gray-700">Profile Picture Link</span>
                                </label>
                                <input name='photo' type="text" placeholder="Type here" class="input input-sm input-bordered w-full bg-gray-200 text-gray-700" />
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            <button type='submit' className='btn bg-primary hover:bg-secondary border-0 my-4'>Update</button>
                        </div>
                    </form>
                </div>
            }
        </div >
    );
};

export default MyProfile;