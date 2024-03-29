import { useEffect, useRef, useState } from 'react'
import '../styles/globals.css'
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
// import "primereact/resources/themes/lara-light-blue/theme.css";
import 'primereact/resources/themes/saga-blue/theme.css';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import Sidebar from '../components/Sidebar/Sidebar';
import Login from '../components/Login/Login';
import { Toast } from 'primereact/toast';


function MyApp({ Component, pageProps }) {

  const cookie = new Cookies();
  const router = useRouter()
  const toast = useRef(null)

  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(false)
  const [password, setPassword] = useState('');
  const [passError, setPassError] = useState('');

  useEffect(() => {
    if (cookie.get('TOKEN')) {
      fetch('http://localhost:5000/api/v1/users/getLoggedInUser', {
        method: 'GET',
        headers: {
          authorization: `Bearer ${cookie.get('TOKEN')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            setUser(data.user)
          }
        })
    }
  }, [])


  const handleLogin = async (e) => {
    setLoading(true)
    e.preventDefault()
    setPassError('')

    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    await fetch('http://localhost:5000/api/v1/users/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.status !== 'success') {
          setPassError(data.error)
          console.log(data.error)
          setLoading(false)
        }
        else {
          cookie.set('TOKEN', data.data.token)
          setPassError('')
          setLoading(false)
          toast.current.show({ severity: 'success', summary: 'Success', detail: 'Successfully Logged in', life: 3000 });
          router.reload();
        }
      })
  }

  if (user) {
    return (
      <div className='bg-[#EFF3F8] min-h-[100vh]'>
        {/* <Navbar user={user} setUser={setUser} /> */}
        <div className='min-h-[100vh] flex flex-row justify-start'>
          <div className='z-50'>
            <Sidebar user={user} setUser={setUser} />
          </div>
          <div className='h-screen w-full p-2 text-gray-700 overflow-auto z-20'>
            <Component user={user} {...pageProps} />
          </div>
        </div>
      </div>
    )
  }

  else {
    return (
      <div className='bg-[#EFF3F8] min-h-[100vh] flex items-center justify-center'>
        <Toast ref={toast} />
        <Login handleLogin={handleLogin} passError={passError} loading={loading} />
      </div >
      // <div className="hero bg-[#EFF3F8] min-h-[100vh]">
      //   <div className="hero-content flex-col">
      //     <p className='text-primary underline text-2xl font-bold'>Please Login</p>
      //     <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      //       <form onSubmit={handleLogin} className="card-body">
      //         <div className="p-float-label p-input-icon-right mt-4">
      //           {/* <div className="form-control">
      //           <label className="label">
      //             <span className="label-text">Email</span>
      //           </label> */}
      //           {/* <input name='email' type="email" placeholder="email" className="input input-bordered" /> */}
      //           <i className="pi pi-envelope" />
      //           <InputText type="email" name='email' id='email' className=' bg-gray-200 text-gray-700 w-full' required />
      //           <label htmlFor="email">*Email</label>
      //         </div>
      //         <div className="p-float-label mt-4">
      //           {/* <div className="form-control">
      //           <label className="label">
      //             <span className="label-text">Password</span>
      //           </label> */}
      //           {/* <input name='password' type="password" placeholder="password" className="input input-bordered" /> */}
      //           {/* <Password name='password' id='password' onChange={(e) => setPassword(e.target.value)} toggleMask feedback={false} required className={`${passError}&& 'p-invalid'`} /> */}
      //           <div className='p-float-label '>
      //             <Password onChange={(e) => setPassword(e.target.value)} toggleMask feedback={false} required className={`${passError}&& 'p-invalid'`} />
      //             <label htmlFor="password">*Password</label>
      //           </div>
      //           {
      //             passError && <p className='text-red-500 text-xs italic'>{passError}</p>
      //           }
      //         </div>
      //         <div>
      //           <label className="label">
      //             <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
      //           </label>
      //         </div>
      //         <div className="form-control mt-6">
      //           <input type='submit' value='Login' className="btn btn-primary" />
      //         </div>
      //       </form>
      //     </div>
      //   </div>
      // </div>
    )
  }
}

export default MyApp
