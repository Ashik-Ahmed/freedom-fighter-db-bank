import Head from 'next/head'
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import countryList from 'react-select-country-list'
import { InputTextarea } from 'primereact/inputtextarea';
import FreedomFighterRow from '../components/FreedomFighterRow/FreedomFighterRow';
import { getFreedomFighters } from '../controllers/freedomFighter.controller';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Skeleton } from 'primereact/skeleton';
import Link from 'next/link';
import { Chart } from 'primereact/chart';
import fighterLogo from '../Images/freedom-fighter-logo.png'
import generalMember from '../Images/general-member-icon.png'
import retiredOfficers from '../Images/retired-officers-icon.png'

import Image from 'next/image';


export default function Home() {

  const [freedomFightersData, setFreedomFightersData] = useState([]);

  //fetch members from DB
  useEffect(() => {

    var url = `http://localhost:5000/api/v1/freedomFighters?page=${1})
} `

    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data.freedomFighters);
        setFreedomFightersData(data.freedomFighters);
      })
  }, [])


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

  return (
    <div>
      <Head>
        <title></title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid h-[160px]">
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Total Members</span>
                <div className="text-900 font-medium text-xl">680</div>
              </div>
              <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <i className="pi pi-users text-blue-500 text-xl"></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">62 new </span>
            <span className="text-500">joined since last year</span>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Freedom Fighter</span>
                <div className="text-900 font-medium text-xl">180</div>
              </div>
              <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <i className="text-orange-500 text-xl"> <Image src={fighterLogo} alt='Freedom Fighter Icon' height={25} width={25}></Image></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">All </span>
            <span className="text-500">are permanent member</span>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">General</span>
                <div className="text-900 font-medium text-xl">300</div>
              </div>
              <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <i className=" text-cyan-500 text-xl"><Image src={generalMember} alt='Freedom Fighter Icon' height={30} width={30}></Image></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">16  </span>
            <span className="text-500">newly joined</span>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Retired Officers</span>
                <div className="text-900 font-medium text-xl">152</div>
              </div>
              <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <i className=" text-purple-500 text-xl"><Image src={retiredOfficers} alt='Freedom Fighter Icon' height={22} width={22}></Image></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">12 </span>
            <span className="text-500">newly joined</span>
          </div>
        </div>
      </div>


      <div className="flex h-[100vh-160px] col-12 p-0">
        <div className="grid gap-3 col-7 p-2 mr-2">
          <div className='col-12 p-0'>
            <div className=" p-2 bg-white shadow-lg  rounded-sm">
              <h5 className='text-gray-700'>Sales Overview</h5>
              <Chart type="bar" data={lineData} />
            </div>
          </div>
          <div className='col-12 p-0'>
            <div className=" p-2 bg-white shadow-lg  rounded-sm">
              <h5 className='text-gray-700'>Sales Overview</h5>
              <Chart type="line" data={lineData} />
            </div>
          </div>
        </div>
        <div className=" col-5 p-0">
          <div className=" p-2 bg-white shadow-lg ">
            <div className="flex justify-between text-gray-700 mb-1 rounded-sm">
              <h5 className='text-gray-700'>New Members</h5>
              <Link href='/freedom-fighters' className='hover:bg-primary bg-secondary text-white rounded px-1 transition-all ease-in duration-200'>Browse All<i className="pi pi-arrow-right text-xs ml-1"></i>
              </Link>
            </div>
            <DataTable value={freedomFightersData} size='small' removableSort rows={5} responsiveLayout='scroll' scrollHeight='98vh'>
              {/* <Column header="Image" body={(data) => <img className="shadow-2" src={`${ contextPath } /demo/images / product / ${ data.image } `} alt={data.image} width="50" />} /> */}
              <Column field="name" header="Name" sortable style={{ width: '35%', fontSize: '14px' }} />
              <Column field="category" header="Category" sortable style={{ width: '35%', fontSize: '14px' }} />
              <Column field="mobile" header="Contact" sortable style={{ width: '35%', fontSize: '14px' }} />
            </DataTable>
          </div>
        </div>
      </div >
    </div >
  )
}


// export const getStaticProps = async (context) => {
//   const { totalFreedomFighterCount, freedomFighters } = await getFreedomFighters();
//   const result = JSON.parse(JSON.stringify(freedomFighters))

//   return {
//     props: {
//       freedomFighters: result,
//       totalFreedomFighterCount
//       // getStaticProps: JSON.parse(JSON.stringify(getStaticProps))
//     },
//     revalidate: 10,
//   }
// }