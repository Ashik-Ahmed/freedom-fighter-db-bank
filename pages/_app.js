import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import '../styles/globals.css'
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";


function MyApp({ Component, pageProps }) {

  const cookie = new Cookies();
  const router = useRouter()

  const [user, setUser] = useState(false)

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

    const email = e.target.email.value;
    const password = e.target.password.value;

    await fetch('http://localhost:5000/api/v1/users/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(async data => {
        console.log(data)
        await cookie.set('TOKEN', data.data.token)
        router.reload()
      })
  }

  if (user) {
    return (
      <div className='bg-[#EFF3F8] min-h-screen'>
        <Navbar user={user} setUser={setUser} />
        <div className='h-fit pb-12'>
          <Component {...pageProps} />
        </div>
      </div>
    )
  }

  else {
    return (
      <div className="hero min-h-screen bg-[#EFF3F8]">
        <div className="hero-content flex-col">
          <p className='text-primary underline text-2xl font-bold'>Please Login</p>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input name='email' type="email" placeholder="email" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input name='password' type="password" placeholder="password" className="input input-bordered" />
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
