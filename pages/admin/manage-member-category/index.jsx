import { Column } from 'jspdf-autotable';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';

const ManageMemberCategory = () => {
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);
    const [addCategoryDialog, setAddCategoryDialog] = useState(false)
    const [deleteCategoryDialog, setDeleteCategoryDialog] = useState(false)

    const toast = useRef()


    const getAllCategories = () => {
        setLoading(true)
        fetch('http://localhost:5000/api/v1/memberCategory')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCategories(data.data)
                setLoading(false)
            })
    }

    useEffect(() => {
        getAllCategories()
    }, [])


    //Add new category
    const handleAddCategory = (e) => {
        e.preventDefault();

        const category = {
            name: e.target.name.value,
            description: e.target.description.value
        }
        console.log(category);

        fetch('http://localhost:5000/api/v1/memberCategory', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                // authorization: `Bearer ${cookie.get('TOKEN')}`
            },
            body: JSON.stringify(category)
        })
            .then(res => res.json())
            .then(data => {
                if (data.status = 'Success') {
                    setAddCategoryDialog(false)
                    getAllCategories();
                    console.log(data);
                    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Category Added', life: 3000 })
                }
                else {
                    console.log(data.error);
                    toast.current.show({ severity: 'error', summary: 'Failed!', detail: 'Please try again.', life: 3000 });
                }
            })

    }

    const handleDeleteCategory = (categoryId) => {
        console.log(categoryId);

        const url = `http://localhost:5000/api/v1/memberCategory/${categoryId}`
        fetch(url, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.data.deletedCount > 0) {
                    console.log(data);
                    getAllCategories()
                    setDeleteCategoryDialog(false)
                    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Category Deleted', life: 3000 })
                }
                else {
                    console.log(data.error);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed! Please try again.', life: 3000 });
                }
            })
    }

    const header = (
        <div className='flex justify-between items-center'>
            <div className='flex  items-center gap-x-2 text-gray-800 text-xl font-bold'>
                <p>Member Category List</p>
            </div>
        </div>
    );


    const actionBodyTemplate = (rowData) => {
        return (
            <div className='flex space-x-2'>
                <Button icon='pi pi-trash' className='p-button-danger' onClick={() => {
                    setCategory(rowData)
                    setDeleteCategoryDialog(true)
                }}></Button>
            </div>
        )
    }

    return (
        <div>
            <Toast ref={toast} />
            <div className=' max-w-7xl mx-auto mt-4'>
                <Button icon='pi pi-plus' label='Add Member Category' onClick={() => setAddCategoryDialog(true)} />

                {/* add event dialogue  */}
                <Dialog header="Add New Category" visible={addCategoryDialog} onHide={() => {
                    setAddCategoryDialog(false);
                }} breakpoints={{ '960px': '75vw' }} style={{ width: '70vw' }} >
                    <form onSubmit={handleAddCategory} className='flex flex-col mt-4'>
                        <div className='p-float-label'>
                            <InputText type="text" name='name' id='name' className='input text-gray-700 w-full' required />
                            <label htmlFor="name">*Category Name</label>
                        </div>
                        <div className="p-float-label mt-4">
                            <InputTextarea type="text" name='description' id='description' className='w-full' rows={5} required />
                            <label htmlFor="description">*Details</label>
                        </div>
                        <div className='flex justify-end gap-2 mt-8'>
                            <Button label="Cancel" icon="pi pi-times" onClick={() => {
                                setAddCategoryDialog(false);
                            }} className="p-button-danger p-button-sm" />
                            <Button type='submit' label="Submit" icon="pi pi-check" className='p-button-info p-button-sm' />
                        </div>
                    </form>
                </Dialog>

                <div className='bg-white p-2 rounded-md shadow-lg min-h-[75vh] mt-2'>
                    <DataTable value={categories} header={header} dataKey="id" size='small' responsiveLayout="scroll" scrollHeight="65vh" loading={loading} stripedRows>
                        {/* {
                        cols.map((col, index) => <Column key={index} field={col.field} header={col.header} />)
                    } */}
                        <Column header='Category' field='name'></Column>
                        <Column header='Description' field='description'></Column>
                        <Column header='Action' body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>

                {/* event delete dialog box  */}
                <Dialog header="Delete Category" visible={deleteCategoryDialog} onHide={() => { setDeleteCategoryDialog(false) }} breakpoints={{ '960px': '75vw' }} style={{ width: '25vw' }} >

                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3 text-red-500" style={{ fontSize: '2rem' }} />
                        {category && (
                            <span>
                                Are you sure you want to delete <b>{category?.name}</b>?
                            </span>
                        )}

                        <div className='flex gap-x-2 mt-4 justify-end'>
                            <Button onClick={() => { setDeleteCategoryDialog(false) }} label="No" icon="pi pi-times" outlined />
                            <Button onClick={() => handleDeleteCategory(category?._id)} label="Yes" icon="pi pi-trash" severity="danger" className='p-button-danger' />
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
    );
};

export default ManageMemberCategory;