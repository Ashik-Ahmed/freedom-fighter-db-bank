import React from 'react';
import Details from '../[id]';

const successor = () => {
    // console.log(pageProps);
    return (
        <Details>
            <div className='w-full'>
                <div className='bg-primary text-xl text-center text-gray-100 p-2 font-semibold'>
                    <h3>Successor Information</h3>
                </div>
                <div className='p-2 space-y-4'>
                    <div className='border border-gray-100 p-2 shadow-md rounded-md'>
                        <p> <span className='font-bold'>Name:</span> Mr. Gius Uddin</p>
                        <p> <span className='font-bold'>Relation:</span> Son</p>
                        <p> <span className='font-bold'>Age:</span> 32</p>
                        <p> <span className='font-bold'>Occupation:</span> Banker</p>
                    </div>
                    <div className='border border-gray-100 p-2 shadow-md rounded-md'>
                        <p> <span className='font-bold'>Contact:</span> 01754892246</p>
                        <p> <span className='font-bold'>Email:</span> gius234@gmail.com</p>
                        <p> <span className='font-bold'>Address:</span> House#234, Road#6, Mirpur-10, Dhaka</p>
                    </div>
                </div>
            </div>
        </Details>
    );
};

export default successor;