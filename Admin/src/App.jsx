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

  return (
    <div className='bg-sky-50'>
      {token === ''
        ? <>
          <ToastContainer />
          <Login />
        </>
        : <>
          <ToastContainer />
          <Navbar />
          <div className='flex items-start'>
            <Sidebar />
            <Routes>
              <Route path='/' element={<Dashboard />} />
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