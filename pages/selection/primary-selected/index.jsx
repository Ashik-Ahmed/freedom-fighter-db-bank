import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import React from 'react';
import { useState } from 'react';

const PrimarySelected = () => {

    const [event, setEvent] = useState('')
    const [year, setYear] = useState('')
    const [loading, setLoading] = useState(false)
    const [primarySelected, setPrimarySelected] = useState([])

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
        setLoading(true)
        const url = `http://localhost:5000/api/v1/selection/primary-selection?event=${event}&year=${year}`

        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPrimarySelected(data.data)
                setLoading(false)
            })
    }

    const header = (
        <div className='flex justify-between items-center'>
            <div className='flex  items-center gap-x-2 text-gray-800 text-xl font-bold'>
                <p>Primary Selected for <span className='text-secondary'>`{event}`</span></p>
            </div>
        </div>
    );

    const cols = [
        { field: 'name', header: 'Name' },
        { field: 'category', header: 'Member Type' },
        { field: `mobile`, header: 'Contact no.' },
        { field: 'email', header: 'Email' },
        { field: 'address', header: 'Address' }
    ];

    return (
        <div>
            <div className='bg-white p-4 mt-2 w-fit mx-auto rounded-md shadow-lg'>
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

            <div className='bg-white p-2 max-w-7xl mx-auto rounded-md shadow-lg mt-4 min-h-[60vh]'>
                <DataTable value={primarySelected} header={header} dataKey="id" size='small' responsiveLayout="scroll" scrollHeight="65vh" loading={loading} stripedRows>
                    {
                        cols.map((col, index) => <Column key={index} field={col.field} header={col.header} />)
                    }
                </DataTable>
            </div>
        </div>
    );
};

export default PrimarySelected;