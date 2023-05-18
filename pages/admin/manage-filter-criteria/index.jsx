import React from 'react';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from 'primereact/button';
import FilterCriteria from '../../../components/Admin/FilterCriteria/FilterCriteria';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';

const ManageFilterCriteria = () => {

    const toast = useRef()

    const [categories, setCategories] = useState([])

    const getAllCategories = () => {
        // setLoading(true)
        fetch('http://localhost:5000/api/v1/memberCategory')
            .then(res => res.json())
            .then(data => {
                console.log(data.data);
                setCategories(data.data)
                // setLoading(false)
            })
    }

    useEffect(() => {
        getAllCategories()
    }, [])



    return (
        <div>
            <Toast ref={toast} />

            <div className='mb-2'>
                <p className='text-3xl font-bold text-gray-800'>Member-wise Priority Criteria</p>
            </div>

            <div className='flex flex-col gap-2'>
                {
                    categories.map((category, index) => <FilterCriteria key={index} category={category} toast={toast} />)
                }

            </div>
        </div>
    );
};

export default ManageFilterCriteria;