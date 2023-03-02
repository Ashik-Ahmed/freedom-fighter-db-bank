import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import React from 'react';
import { useState } from 'react';

const PrimarySelected = () => {

    const [event, setEvent] = useState('')
    const [year, setYear] = useState('')

    const programs = [
        '21 February',
        '26 March',
        '14 April',
        '16 December'
    ]

    const years = [
        '2010',
        '2011',
        '2012',
        '2013',
        '2014',
        '2015',
        '2016',
        '2017',
        '2018',
        '2019',
        '2020',
        '2021',
        '2022',
        '2023',
    ]

    const getPrimarySelectedMembers = (e) => {
        e.preventDefault();

        const url = `http://localhost:5000/api/v1/selection/primary-selection?event=${event}&year=${year}`

        fetch(url,).then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }

    return (
        <div>
            <div className='bg-white p-4 w-fit mx-auto rounded-xl shadow-lg'>
                <form onSubmit={getPrimarySelectedMembers} className='flex gap-x-4'>
                    <div>
                        <Dropdown name='program' options={programs} value={event}
                            onChange={(e) => {
                                setEvent(e.value)
                            }} placeholder="*Select Program" className='text-black w-full' required />
                    </div>
                    <div>
                        <Dropdown name='year' options={years} value={year}
                            onChange={(e) => {
                                setYear(e.value)
                            }} placeholder="*Year" className='text-black w-full' required />
                    </div>
                    <Button type='submit' label='Submit' className='p-button-info p-button-sm normal-case'></Button>
                </form>
            </div>
        </div>
    );
};

export default PrimarySelected;