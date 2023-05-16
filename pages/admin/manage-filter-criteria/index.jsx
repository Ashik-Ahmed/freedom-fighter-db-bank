import React from 'react';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from 'primereact/button';
import FilterCriteria from '../../../components/Admin/FilterCriteria/FilterCriteria';

const ManageFilterCriteria = () => {

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
        <div className='flex flex-col gap-2'>
            {
                categories.map((category, index) => <FilterCriteria key={index} category={category} />)
            }

        </div>
    );
};

export default ManageFilterCriteria;