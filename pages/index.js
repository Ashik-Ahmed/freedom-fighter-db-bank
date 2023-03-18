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


export default function Home() {

  const [freedomFightersData, setFreedomFightersData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(0)
  const [filter, setFilter] = useState('')
  const [searchValue, setSearchValue] = useState('');
  const [addMemberDialog, setAddMemberDialog] = useState(false);

  const [ranks, setRanks] = useState([]);
  const [countries, setCountries] = useState([]);

  const [memberType, setMemberType] = useState('')
  const [country, setCountry] = useState();
  const [force, setForce] = useState('');
  const [rank, setRank] = useState('');
  const [fighterRank, setFighterRank] = useState('');



  // let loadLazyTimeout = null;

  // const [globalFilter, setGlobalFilter] = useState(null);
  // const [loading, setLoading] = useState(false)
  // const [filters, setFilters] = useState({
  //   force: '',
  //   search: ''
  //   // 'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
  //   // 'name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  //   // 'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  //   // 'representative': { value: null, matchMode: FilterMatchMode.IN },
  //   // 'status': { value: null, matchMode: FilterMatchMode.EQUALS },
  //   // 'verified': { value: null, matchMode: FilterMatchMode.EQUALS }
  // });
  // const [lazyParams, setLazyParams] = useState({
  //   page: 0,
  //   limit: 10
  // });

  // useEffect(() => {
  //   loadLazyData()
  //   // console.log(filters2)
  // }, [filters]) // eslint-disable-line react-hooks/exhaustive-deps

  // // useEffect(() => {

  // //   setFreedomFightersData(freedomFightersData.filter(member => member.name.toLowerCase().includes(searchValue.toLowerCase())))
  // //   console.log(freedomFightersData)
  // // }, [lazyParams, searchValue]) // eslint-disable-line react-hooks/exhaustive-deps

  // const loadLazyData = () => {
  //   setLoading(true);
  //   // console.log(filters);

  //   if (loadLazyTimeout) {
  //     clearTimeout(loadLazyTimeout);
  //   }

  //   const url = `http://localhost:5000/api/v1/freedomFighters?data=${JSON.stringify(lazyParams)}&filter=${JSON.stringify(filters)}`
  //   console.log(url)
  //   fetch(url, {
  //     next: {
  //       revalidate: 10
  //     }
  //   }).then(res => res.json())
  //     .then(data => {
  //       setFreedomFightersData(data.freedomFighters)
  //       setTotalData(data.totalFreedomFighterCount)
  //       setLoading(false)
  //       // console.log(data.freedomFighters);
  //     })
  //   setLoading(false)
  // }

  // const onPage = (event) => {
  //   setLazyParams(event);
  // }

  // const onSort = (event) => {
  //   setLazyParams(event);
  // }


  useEffect(() => {
    // fetch countries 
    setCountries(countryList().getLabels())

    // fetch freedom fighters 
    // fetch('http://localhost:5000/api/v1/freedomFighters', {
    //   next: {
    //     revalidate: 10
    //   }
    // }).then(res => res.json())
    //   .then(data => {
    //     setFreedomFightersData(data)
    //     console.log(data);
    //   })
  }, [])



  const memberTypes = [
    'Freedom Fighter',
    'General Invitees',
    'Retired',
    'Retired ORs/Other'
  ]

  const forces = [
    'Army',
    'Navy',
    'Air Force'
  ]

  const armyRank = [
    'General',
    'Lieutenant general',
    'Major general',
    'Brigadier general',
    'Colonel',
    'Lieutenant colonel',
    'Major',
    'Captain',
    'Lieutenant',
    'Second lieutenant',
    'Officer cadet',
    'Master warrant officer',
    'Senior warrant officer',
    'Warrant officer',
    'Regiment Sergeant Major',
    'Quarter Master Sergeant',
    'Sergeant Major',
    'Master Sergeant',
    'Sergeant',
    'Corporal',
    'Lance corporal',
    'Sainik'
  ]
  const navyRank = [
    'Admiral',
    'Vice admiral',
    'Rear admiral',
    'Commodore',
    'Captain',
    'Commander',
    'Lieutenant commander',
    'Lieutenant',
    'Sub-lieutenant',
    'Acting sub-lieutenant',
    'Midshipman',
    'Officer cadet',
    'Master chief petty officer',
    'Senior chief petty officer',
    'Chief petty officer',
    'Leading seaman',
    'Able seaman',
    'Ordinary seaman'
  ]
  const airForceRank = [
    'Air Chief Marshal',
    'Air Marshal',
    'Air Vice-Marshal',
    'Air Commodore',
    'Group Captain',
    'Wing Commander',
    'Squadron Leader',
    'Flight Lieutenant',
    'Flight Sergeant',
    'Flying Officer',
    'Pilot Officer',
    'Officer cadet',
    'Master warrant officer',
    'Senior warrant officer',
    'Warrant officer',
    'Sergeant',
    'Corporal',
    'Leading aircraftman',
    'Aircraftman 1',
    'Aircraftman 2'
  ]

  const fighterRanks = [
    { label: 'Bir Shreshtho', value: { rank: 'Bir Shreshtho', point: 70 } },
    { label: 'Bir Uttam', value: { rank: 'Bir Uttam', point: 71 } },
    { label: 'Bir Bikrom', value: { rank: 'Bir Bikrom', point: 72 } },
    { label: 'Bir Protik', value: { rank: 'Bir Protik', point: 73 } },
    { label: 'Bir Muktijoddha', value: { rank: 'Bir Muktijoddha', point: 74 } }
  ]

  const clearAllState = () => {
    setAddMemberDialog(false);
    setCountry('');
    setForce('');
    setRanks('');
    setFighterRank('');
    setMemberType('');
  }



  //fetch members from DB
  useEffect(() => {
    console.log(filter)

    var url = `http://localhost:5000/api/v1/freedomFighters?page=${parseInt(currentPage || 1)}`

    if (filter) {
      url = `http://localhost:5000/api/v1/freedomFighters?page=${parseInt(currentPage || 1)}&category=${filter || {}}`
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data.freedomFighters);
        setFreedomFightersData(data.freedomFighters);
        setTotalData(data.totalFreedomFighterCount)
      })
  }, [currentPage, filter])

  const handlePageClick = (e) => {
    setCurrentPage(parseInt(e?.selected) + 1)
  }
  const pageCount = Math.ceil(totalData / 10);


  // insert member into database 
  // const handleInsertFreedomFighter = async (e) => {
  //   e.preventDefault();
  //   const data = new FormData(e.target);
  //   const fullName = data.get('fullName');
  //   const email = data.get('email');
  //   const contact = data.get('contact');
  //   // const photo = data.files[0];
  //   const photo = e.target.file;
  //   const status = data.get('status');
  //   const country = data.get('country');
  //   const force = data.get('force');
  //   const officialRank = data.get('officialRank');
  //   const freedomFighterRank = data.get('freedomFighterRank');
  //   const address = data.get('address');
  //   const description = data.get('description');

  //   // console.log(photo.toLowerCase().replace(/\s+/g, ''));

  //   // await fetch('http://localhost:5000/api/v1/freedomFighters/profilePhotoUpload', {
  //   //     method: 'POST',
  //   //     headers: {
  //   //         'encType': 'multipart/form-data'
  //   //     }
  //   // })
  //   //     .then(res => res.json())
  //   //     .then(data => { console.log(data) })

  //   const fighter = {
  //     name: fullName,
  //     email,
  //     photo,
  //     mobile: contact,
  //     country,
  //     status,
  //     force,
  //     officialRank: {
  //       rank: officialRank,
  //       point: 20
  //     },
  //     freedomFighterRank: {
  //       rank: freedomFighterRank,
  //       point: 15
  //     },
  //     address,
  //     description
  //   }
  //   // console.log(fighter)


  //   fetch('http://localhost:5000/api/v1/freedomFighters', {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //     body: JSON.stringify(fighter),
  //   })
  //   // .then(res => res.json()).then(data => {
  //   //     console.log(data)
  //   //     if (data.status == 'success') {
  //   //         e.target.reset();
  //   //     }
  //   // })
  // }


  // member insert new way 

  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    // setFormData({
    //   ...formData, [name]: value
    // });
    // convert object value to string as object is not accessible from formData
    if (typeof value == 'object') {
      console.log(JSON.parse(JSON.stringify(value)));
      setFormData({
        ...formData, [name]: JSON.stringify(value)
      });
    }

    else {
      setFormData({
        ...formData, [name]: value
      });
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleInsertFreedomFighter = async (event) => {
    event.preventDefault();

    const userDataWithPhoto = new FormData();
    Object.keys(formData).forEach((key) => {
      // console.log(typeof formData[key]);
      if (typeof formData[key] == 'object') {
        userDataWithPhoto.append(key, JSON.parse(JSON.stringify(formData[key])));
        console.log(userDataWithPhoto.get(key));
      }

      else {
        userDataWithPhoto.append(key, formData[key]);
      }
    });
    // console.log(fighterRank);
    userDataWithPhoto.append("file", file);
    // userDataWithPhoto.append("freedomFighterRank", JSON.stringify(fighterRank));

    console.log(userDataWithPhoto.get("freedomFighterRank"));


    fetch("http://localhost:5000/api/v1/freedomFighters", {
      method: "POST",
      headers: {
        'encType': 'multipart/form-data'
      },
      // do not stringify. if you do, backend will not get the data
      body: userDataWithPhoto
    });
    // console.log(userDataWithPhoto.get('freedomFighterRank'))
    // console.log(await response.json());

  };

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

      {/* <div>
        <div className='flex flex-wrap md:flex-nowrap justify-center max-w-7xl mx-auto py-2 gap-4'>
          <div className='w-full'>
            <div className=" shadow-xl bg-white/70 text-gray-800 rounded-md border-primary border-l-8">
              <div className="card-body">
                <p className='text-xl font-bold'>Total Member</p>
                <p className='text-xl'>680</p>
              </div>
            </div>
          </div>
          <div className='w-full'>
            <div className=" shadow-xl bg-white/70 text-gray-800 rounded-md border-secondary border-l-8">
              <div className="card-body">
                <p className='text-xl font-bold'>General Member</p>
                <p className='text-xl'>200</p>
              </div>
            </div>
          </div>
          <div className='w-full'>
            <div className=" shadow-xl bg-white/70 text-gray-800 rounded-md border-green-500 border-l-8">
              <div className="card-body">
                <p className='text-xl font-bold'>Freedom Fighter</p>
                <p className='text-xl'>180</p>
              </div>
            </div>
          </div>
          <div className='w-full'>
            <div className=" shadow-xl bg-white/70 text-gray-800 rounded-md border-violet-500 border-l-8">
              <div className="card-body">
                <p className='text-xl font-bold'>Retired Member</p>
                <p className='text-xl'>300</p>
              </div>
            </div>
          </div>

        </div>
      </div> */}


      <div className="grid mt-1">
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Total Members</span>
                <div className="text-900 font-medium text-xl">680</div>
              </div>
              <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <i className="pi pi-shopping-cart text-blue-500 text-xl"></i>
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
                <i className="pi pi-map-marker text-orange-500 text-xl"></i>
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
                <i className="pi pi-inbox text-cyan-500 text-xl"></i>
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
                <i className="pi pi-comment text-purple-500 text-xl"></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">12 </span>
            <span className="text-500">newly joined</span>
          </div>
        </div>
      </div>


      <div className="overflow-x-auto">
        <div className='max-w-7xl mx-auto'>
          {/* <div className='rounded-md inline-block mb-2'>
            <Button label='Add Member' onClick={() => setAddMemberDialog(true)} icon='pi pi-plus' />
          </div> */}

          {/* add new member dialog box  */}
          <Dialog header="Add New Member" visible={addMemberDialog} onHide={() => clearAllState()} breakpoints={{ '960px': '75vw' }} style={{ width: '80vw' }} >
            <div className='mx-auto max-w-7xl  pb-4'>


              {/* action='http://localhost:5000/api/v1/freedomFighters' method='POST' encType='multipart/form-data'*/}
              <form onSubmit={handleInsertFreedomFighter} className='space-y-4 bg-gray-100 bg-opacity-90 p-4 shadow-xl rounded-md'>
                <p className='text-2xl font-bold text-primary mx-auto'>Please fill the information</p>
                <div>
                  <Dropdown name='memberType' options={memberTypes} value={memberType}
                    onChange={(e) => {
                      handleChange(e)
                      setMemberType(e.value)
                    }} placeholder="*Select Member Type" className='text-black w-full' required />
                </div>
                <div className='flex w-full gap-x-12'>
                  <div className="p-float-label w-1/2">
                    <InputText name='fullName' id='fullName'
                      onChange={handleChange}
                      className='w-full' required />
                    <label htmlFor="fullName" >*Full Name</label>
                  </div>
                  <div className='p-float-label w-1/2'>
                    <InputText name='email' id='email'
                      onChange={handleChange}
                      className='w-full' required />
                    <label htmlFor="email">*Email</label>
                  </div>
                </div>
                <div className='flex w-full gap-x-12 items-center'>
                  <div className='p-float-label w-1/3'>
                    <InputText name='mobile' id='mobile'
                      onChange={handleChange}
                      className='w-full' required />
                    <label htmlFor="mobile">*Contact</label>
                  </div>
                  <div className='w-1/3'>
                    <Dropdown name='country' options={countries} value={country}
                      onChange={(e) => {
                        handleChange(e)
                        setCountry(e.value)
                      }} placeholder="*Select a Country" className='text-black w-full' required />
                  </div>
                  <div className='w-1/3 flex items-center py-1 bg-white rounded-md border-2'>
                    <label className='mr-8 ml-2'>*Status: </label>
                    <div className='flex gap-x-4'>
                      <div className="form-control">
                        <label className="label cursor-pointer space-x-2">
                          <input name='status' value='Alive' type="radio" className="radio checked:bg-blue-500 border border-primary" required />
                          <span className="label-text text-gray-500">Alive</span>
                        </label>
                      </div>
                      <div className="form-control">
                        <label className="label cursor-pointer space-x-2">
                          <input name='status' value='Dead' type="radio" className="radio checked:bg-red-500 border border-primary" required />
                          <span className="label-text text-gray-500">Dead</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex w-full gap-x-12'>

                  <div className='w-1/3'>
                    <Dropdown name='force' options={forces} value={force}
                      onChange={(e) => {
                        handleChange(e)
                        setForce(e.value)
                      }} placeholder="*Select a Force" className='text-black w-full' required />
                  </div>
                  <div className='w-1/3'>
                    <Dropdown name='officialRank' options={force && (force == 'Army' ? armyRank : (force == 'Navy' ? navyRank : airForceRank))} value={rank} onChange={(e) => {
                      handleChange(e)
                      setRank(e.value)
                    }} placeholder="*Official Rank" className='text-black w-full' required />
                  </div>
                  <div className='w-1/3'>
                    <Dropdown name='freedomFighterRank' options={fighterRanks} value={fighterRank}
                      onChange={(e) => {
                        handleChange(e)
                        console.log(e.value);
                        setFighterRank(e.value)
                      }} placeholder="*Freedom Fighter Rank" className='text-black w-full' required />

                    {/* <select name='freedomFighterRank' onChange={(e) => console.log(e.value)} className="p-2.5 border-1 hover:border-primary rounded-md bg-white w-full" required>
                      <option value='' disabled selected>*Freedom Fighter Rank</option>
                      {
                        fighterRanks.map((fighter, index) => <option key={index} value={JSON.stringify(fighter)} className='p-2 hover:bg-gray-500'>{fighter.rank}</option>)
                      }
                    </select> */}
                  </div>
                </div>
                <div className='flex gap-x-12'>
                  <div className="relative w-1/2">
                    <div className="p-float-label w-full">
                      <InputTextarea name='address' id='address'
                        onChange={handleChange}
                        className=" w-full" required />
                      <label htmlFor="address">*Address</label>
                    </div>
                  </div>
                  <div className="relative w-1/2">
                    <div className="p-float-label w-full">
                      <InputTextarea name='description' id='description'
                        onChange={handleChange}
                        className=" w-full" />
                      <label htmlFor="description">Description</label>
                    </div>
                  </div>
                </div>
                <div className='relative'>
                  <label className='text-gray-400 ml-1'>Photo</label>
                  <input name='file' type="file"
                    onChange={handleFileChange}
                    className="file-input file-input-primary input-bordered file-input-sm w-full bg-white text-gray-400" />
                </div>

                <div className='text-center pt-20'>
                  <Button type='submit' label="Submit" icon="pi pi-check" className='p-button-info p-button-sm' />
                </div>
              </form>
            </div>
          </Dialog >
          {/* <div className='p-2 border-2 shadow-md bg-white rounded-md mb-4'>
            <div className='flex justify-between items-center mb-2'>
              <div className='text-gray-800 text-xl font-bold'>
                <p>Member List</p>
              </div>
              <div className='space-x-4'>
                <Dropdown name='filter' value={filter}
                  options={
                    [
                      // { label: 'Army', value: 'Army' },
                      // { label: 'Navy', value: 'Navy' },
                      // { label: 'Air Force', value: 'Air Force' },
                      { label: 'Freedom Fighter', value: 'Freedom Fighter' },
                      { label: 'General Invitees', value: 'General Invitees' },
                      { label: 'Retired', value: 'Retired' }
                    ]
                  }
                  onChange={(e) => { setFilter(e.value) }} placeholder="Filter" />
                <span className="p-input-icon-left w-full md:w-auto">
                  <i className="pi pi-search" />
                  <InputText type="search" onInput={(e) => { setSearchValue(e.target.value) }} placeholder="Search..." className="w-full lg:w-auto" />
                </span>
              </div>
            </div>
            <table className="table-auto container w-full mx-auto shadow-md">
              <thead className='bg-slate-200 text-gray-800'>
                <tr className='w-full text-left rounded-t-md'>
                  <th className='p-2 rounded-tl-md'>Name</th>
                  <th>Category</th>
                  <th>Force</th>
                  <th>Official Rank</th>
                  <th>Upadhi</th>
                  <th>Status</th>
                  <th>Attended</th>
                  <th className='rounded-tr-md'>Action</th>
                </tr>
              </thead>
              <tbody className=' bg-white'>
                {
                  freedomFightersData && freedomFightersData?.filter(fighter => {
                    if (searchValue == '') {
                      return fighter;
                    }
                    else if (fighter.name.toLowerCase().includes(searchValue.toLowerCase())) {
                      return fighter;
                    }
                  }).splice(currentPage * 10, 10)?.map(fighter =>
                    <FreedomFighterRow key={fighter._id} freedomFighter={fighter} refreshData={handlePageClick}></FreedomFighterRow>
                  )
                }
              </tbody>
            </table>


            <div className='w-full text-gray-600 p-2 bg-white rounded-b-md'>
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                // onPageChange={handlePageClick}
                onPageChange={(e) => setCurrentPage(e.selected)}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="< prev"
                renderOnZeroPageCount={null}
                className='flex gap-x-4 justify-center items-center'
                activeClassName='bg-primary/30 text-gray-900 px-4 py-2 rounded-full font-semibold btn btn-circle btn-info'
              />
            </div>
          </div> */}
          <div className="flex ">
            <div className="flex flex-col gap-4 col-12 xl:col-6">
              <div className=''>
                <div className=" p-4 bg-white shadow-lg">
                  <h5 className='text-gray-700'>Sales Overview</h5>
                  <Chart type="bar" data={lineData} />
                </div>
              </div>
              <div className=''>
                <div className=" p-4 bg-white shadow-lg">
                  <h5 className='text-gray-700'>Sales Overview</h5>
                  <Chart type="line" data={lineData} />
                </div>
              </div>
            </div>
            <div className="col-12 xl:col-6">
              <div className=" p-4 bg-white shadow-lg">
                <div className="flex justify-between text-gray-700 mb-1">
                  <h5 className='text-gray-700'>New Members</h5>
                  <Link href='/freedom-fighters' className='hover:bg-primary rounded px-1 transition-all ease-in duration-200'>Browse All</Link>
                </div>
                <DataTable value={freedomFightersData} rows={5} responsiveLayout="scroll" scrollHeight="60vh">
                  {/* <Column header="Image" body={(data) => <img className="shadow-2" src={`${contextPath}/demo/images/product/${data.image}`} alt={data.image} width="50" />} /> */}
                  <Column field="name" header="Name" sortable style={{ width: '35%' }} />
                  <Column field="category" header="Category" sortable style={{ width: '35%' }} />
                  <Column field="mobile" header="Name" sortable style={{ width: '35%' }} />

                </DataTable>
              </div>
            </div>

          </div>
        </div >
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