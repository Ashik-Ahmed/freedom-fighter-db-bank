import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useMemo } from 'react';
import PrimarySelectedTable from '../../../components/PrimarySelected/PrimarySelectedTable';
import Cookies from 'universal-cookie';

const PrimarySelected = () => {

    const cookies = new Cookies()

    const [events, setEvents] = useState([])
    const [event, setEvent] = useState('')
    const [year, setYear] = useState(null)
    const [loading, setLoading] = useState(false)
    const [primarySelected, setPrimarySelected] = useState()


    // fetch available events from db 
    useEffect(() => {
        fetch('http://localhost:5000/api/v1/event', {
            method: "GET",
            headers: {
                authorization: `Bearer ${cookies.get("TOKEN")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setEvents(data.data)
            })
    }, [])

    const getPrimarySelectedMembers = (e) => {
        // e.preventDefault()
        // console.log(programName.current.props.value);
        setLoading(true)
        const url = `http://localhost:5000/api/v1/selection/primary-selection?event=${event.name}&year=${year.getFullYear()}`

        fetch(url, {
            method: "GET",
            headers: {
                authorization: `Bearer ${cookies.get("TOKEN")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setPrimarySelected(data.data)
                console.log(data.data);
                setLoading(false)
            })
    }

    const data = useMemo(() => {
        return [primarySelected, event, year]
    }, [primarySelected, event, year])

    return (
        <div>
            <div className='bg-white p-2 w-fit mx-auto rounded-md shadow-lg '>
                <div className='flex gap-x-4'>
                    <div>
                        <Dropdown name='event' options={events} optionLabel='name' value={event}
                            onChange={(e) => {
                                setEvent(e.value)
                                // programName.current == e.value.name;
                                console.log(e.value);
                            }} placeholder="*Select Event" required style={{ 'height': '37px' }} />
                    </div>
                    <div>
                        <Calendar value={year} onChange={(e) => {
                            setYear(e.value)
                        }} view="year" dateFormat="yy" placeholder='Year' required className='p-inputtext-sm' />
                    </div>
                    <Button onClick={getPrimarySelectedMembers} label='Submit' className='p-button-sm'></Button>
                </div>
            </div>

            {
                primarySelected &&
                <PrimarySelectedTable data={data} getPrimarySelectedMembers={getPrimarySelectedMembers} loading={loading} />
            }

        </div >
    );
};

export default PrimarySelected;