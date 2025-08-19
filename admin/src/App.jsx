import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Login.jsx'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import AddProduct from './pages/AddProduct.jsx';
import AllProductList from './pages/AllProductList.jsx';
import Orders from './pages/Orders.jsx';
import { AppContext } from './context/AppContext.jsx';

const App = () => {
  const { token } = useContext(AppContext)
  const [isDarkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className='bg-gray-50 dark:bg-gray-950 dark:text-white'>
      {token === ''
        ? <>
          <ToastContainer />
          <Login />
        </>
        : <>
          <ToastContainer />
          <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <div className='flex items-start'>
            <Sidebar />
            <Routes>
              <Route path='/' element={<></>} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/list' element={<AllProductList />} />
              <Route path='/add' element={<AddProduct />} />
            </Routes>
          </div>
        </>}
    </div>
  )
}

export default App