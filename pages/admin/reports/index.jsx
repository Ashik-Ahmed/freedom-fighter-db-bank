import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import React, { useEffect, useState } from 'react';

const Reports = () => {

    const [members, setMembers] = useState([])
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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData, [name]: value
        });
    }

    // get members 
    const getAllMembers = () => {
        var url = `http://localhost:5000/api/v1/freedomFighters?page=${1})}`

        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data.freedomFighters);
                setMembers(data.freedomFighters);
            })
    }

    const handleGenerateReport = (e) => {
        e.preventDefault()
        console.log(formData.year.getFullYear());
        console.log(year);
    }

    return (
        <div>
            <p className='text-xl font-bold mb-2'>Generate Report</p>
            <div className='bg-white p-4 w-fit mx-auto rounded-md shadow-lg'>

                <form onSubmit={handleGenerateReport} className='flex gap-x-4'>
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
                </form>
            </div>


            {
                // generatedReport &&
                // <div className='bg-white p-2 max-w-7xl mx-auto rounded-md shadow-lg mt-2 min-h-[70vh]'>
                //     <DataTable value={finalSelected} header={header} dataKey="id" size='small' responsiveLayout="scroll" scrollHeight="70vh" loading={loading} stripedRows>
                //         {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column> */}
                //         {
                //             cols.map((col, index) => <Column key={index} field={col.field} header={col.header} />)
                //         }
                //         <Column header='Invitaion Status' body={invitationStatusBodyTemplate} exportable={false}></Column>
                //     </DataTable>
                // </div>
            }
        </div >
    );
};

export default Reports;