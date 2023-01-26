import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


const Selection = () => {

    const [selectedFreedomFighters, setSelectedFreedomFighters] = useState()
    const [firstCriteria, setFirstCriteria] = useState('')
    const [secondCriteria, setSecondCriteria] = useState('')
    const [thirdCriteria, setThirdCriteria] = useState('')
    const [checked, setChecked] = useState(false)

    const handleSelection = (e) => {

        e.preventDefault();

        console.log(firstCriteria, secondCriteria, checked);

        const total = e.target.total.value
        // const alive = e.target.alive.value
        // const dead = e.target.dead.value

        //     fetch(`http://localhost:5000/api/v1/selection?total=${total}&alive=${alive}&dead=${dead}&firstCriteria=${firstCriteria}&secondCriteria=${secondCriteria}`)
        //         .then(res => res.json())
        //         .then(data => setSelectedFreedomFighters(data.data))
        // }


        const url = `http://localhost:5000/api/v1/selection?total=${total}&firstCriteria=${firstCriteria}&secondCriteria=${secondCriteria || 'name'}&thirdCriteria=${thirdCriteria || 'name'}&excludePreviousYear=${checked}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setSelectedFreedomFighters(data.data)
                console.log(data.data);
            })
    }

    console.log(selectedFreedomFighters);

    const invitedYear = (rowData) => {
        return <span>{rowData.length} times</span>
    }

    const cols = [
        { field: 'name', header: 'Name' },
        { field: 'officialRank.point', header: 'Official Rank' },
        { field: 'freedomFighterRank.point', header: 'Fighter Rank' },
        { field: 'invited.length', header: 'Invite Count', body: { invitedYear } },
        { field: 'invited', header: 'Invited' }
    ];

    const exportColumns = cols.map(col => ({ title: col.header, dataKey: col.field }));

    const exportPdf = () => {
        import('jspdf').then(jsPDF => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);
                doc.autoTable(exportColumns, selectedFreedomFighters);
                doc.save('products.pdf');
            })
        })
    }

    const exportExcel = () => {
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(selectedFreedomFighters);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            saveAsExcelFile(excelBuffer, 'selectedFreedomFighters');
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

    const header = (
        <div className='flex justify-between items-center'>
            <div className='text-gray-800 text-xl font-bold'>
                <p>Selected Members</p>
            </div>
            <div className="flex align-items-center export-buttons gap-x-1">
                {/* <Button type="button" icon="pi pi-file" onClick={() => exportCSV(false)} className="mr-2" data-pr-tooltip="CSV" /> */}
                <Button type="button" icon="pi pi-file-excel" onClick={exportExcel} className="p-button-success mr-2" data-pr-tooltip="XLS" />
                <Button type="button" icon="pi pi-file-pdf" onClick={exportPdf} className="p-button-warning mr-2" data-pr-tooltip="PDF" />
            </div>
        </div>
    );

    return (
        <div className='max-h-[90vh]'>
            {/* <div className='text-center mt-8'>
                <h2 className='text-4xl text-secondary font-bold'>Primary Selection</h2>
            </div> */}

            <div className='flex gap-x-6'>
                <form onSubmit={handleSelection} className='container px-10 min-h-[93vh] w-1/4 bg-white'>
                    <div>
                        <p className='text-primary text-xl font-bold text-center underline my-6'>Selection criteria</p>
                    </div>
                    <div className='flex flex-col gap-4 mx-auto justify-center my-4'>
                        <div className="relative">
                            <span className='p-float-label'>
                                <InputText name='total' type="number" id="total" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="total">*Total</label>
                            </span>
                        </div>

                        <Dropdown name='firstCriteria' value={firstCriteria}
                            options={
                                [
                                    { label: 'Name', value: 'name' },
                                    { label: 'Invited Count', value: 'invited_count' },
                                    { label: 'Freedom Fighter Rank', value: 'freedomFighterRank.point' },
                                    { label: 'Official Rank', value: 'officialRank.point' }
                                ]
                            }
                            onChange={(e) => setFirstCriteria(e.value)} placeholder="*First Criteria" />

                        {/* <div className="relative">
                            <select onChange={(e) => setFirstCriteria(e.target.value)} name='force' className="p-3 rounded-md text-gray-400 w-full" required>
                                <option value='' disabled selected>*First Criteria</option>
                                <option value="name">Name</option>
                                <option value="invited_count">Invited Count</option>
                                <option value="freedomFighterRank.point">Freedom Fighter Rank</option>
                                <option value="officialRank.point">Official Rank</option>
                            </select>
                        </div> */}
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
                                onChange={(e) => setSecondCriteria(e.value)} placeholder="Second Criteria" />

                            // <div className="relative">
                            //     <select onChange={(e) => setSecondCriteria(e.target.value)} name='force' className="p-3 rounded-md text-gray-400 w-full" >
                            //         <option value='' disabled selected>Second Criteria</option>
                            //         <option value="name">Name</option>
                            //         <option value="invited_count">Invited Count</option>
                            //         <option value="freedomFighterRank.point">Freedom Fighter Rank</option>
                            //         <option value="officialRank.point">Official Rank</option>

                            //     </select>
                            // </div>
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
                                onChange={(e) => setThirdCriteria(e.value)} placeholder="Third Criteria" />

                            // <div className="relative">
                            //     <select onChange={(e) => setThirdCriteria(e.target.value)} name='force' className="p-3 rounded-md text-gray-400 w-full" >
                            //         <option value='' disabled selected>Third Criteria</option>
                            //         <option value="name">Name</option>
                            //         <option value="invited_count">Invited Count</option>
                            //         <option value="freedomFighterRank.point">Freedom Fighter Rank</option>
                            //         <option value="officialRank.point">Official Rank</option>

                            //     </select>
                            // </div>
                        }

                        <div>
                            <Checkbox inputId='excludePreviousYear' checked={checked} onChange={e => setChecked(e.checked)}></Checkbox>
                            <label htmlFor="excludePreviousYear" className='ml-2 text-gray-500'>Exclude previous year invitee</label>
                        </div>
                        <div>
                            <Button label='Submit' className='p-button-info btn w-full normal-case' type="submit" />
                        </div>
                    </div>
                </form >
                {/* <div className='text-center mb-6'>
                <button onClick={handleSelection} className='btn btn-primary'>Click to select</button>
            </div> */}

                <div className='w-3/4 p-4 mt-4 rounded-md shadow-lg bg-white max-h-[90vh] overflow-y-scroll'>

                    <div className=''>
                        {
                            selectedFreedomFighters ?
                                <div className='max-w-7xl mx-auto'>
                                    <div className="flex justify-between items-center mb-2 p-1 rounded-md">

                                    </div>
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

                                    <DataTable value={selectedFreedomFighters} header={header} dataKey="id" responsiveLayout="scroll">
                                        {
                                            cols.map((col, index) => <Column key={index} field={col.field} header={col.header} />)
                                        }
                                    </DataTable>

                                </div>


                                :

                                <div className=' w-full'>
                                    <p className='text-2xl font-bold text-primary text-center'>Nothing to show here..</p>
                                </div>
                        }
                    </div>
                </div>
            </div >
        </div >
    );
};

export default Selection;