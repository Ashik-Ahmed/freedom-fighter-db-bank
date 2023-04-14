import React from 'react';

const index = () => {
    return (
        <div class="flex flex-column align-items-center justify-content-center">
            {/* <img src="/layout/images/logo-dark.svg" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" /> */}
            <div style={{ borderRadius: "56px", padding: "0.3rem", background: "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)" }}>
                <div class="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: "53px" }}>
                    <div class="text-center mb-5">
                        {/* <img src="/demo/images/login/avatar.png" alt="Image" height="50" class="mb-3" /> */}
                        <div class="text-900 text-3xl font-medium mb-3">Welcome, Isabel!</div>
                        <span class="text-600 font-medium">Sign in to continue</span>
                    </div>
                    <div>
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <input inputid="email1" type="text" placeholder="Email address" class="p-inputtext p-component w-full md:w-30rem mb-5" style={{ padding: "1rem" }} />
                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <div class="p-password p-component p-inputwrapper p-input-icon-right w-full mb-5">
                            <input inputid="password1" placeholder="Password" type="password" class="p-inputtext p-component p-password-input w-full p-3 md:w-30rem" value="" />
                            <i class="pi pi-eye"></i></div>
                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <div class="p-checkbox p-component mr-2" inputid="rememberme1">
                                    <div class="p-hidden-accessible">
                                        <input type="checkbox" />
                                    </div>
                                    <div class="p-checkbox-box">
                                        <span class="p-checkbox-icon p-c">
                                        </span>
                                    </div>
                                </div>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: "var(--primary-color)" }}>Forgot password?</a>
                        </div>
                        <button aria-label="Sign In" class="p-button p-component w-full p-3 text-xl">
                            <span class="p-button-label p-c">Sign In</span>
                            <span role="presentation" class="p-ink" style={{ height: "420px", width: "420px" }}></span>
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default index;