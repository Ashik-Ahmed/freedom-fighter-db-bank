import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';

const Login = ({ handleLogin }) => {

    const [checked, setChecked] = useState(false)

    return (

        <div className="bg-[#EFF3F8] min-h-[100vh] flex align-items-center justify-content-center">
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    {/* <img src="/assets/images/blocks/logos/hyper.svg" alt="hyper" height={50} className="mb-3" /> */}
                    <i className='pi pi-telegram mb-3 text-7xl bg-primary rounded-full shadow-lg'></i>
                    <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
                    <InputText id="email" name='email' type="text" placeholder="Email address" className="w-full mb-3" />

                    <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                    <InputText id="password" name='password' type="password" placeholder="Password" className="w-full mb-3" />

                    <div className="flex align-items-center justify-content-between mb-6">
                        <div className="flex align-items-center">
                            <Checkbox id="rememberme" onChange={e => setChecked(e.checked)} checked={checked} className="mr-2" />
                            <label htmlFor="rememberme" className='text-gray-700'>Remember me</label>
                        </div>
                        <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
                    </div>

                    <Button label="Sign In" icon="pi pi-user" className="w-full" />
                </div>
            </div>
        </div>

    );
};

export default Login;