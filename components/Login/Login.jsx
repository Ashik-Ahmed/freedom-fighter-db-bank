import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';

const Login = ({ handleLogin, passError }) => {

    const [checked, setChecked] = useState(false)
    const [passwordVisibility, setPasswordVisibility] = useState(false)

    return (

        // <div className="bg-[#EFF3F8] min-h-[100vh] flex align-items-center justify-content-center">
        //     <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        //         <div className="text-center mb-5">
        //             {/* <img src="/assets/images/blocks/logos/hyper.svg" alt="hyper" height={50} className="mb-3" /> */}
        //             <i className='pi pi-telegram mb-3 text-7xl bg-primary rounded-full shadow-lg'></i>
        //             <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
        //         </div>

        //         <form onSubmit={handleLogin} >
        //             <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
        //             <InputText id="email" name='email' type="email" placeholder="Email address" className="w-full mb-3" />

        //             <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
        //             <div className='w-full mb-3 '>
        //                 <InputText id="password" name='password' type="password" placeholder="Password" className={`w-full ${passError}&& 'p-invalid'`} />
        //                 {
        //                     passError && <p className='text-red-500 text-xs italic'>{passError}</p>
        //                 }
        //             </div>
        //             <div className="flex align-items-center justify-content-between mb-6">
        //                 <div className="flex align-items-center">
        //                     <Checkbox id="rememberme" onChange={e => setChecked(e.checked)} checked={checked} className="mr-2" />
        //                     <label htmlFor="rememberme" className='text-gray-700'>Remember me</label>
        //                 </div>
        //                 <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
        //             </div>

        //             <Button type='submit' label="Sign In" icon="pi pi-user" className="w-full" />
        //         </form>
        //     </div>
        // </div>

        <div className="flex flex-column align-items-center justify-content-center">
            {/* <img src="/layout/images/logo-dark.svg" alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" /> */}
            <div style={{ borderRadius: "56px", padding: "0.3rem", background: "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)" }}>
                <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: "53px" }}>
                    <div className="text-center mb-5">
                        {/* <img src="/demo/images/login/avatar.png" alt="Image" height="50" className="mb-3" /> */}
                        <div className="text-900 text-3xl font-medium mb-3">Welcome, Isabel!</div>
                        <span className="text-600 font-medium">Sign in to continue</span>
                    </div>
                    <div>
                        <label for="email1" className="block text-900 font-medium mb-2">Email</label>
                        <InputText inputid="email1" type="text" placeholder="Email address" className='w-full mb-3' />
                        <label for="password1" className="block text-900 font-medium mb-2">Password</label>
                        <div className="p-password p-component p-inputwrapper p-input-icon-right w-full mb-5">
                            <InputText id="password" name='password' type={passwordVisibility ? 'text' : 'password'} placeholder="Password" className={`w-full ${passError}&& 'p-invalid'`} />
                            {
                                passError && <p className='text-red-500 text-xs italic'>{passError}</p>
                            }
                            <i onClick={() => setPasswordVisibility(!passwordVisibility)} className={`pi ${passwordVisibility ? 'pi-eye' : 'pi-eye-slash'}`}></i></div>
                        <div className="flex align-items-center justify-content-between mb-5 gap-5">
                            <div className="flex align-items-center">
                                <div className="p-checkbox p-component mr-2" inputid="rememberme1">
                                    <div className="p-hidden-accessible">
                                        <input type="checkbox" />
                                    </div>
                                    <div className="p-checkbox-box">
                                        <span className="p-checkbox-icon p-c">
                                        </span>
                                    </div>
                                </div>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: "var(--primary-color)" }}>Forgot password?</a>
                        </div>
                        <Button type='submit' label="Sign In" icon="pi pi-user" className="w-full" />
                    </div>
                </div>
            </div>
        </div >

    );
};

export default Login;