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


export default function Home({ user }) {

  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([])


  //fetch members from DB
  useEffect(() => {

    getAllEvents();
    getAllMembers();

  }, [])


  // get all events 
  const getAllEvents = () => {
    // setLoading(true)
    fetch('http://localhost:5000/api/v1/event')
      .then(res => res.json())
      .then(data => {
        // console.log(data.data);
        setEvents(data.data)
        // setLoading(false)
      })
  }

  // get members 
  const getAllMembers = () => {
    var url = `http://localhost:5000/api/v1/freedomFighters?page=${1})}`

    fetch(url)
      .then(res => res.json())
      .then(data => {
        // console.log(data.freedomFighters);
        setMembers(data.freedomFighters.reverse());
      })
  }

  // add the event wise invitation count data to events 
  events.map(eventData => {

    // for primary selection count 
    const primarySelected = members.filter(member => {
      return member.primarySelection && member.primarySelection.some(selection => selection.event == eventData.name)
    }).length
    eventData.primarySelected = primarySelected;

    // for final invited count 
    const invited = members.filter(member => {
      return member.primarySelection && member.primarySelection.some(selection => selection.event == eventData.name && selection.verificationStatus.status == 'Success')
    }).length
    eventData.invited = invited;
  })

  const lineData = {
    labels: events.map(event => event.name),
    datasets: [
      {
        label: 'Primary Selected',
        data: events.map(event => event.primarySelected),
        fill: false,
        backgroundColor: '#2f4860',
        borderColor: '#2f4860',
        tension: 0.4
      },
      {
        label: 'Invited Members',
        data: events.map(event => event.invited),
        fill: false,
        backgroundColor: '#2196F3',
        borderColor: '#2196F3',
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

      <div className='m-2 mb-4'>
        <p className='text-2xl font-bold'>Hello, <span className='text-primary'>{user.name}</span></p>
      </div>
      <div className="grid h-[160px]">
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Total Members</span>
                <div className="text-900 font-medium text-xl">{members.length}</div>
              </div>
              <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <i className="pi pi-users text-blue-500 text-xl"></i>
              </div>
            </div>
          </div >
        </div >
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Freedom Fighter</span>
                <div className="text-900 font-medium text-xl">
                  {
                    members.filter(member => member.category == 'Freedom Fighter').length
                  }
                </div>
              </div>
              <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <i className="text-orange-500 text-xl"> <Image src={fighterLogo} alt='Freedom Fighter Icon' height={25} width={25}></Image></i>
              </div>
            </div>
          </div >
        </div >
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">General Invitees</span>
                <div className="text-900 font-medium text-xl">
                  {
                    members.filter(member => member.category == 'General Invitees').length
                  }
                </div>
              </div>
              <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <i className=" text-cyan-500 text-xl"><Image src={generalMember} alt='Freedom Fighter Icon' height={30} width={30}></Image></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Others</span>
                <div className="text-900 font-medium text-xl">
                  {
                    members.filter(member => (member.category !== ('Freedom Fighter')) && (member.category !== 'General Invitees')).length
                  }
                </div>
              </div>
              <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <i className=" text-purple-500 text-xl"><Image src={retiredOfficers} alt='Freedom Fighter Icon' height={22} width={22}></Image></i>
              </div>
            </div>
          </div >
        </div >
      </div >


      <div className="flex h-[100vh-160px] col-12 p-0 mt-4">
        <div className="grid gap-3 col-7 p-2 mr-2">
          <div className='col-12 p-0'>
            <div className=" p-2 bg-white shadow-lg  rounded-sm">
              <h5 className='text-gray-700'>Invitation Summary</h5>
              <Chart type="bar" data={lineData} className='z-0 relative' />
            </div>
          </div>
          {/* <div className='col-12 p-0'>
            <div className=" p-2 bg-white shadow-lg  rounded-sm">
              <h5 className='text-gray-700'>Sales Overview</h5>
              <Chart type="line" data={lineData} />
            </div>
          </div> */}
        </div>
        <div className=" col-5 p-0">
          <div className=" p-2 bg-white shadow-lg ">
            <div className="flex justify-between text-gray-700 mb-1 rounded-sm">
              <h5 className='text-gray-700'>New Members</h5>
              <Link href='/freedom-fighters' className='hover:bg-primary bg-secondary text-white rounded px-1 transition-all ease-in duration-200'>Browse All<i className="pi pi-arrow-right text-xs ml-1"></i>
              </Link>
            </div>
            <DataTable value={members.slice(0, 7)} size='small' removableSort rows={5} responsiveLayout='scroll' scrollHeight='98vh'>
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