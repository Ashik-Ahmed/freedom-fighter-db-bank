import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import React, { useEffect, useState } from 'react';

const Reports = () => {

    const [events, setEvents] = useState([]);
    const [event, setEvent] = useState();
    const [year, setYear] = useState()
    const [formData, setFormData] = useState()

    // fetch available events from db 
    useEffect(() => {
        fetch('http://localhost:5000/api/v1/event')
            .then(res => res.json())
            .then(data => {
                setEvents(data.data)
            })
    }, [])

    const handleChange = (e) => {
        const { name, value } = event.target;
        setFormData({
            ...formData, [name]: JSON.stringify(value)
        });
    }

    return (
        <div>
            Generate Report

            <div className='flex gap-2'>
                <div>
                    <Dropdown name='program' options={events} optionLabel='name' value={event}
                        onChange={(e) => {
                            setEvent(e.value)
                            handleChange(e)
                        }}
                        placeholder="*Select Program" className=' w-full' required />
                </div>
                <div>
                    <Calendar name='year' id='year' value={year}
                        onChange={(e) => {
                            setYear(e.value)
                            handleChange(e)
                        }}
                        view="year" dateFormat="yy" placeholder='*Year' className='w-full' required />
                </div>

                <Button label='Submit' className='p-button-info p-button-sm  normal-case' type="submit" />
            </div>
        </div>
    );
};

export default Reports;