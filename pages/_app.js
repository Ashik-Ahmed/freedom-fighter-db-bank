import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import '../styles/globals.css'
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
// import "primereact/resources/themes/lara-light-blue/theme.css";
import 'primereact/resources/themes/saga-blue/theme.css';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import Sidebar from '../components/Sidebar/Sidebar';


function MyApp({ Component, pageProps }) {

  const cookie = new Cookies();
  const router = useRouter()

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
    e.preventDefault()
    setPassError('')

    const email = e.target.email.value;

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
        }
        else {
          cookie.set('TOKEN', data.data.token)
          setPassError('')
          router.reload();
        }
      })
  }

  if (user) {
    return (
      <div className='bg-[#EFF3F8] min-h-[100vh]'>
        {/* <Navbar user={user} setUser={setUser} /> */}
        <div className='min-h-[100vh] flex flex-row justify-start'>
          <Sidebar user={user} setUser={setUser} />
          <div className='w-full m-2'>
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    )
  }

  else {
    return (
      <div className="hero bg-[#EFF3F8] min-h-[100vh]">
        <div className="hero-content flex-col">
          <p className='text-primary underline text-2xl font-bold'>Please Login</p>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="p-float-label p-input-icon-right mt-4">
                {/* <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label> */}
                {/* <input name='email' type="email" placeholder="email" className="input input-bordered" /> */}
                <i className="pi pi-envelope" />
                <InputText type="email" name='email' id='email' className=' bg-gray-200 text-gray-700 w-full' required />
                <label htmlFor="email">*Email</label>
              </div>
              <div className="p-float-label mt-4">
                {/* <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label> */}
                {/* <input name='password' type="password" placeholder="password" className="input input-bordered" /> */}
                {/* <Password name='password' id='password' onChange={(e) => setPassword(e.target.value)} toggleMask feedback={false} required className={`${passError}&& 'p-invalid'`} /> */}
                <div className='p-float-label '>
                  <Password onChange={(e) => setPassword(e.target.value)} toggleMask feedback={false} required className={`${passError}&& 'p-invalid'`} />
                  <label htmlFor="password">*Password</label>
                </div>
                {
                  passError && <p className='text-red-500 text-xs italic'>{passError}</p>
                }
              </div>
              <div>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input type='submit' value='Login' className="btn btn-primary" />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default MyApp
