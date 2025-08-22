import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import { useContext } from 'react';

const Navbar = () => {
  const {token,setToken} = useContext(AppContext);
  const navigate = useNavigate()

  const logout = () =>{
      navigate('/')
      token && setToken('')
      token && localStorage.removeItem('token')
  }
  return (
    <>
      <div className='sticky top-0 left-0 z-50 border-b-4 border-sky-700 flex justify-between items-center px-4 sm:px-10 py-3 bg-gradient-to-r from-sky-200 via-sky-300 to-sky-400 text-black'>
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-sky-500 to-blue-500 bg-clip-text text-transparent">
            Prime<span className='bg-gradient-to-r from-black via-purple-500 to-sky-500 bg-clip-text text-transparent'>Choice</span><span className="text-pink-500">.</span>
          </h1>
        </Link>
        <div className='flex gap-6'>
          <button onClick={logout} className='bg-blue-600 text-white text-sm px-10 py-2 rounded-full cursor-pointer'>Logout</button>
        </div>
      </div>
    </>
  )
}

export default Navbar
