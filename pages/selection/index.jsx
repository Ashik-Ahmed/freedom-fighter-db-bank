import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { render } from 'react-dom';
import { Calendar } from 'primereact/calendar';


const Selection = () => {

    const [selectedFreedomFighters, setSelectedFreedomFighters] = useState()
    const [memberType, setMemberType] = useState('')
    const [firstCriteria, setFirstCriteria] = useState('')
    const [secondCriteria, setSecondCriteria] = useState('')
    const [thirdCriteria, setThirdCriteria] = useState('')
    const [checked, setChecked] = useState(false);
    const [reportModal, setReportModal] = useState(null);
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false)
    const [events, setEvents] = useState([])
    const [event, setEvent] = useState('')
    const [year, setYear] = useState('')
    const [confirmSelectionDialogue, setConfirmSelectionDialogue] = useState(false)

    // fetch available events from db 
    useEffect(() => {
        fetch('http://localhost:5000/api/v1/event')
            .then(res => res.json())
            .then(data => {
                setEvents(data.data)
            })
    }, [])

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

    const memberTypes = [
        'Freedom Fighter',
        'General Invitees',
        'Retired',
        'Retired ORs/Others'
    ]

    const handleSelection = (e) => {

        setLoading(true)
        e.preventDefault();

        // console.log(memberType, firstCriteria, secondCriteria, checked, event.name);

        const total = e.target.total.value
        // const alive = e.target.alive.value
        // const dead = e.target.dead.value

        //     fetch(`http://localhost:5000/api/v1/selection?total=${total}&alive=${alive}&dead=${dead}&firstCriteria=${firstCriteria}&secondCriteria=${secondCriteria}`)
        //         .then(res => res.json())
        //         .then(data => setSelectedFreedomFighters(data.data))
        // }


        const url = `http://localhost:5000/api/v1/selection?total=${total}&memberType=${memberType}&firstCriteria=${firstCriteria}&secondCriteria=${secondCriteria || 'name'}&thirdCriteria=${thirdCriteria || 'name'}&excludePreviousYear=${checked}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setSelectedFreedomFighters(data.data)
                console.log(data.data);
                setLoading(false)
            })
        console.log(url);
    }

    // console.log(selectedFreedomFighters);

    const generateReport = () => {
        setReportModal(true)
        console.log('generating report');
        const armyCount = selectedFreedomFighters.filter(fighter => fighter.force == 'Army').length;
        const navyCount = selectedFreedomFighters.filter(member => member.force == 'Navy').length;
        const airforceCount = selectedFreedomFighters.filter(fighter => fighter.force == 'Air Force').length;

        const counts = { total: selectedFreedomFighters.length, armyCount, navyCount, airforceCount }
        setReport(counts)
        console.log(armyCount, navyCount, airforceCount)


    }

    const invitedYear = (rowData) => {
        return <span>{rowData.length} times</span>
    }

    const cols = [
        { field: 'name', header: 'Name' },
        { field: 'category', header: 'Member Type' },
        { field: 'forceRank', header: 'Official Rank' },
        { field: `fighterRank`, header: 'Fighter Rank' },
        { field: 'fighterPoint', header: 'Fighter Value' },
        { field: 'invited_count', header: 'Invite Count', body: { invitedYear } }
    ];

    const exportColumns = cols.map(col => ({ title: col.header, dataKey: col.field }));

    const exportPdf = () => {
        import('jspdf').then(jsPDF => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 2);
                doc.autoTable(exportColumns, selectedFreedomFighters, {
                    startY: doc.autoTable() + 70,

                    didDrawPage: function (data) {

                        // Header
                        doc.setFontSize(20);
                        doc.setTextColor(10);
                        doc.text("Proposed Member List", 100, 22);

                        // Footer
                        var str = "Page " + doc.internal.getNumberOfPages();

                        doc.setFontSize(10);

                        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
                        var pageSize = doc.internal.pageSize;
                        var pageHeight = pageSize.height
                            ? pageSize.height
                            : pageSize.getHeight();
                        doc.text(str, data.settings.margin.left, pageHeight - 10);
                    }
                });
                doc.save('shortlist.pdf');
            })
        })
    }

    const exportExcel = () => {
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(selectedFreedomFighters);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['Shortlisted Members'] };
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            saveAsExcelFile(excelBuffer, 'Shortlist');
        });
    }
    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then(module => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                // module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
                module.default.saveAs(data, fileName + EXCEL_EXTENSION);
            }
        });
    }


    // set temporary selection flag to members 
    const handleTemporarySelect = () => {

        const memberIds = selectedFreedomFighters.map(member => member._id);
        const url = `http://localhost:5000/api/v1/selection/primary-selection`

        fetch(url, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ memberIds, event: event.name, year: year.getFullYear() })
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                setSelectedFreedomFighters([])
                setConfirmSelectionDialogue(false)
            })
    }

    const header = (
        <div className='flex justify-between items-center'>
            <div className='flex  items-center gap-x-2 text-gray-800 text-xl font-bold'>
                <p>Selected Members</p>
                <i onClick={() => generateReport()} className='pi pi-info-circle text-xl text-primary cursor-pointer'></i>
            </div>
            <div className="flex align-items-center export-buttons gap-x-1">
                {/* <Button type="button" icon="pi pi-file" onClick={() => exportCSV(false)} className="mr-2" data-pr-tooltip="CSV" /> */}
                <Button type="button" icon="pi pi-file-excel" onClick={exportExcel} className="p-button-success p-2 mr-2" data-pr-tooltip="XLS" />
                <Button type="button" icon="pi pi-file-pdf" onClick={exportPdf} className="p-button-warning p-2 mr-2" data-pr-tooltip="PDF" />
            </div>
        </div>
    );

    return (
        <div className='min-h-[90vh]'>
            {/* <div className='text-center mt-8'>
                <h2 className='text-4xl text-secondary font-bold'>Primary Selection</h2>
            </div> */}

            {/* shortlisted member report  */}
            < Dialog header="Shortlist Report" visible={reportModal} onHide={() => { setReportModal(false) }} breakpoints={{ '960px': '75vw' }} style={{ width: '25vw' }} >

                <div className='text-center'>
                    <i className='pi pi-book text-primary' style={{ 'fontSize': '2em' }}></i>
                    <div className='my-4 text-left'>
                        <div className='flex justify-between items-center'>
                            <p className='text-lg text-slate-500'>Army: </p>
                            <p>{report?.armyCount} <span className='text-xs italic'>({Math.ceil((report?.armyCount / report?.total) * 100)}%)</span></p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-lg text-slate-500'>Navy: </p>
                            <p>{report?.navyCount} <span className='text-xs italic'>({Math.ceil((report?.navyCount / report?.total) * 100)}%)</span></p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-lg text-slate-500'>Air Force: </p>
                            <p>{report?.airforceCount} <span className='text-xs italic'>({Math.ceil((report?.airforceCount / report?.total) * 100)}%)</span></p>
                        </div>
                        <hr />
                        <div className='flex justify-between items-center'>
                            <p className='text-lg text-slate-500'>Total: </p>
                            <p>{report?.total}</p>
                        </div>
                    </div>
                </div>

                <div className='flex justify-end mt-12 gap-x-2'>
                    <Button label="Close" icon="pi pi-times" onClick={() => { setReportModal(false) }} className="p-button-danger p-button-sm btn normal-case" />
                </div>
            </Dialog >

            <div>
                <form onSubmit={handleSelection} className='px-2 bg-white mt-2 w-full max-w-9xl rounded-md shadow-lg'>
                    <div className='flex flex-col gap-2 mx-auto justify-center my-2'>
                        <div>
                            <p className='text-gray-700 font-bold'>Selection Criteria</p>
                        </div>
                        <div className='flex gap-2 mb-1'>
                            <div className="relative">
                                <InputText keyfilter="int" placeholder="*Total" name='total' className='w-full' required />
                                {/* <InputText keyfilter="int" placeholder="Integers" /> */}
                            </div>
                            <div>
                                <Dropdown name='memberType' options={memberTypes} value={memberType}
                                    onChange={(e) => {
                                        setMemberType(e.value)
                                    }} placeholder="*Select Member Type" className=' w-full' required />
                            </div>
                            <div>
                                <Dropdown name='program' options={events} optionLabel='name' value={event}
                                    onChange={(e) => {
                                        setEvent(e.value)
                                        console.log(e.value);
                                    }} placeholder="*Select Program" className=' w-full' required />
                            </div>
                            <div>
                                <Calendar value={year} onChange={(e) => {
                                    setYear(e.value)
                                }} view="year" dateFormat="yy" placeholder='*Year' className='w-full' required />
                            </div>
                            {/* <div>
                                <Dropdown name='year' options={years} value={year}
                                    onChange={(e) => {
                                        setYear(e.value)
                                    }} placeholder="*Year" className=' w-full' />
                            </div> */}
                            {/* </div>

                        <hr className='mb-1' />

                        <div className='flex gap-2'> */}
                            <Dropdown name='firstCriteria' value={firstCriteria}
                                options={
                                    [
                                        { label: 'Name', value: 'name' },
                                        { label: 'Invited Count', value: 'invited_count' },
                                        { label: 'Freedom Fighter Rank', value: 'freedomFighterRank.point' },
                                        { label: 'Official Rank', value: 'officialRank.point' }
                                    ]
                                }
                                onChange={(e) => setFirstCriteria(e.value)} placeholder="*First Criteria" className='w-fit' />

                            {
                                firstCriteria &&
                                <Dropdown name='secondCriteria' value={secondCriteria}
                                    options={
                                        [
                                            { label: 'Name', value: 'name' },
                                            { label: 'Invited Count', value: 'invited_count' },
                                            { label: 'Freedom Fighter Rank', value: 'freedomFighterRank.point' },
                                            { label: 'Official Rank', value: 'officialRank.point' }
                                        ]
                                    }
                                    onChange={(e) => setSecondCriteria(e.value)} placeholder="Second Criteria" className='w-fit' />
                            }
                            {
                                secondCriteria &&

                                <Dropdown name='thirdCriteria' value={thirdCriteria}
                                    options={
                                        [
                                            { label: 'Name', value: 'name' },
                                            { label: 'Invited Count', value: 'invited_count' },
                                            { label: 'Freedom Fighter Rank', value: 'freedomFighterRank.point' },
                                            { label: 'Official Rank', value: 'officialRank.point' }
                                        ]
                                    }
                                    onChange={(e) => setThirdCriteria(e.value)} placeholder="Third Criteria" className='w-fit' />
                            }
                        </div>

                        <div className='flex justify-between'>
                            <div className='flex items-center gap-2'>
                                <Checkbox inputId='excludePreviousYear' checked={checked} onChange={e => setChecked(e.checked)}></Checkbox>
                                <label htmlFor="excludePreviousYear" className='text-gray-500'>Exclude previous year invitee</label>
                            </div>
                            <div className='relative bottom-2'>
                                <Button label='Submit' className='p-button-info p-button-sm w-full normal-case' type="submit" />
                            </div>
                        </div>
                    </div>
                </form >
                {
                    selectedFreedomFighters &&
                    <div className='w-full'>
                        <div className='w-full shadow-lg bg-white p-2 rounded-xl h-[69vh]'>
                            {/* <table className="table-auto container shadow-md">
                                        <thead className='bg-slate-200 text-gray-500'>
                                            <tr className='w-full text-left rounded-t-md'>
                                                <th className='p-2 rounded-tl-md'>Name</th>
                                                <th>Official Rank</th>
                                                <th>Freedom Fighter Rank</th>
                                                <th>Attended</th>
                                                <th className='rounded-tr-md'>Attend Year</th>
                                            </tr>
                                        </thead>
                                        <tbody className='border bg-white'>
                                            {
                                                selectedFreedomFighters?.map(fighter =>
                                                    <tr key={fighter._id} className='border-b text-gray-500'>
                                                        <td className='p-2'>{fighter?.name}</td>
                                                        <td>{fighter?.officialRank?.point}</td>
                                                        <td>{fighter?.freedomFighterRank?.point}</td>
                                                        <td>{fighter?.invited_count || fighter?.invited?.length} Times</td>
                                                        <td className='text-xs italic'>{fighter?.invited?.map((year, index) => <span key={index}>{year}, </span>) || 'N/A'} </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table> */}


                            <div>
                                <DataTable value={selectedFreedomFighters} header={header} dataKey="id" size='small' responsiveLayout="scroll" scrollHeight="48vh" loading={loading} stripedRows>
                                    {
                                        cols.map((col, index) => <Column key={index} field={col.field} header={col.header} />)
                                    }
                                </DataTable>
                                <div className='text-right my-3'>
                                    <Button onClick={() => {
                                        setConfirmSelectionDialogue(true)
                                    }} type='submit' label="Confirm" icon="pi pi-check" className='p-button-info p-button-sm' />
                                </div>
                            </div>


                        </div>

                    </div>
                }

                <Dialog visible={confirmSelectionDialogue} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Verification Status" modal onHide={() => setConfirmSelectionDialogue(false)}>
                    <div className="confirmation-content">
                        <div>
                            <p className='font-semibold'>Are you sure?</p>
                        </div>
                        <div className='text-right mt-4'>
                            <Button onClick={handleTemporarySelect} type='submit' label="Submit" />
                        </div>
                    </div>
                </Dialog>
            </div >
        </div >
    );
};

export default Selection;