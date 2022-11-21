import Footer from '../components/Navbar/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className='bg-gray-300 min-h-screen'>
      <Navbar />
      <div className='h-fit'>
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
