import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'primereact/chart';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Menu } from 'primereact/menu';
import { getFreedomFighters } from '../../controllers/freedomFighter.controller';
import Link from 'next/link';

const Dashboard = () => {

    const [members, setMembers] = useState(null)
    const menu1 = useRef(null);
    console.log(members);

    const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: '#2f4860',
                borderColor: '#2f4860',
                tension: 0.4
            },
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                backgroundColor: '#00bb7e',
                borderColor: '#00bb7e',
                tension: 0.4
            }
        ]
    };

    useEffect(() => {
        getFreedomFighters(1).then(data => setMembers(data.freedomFighters))
    }, [])

    return (
        <div className="grid">
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0 bg-white p-4 shadow-lg">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Orders</span>
                            <div className="text-900 font-medium text-xl">152</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-shopping-cart text-blue-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">24 new </span>
                    <span className="text-500">since last visit</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0 bg-white p-4 shadow-lg">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Revenue</span>
                            <div className="text-900 font-medium text-xl">$2.100</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-map-marker text-orange-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">%52+ </span>
                    <span className="text-500">since last week</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0 bg-white p-4 shadow-lg">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Customers</span>
                            <div className="text-900 font-medium text-xl">28441</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-inbox text-cyan-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">520 </span>
                    <span className="text-500">newly registered</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0 bg-white p-4 shadow-lg">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Comments</span>
                            <div className="text-900 font-medium text-xl">152 Unread</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-comment text-purple-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">85 </span>
                    <span className="text-500">responded</span>
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card p-4 bg-white shadow-lg">
                    <div className="flex justify-between text-gray-700 mb-1">
                        <h5 className='text-gray-700'>New Members</h5>
                        <Link href='/freedom-fighters' className='hover:bg-primary rounded px-1 transition-all ease-in duration-200'>Browse All</Link>
                    </div>
                    <DataTable value={members} rows={5} responsiveLayout="scroll" scrollHeight="50vh">
                        {/* <Column header="Image" body={(data) => <img className="shadow-2" src={`${contextPath}/demo/images/product/${data.image}`} alt={data.image} width="50" />} /> */}
                        <Column field="name" header="Name" sortable style={{ width: '35%' }} />
                        <Column field="category" header="Category" sortable style={{ width: '35%' }} />
                        <Column field="mobile" header="Name" sortable style={{ width: '35%' }} />

                    </DataTable>
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card p-4 bg-white shadow-lg">
                    <h5 className='text-gray-700'>Sales Overview</h5>
                    <Chart type="line" data={lineData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;