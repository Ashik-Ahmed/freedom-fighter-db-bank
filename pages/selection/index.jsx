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
import { Toast } from 'primereact/toast';
import { useRef } from 'react';


const Selection = () => {

    const [selectedFreedomFighters, setSelectedFreedomFighters] = useState()
    const [memberCategories, setMemberCategories] = useState()
    const [memberType, setMemberType] = useState('')
    const [selectionCriteria, setSelectionCriteria] = useState({})
    const [firstCriteria, setFirstCriteria] = useState('')
    const [secondCriteria, setSecondCriteria] = useState('')
    const [thirdCriteria, setThirdCriteria] = useState('')
    const [excludePreviousYear, setExcludePreviousYear] = useState(false);
    const [reportModal, setReportModal] = useState(null);
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false)
    const [events, setEvents] = useState([])
    const [event, setEvent] = useState('')
    const [year, setYear] = useState('')
    const [minYear, setMinYear] = useState(new Date().toLocaleString("en-GB"))
    const [confirmSelectionDialogue, setConfirmSelectionDialogue] = useState(false)

    const [formData, setFormData] = useState({});


    const toast = useRef()


    // fetch available events from db 
    useEffect(() => {
        fetch('http://localhost:5000/api/v1/event')
            .then(res => res.json())
            .then(data => {
                setEvents(data.data)
            })
    }, [])
    // fetch member type wise criteria from db 
    useEffect(() => {
        fetch('http://localhost:5000/api/v1/event')
            .then(res => res.json())
            .then(data => {
                setEvents(data.data)
            })

        fetch('http://localhost:5000/api/v1/memberCategory')
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                const categoryNames = data.data
                setMemberCategories(categoryNames)
            })
    }, [])


    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData, [name]: value
        });
    };

    const onCriteriaChange = (event) => {
        const { name, value } = event.target;

        setSelectionCriteria({
            ...selectionCriteria, [name]: value
        });
        console.log(selectionCriteria);
    }

    const handleSelection = (e) => {

        setLoading(true)
        e.preventDefault();

        console.log(formData);

        // console.log(memberType, firstCriteria, secondCriteria, checked, event.name);

        const total = e.target.total.value
        const alivePercentage = e.target.alive.value;
        const deadPercentage = e.target.dead.value;

        console.log(alivePercentage, deadPercentage);


        //     fetch(`http://localhost:5000/api/v1/selection?total=${total}&alive=${alive}&dead=${dead}&firstCriteria=${firstCriteria}&secondCriteria=${secondCriteria}`)
        //         .then(res => res.json())
        //         .then(data => setSelectedFreedomFighters(data.data))
        // }

        const data = {
            total,
            alivePercentage,
            deadPercentage,
            memberType: memberType.name,
            eventDetails: {
                event: event.name,
                year: year.getFullYear()
            },
            selectionCriteria,
            excludePreviousYear
        }

        const url = `http://localhost:5000/api/v1/selection?data=${JSON.stringify(data)}`;

        // const url = `http://localhost:5000/api/v1/selection?total=${total}&memberType=${memberType}&selectionCriteria=${JSON.stringify(selectionCriteria)}&excludePreviousYear=${excludePreviousYear}&yearOfInvitation=${year.getFullYear()}`;
        // const url = `http://localhost:5000/api/v1/selection?total=${total}&memberType=${memberType}&firstCriteria=${firstCriteria}&secondCriteria=${secondCriteria || 'name'}&thirdCriteria=${thirdCriteria || 'name'}&excludePreviousYear=${checked}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.data) {
                    setSelectedFreedomFighters(data.data)
                    console.log(data.data);
                    setLoading(false)
                }
                else {
                    console.log(data);
                    toast.current.show({ severity: 'error', summary: 'Error!', detail: `${data.error}`, life: 3000 })
                    setSelectedFreedomFighters([])
                    setLoading(false)
                }
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

    const nameBodyTemplate = (member) => {
        return <span>{member.name}</span>
    }

    const cols = [
        { field: 'name', header: 'Name', body: { nameBodyTemplate } },
        { field: 'category', header: 'Member Type' },
        { field: 'status', header: 'Status' },
        { field: 'forceRank', header: 'Official Rank' },
        // { field: 'officialRank.point', header: 'Official Point' },
        { field: `fighterRank`, header: 'Fighter Rank' },
        // { field: 'fighterPoint', header: 'Fighter Value' },
        // { field: 'invitationCount', header: 'Invite Count', body: { invitedYear } }
        { field: 'invitationCount', header: 'Invite Count' },
        // { field: 'invitedYear', header: 'Invited Year' }
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
                        doc.text(`Proposed invitees for ${event.name}-${year.getFullYear()}`, 50, 22);

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


    // set temporary selection flag to members in database
    const handleTemporarySelect = () => {

        const memberIds = selectedFreedomFighters.map(member => member._id);
        const url = `http://localhost:5000/api/v1/selection/primary-selection`

        fetch(url, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ memberIds, event: event.name, year: year.getFullYear() })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSelectedFreedomFighters([])
                setConfirmSelectionDialogue(false)
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Members added to primary selection', life: 3000 })
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
            <Toast ref={toast} />
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
                <form onSubmit={handleSelection} className=' bg-white w-full mx-auto rounded-md shadow-lg'>
                    <div className='flex p-2 flex-col gap-2 mx-auto justify-center mb-2'>
                        <div>
                            <p className='text-gray-700 font-bold'>Selection Criteria</p>
                        </div>

                        <div className='flex flex-wrap gap-2 mb-1'>
                            <div className="relative">
                                <InputText keyfilter="int" placeholder="*Total" name='total' required className=' w-[150px]' />
                                {/* <InputText keyfilter="int" placeholder="Integers" /> */}
                            </div>
                            <div className="relative">
                                <InputText keyfilter="int" placeholder="*Alive Percentage" name='alive' required className=' w-[150px]' />
                                {/* <InputText keyfilter="int" placeholder="Integers" /> */}
                            </div>
                            <div className="relative">
                                <InputText keyfilter="int" placeholder="*Dead Percentage" name='dead' required className=' w-[150px]' />
                                {/* <InputText keyfilter="int" placeholder="Integers" /> */}
                            </div>
                            <div>
                                <Dropdown name='program' options={events} optionLabel='name' value={event}
                                    onChange={(e) => {
                                        setEvent(e.value)
                                        // console.log(e.value);
                                    }}
                                    placeholder="*Select Program" className=' w-full' required />
                            </div>
                            <div>
                                <Calendar name='year' id='year' value={year}
                                    onChange={(e) => {
                                        setYear(e.value)
                                    }}
                                    view="year" dateFormat="yy" placeholder='*Year' className='w-full' required />
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                            <div>
                                <Dropdown name='memberType' options={memberCategories} optionLabel='name' value={memberType}
                                    onChange={(e) => {
                                        setMemberType(e.value)
                                        console.log(e.value);
                                    }} placeholder="*Select Member Type" className=' w-full' required />
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
                            <Dropdown name='firstCriteria' options={memberType.priorityCriterias} optionLabel='label' value={firstCriteria} disabled={!memberType}
                                // options={
                                //     [
                                //         { label: 'Name', value: 'name' },
                                //         { label: 'Invitation Count', value: 'invitationCount' },
                                //         { label: 'Freedom Fighter Rank', value: 'freedomFighterRank.point' },
                                //         { label: 'Official Rank', value: 'officialRank.point' }
                                //     ]
                                // }
                                onChange={(e) => {
                                    setFirstCriteria(e.value);
                                    onCriteriaChange(e)
                                }} placeholder="*First Criteria" className='w-fit' />

                            {
                                firstCriteria &&
                                <Dropdown name='secondCriteria' options={memberType.priorityCriterias} optionLabel='label' value={secondCriteria}
                                    onChange={(e) => {
                                        setSecondCriteria(e.value)
                                        onCriteriaChange(e)
                                    }} placeholder="Second Criteria" className='w-fit' />
                            }
                            {
                                secondCriteria &&

                                <Dropdown name='thirdCriteria' options={memberType.priorityCriterias} optionLabel='label' value={thirdCriteria}
                                    onChange={(e) => {
                                        setThirdCriteria(e.value)
                                        onCriteriaChange(e)
                                    }} placeholder="Third Criteria" className='w-fit' />
                            }
                        </div>

                        <div className='flex justify-between'>
                            <div className='flex items-center gap-2'>
                                <Checkbox name='excludePreviousYear' inputId='excludePreviousYear' checked={excludePreviousYear} onChange={e => {
                                    setExcludePreviousYear(e.checked);
                                }}></Checkbox>
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
                        <div className='w-full shadow-lg bg-white rounded-md h-[64vh]'>
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
                                <DataTable value={selectedFreedomFighters} header={header} dataKey="id" size='small' responsiveLayout="scroll" scrollHeight="46vh" loading={loading} stripedRows>

                                    <Column header="#" headerStyle={{ width: '3rem' }} body={(data, options) => options.rowIndex + 1}></Column>
                                    {
                                        cols.map((col, index) => <Column key={index} field={col.field} header={col.header} className='text-sm' />)
                                    }
                                </DataTable>
                                <div className='text-right mt-1'>
                                    <Button onClick={() => {
                                        setConfirmSelectionDialogue(true)
                                    }} type='submit' label="Confirm" icon="pi pi-check" className='p-button-info p-button-sm' />
                                </div>
                            </div>


                        </div>

                    </div>
                }

                <Dialog visible={confirmSelectionDialogue} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Make Selection" modal onHide={() => setConfirmSelectionDialogue(false)}>
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