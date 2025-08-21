import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets.js';

const Sidebar = () => {

    return (
        <div className='min-h-screen border-r dark:text-white'>
            <ul className='text-[#515151] mt-5'>
                <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer dark:text-white ${isActive ? 'bg-[#F2F3FF]  border-r-4 border-blue-600 dark:bg-gray-900' : ''}`} to={'/dashboard'}>
                    <img src={assets.home_icon} alt="" />
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>
                <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer dark:text-white ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-600 dark:bg-gray-900' : ''}`} to={'/orders'}>
                    <img src={assets.appointment_icon} alt="" />
                    <p className='hidden md:block'>Orders</p>
                </NavLink>
                <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer dark:text-white ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-600 dark:bg-gray-900' : ''}`} to={'/add'}>
                    <img src={assets.add_icon} alt="" />
                    <p className='hidden md:block'>Add Product</p>
                </NavLink>
                <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer dark:text-white ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-600 dark:bg-gray-900' : ''}`} to={'/list'}>
                    <img src={assets.people_icon} alt="" />
                    <p className='hidden md:block'>Product List</p>
                </NavLink>
                <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer dark:text-white ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-600 dark:bg-gray-900' : ''}`} to={'/driver-tracker'}>
                    <img src={assets.people_icon} alt="" />
                    <p className='hidden md:block'>Driver Tracker</p>
                </NavLink>
            </ul>
        </div>
    )
}

export default Sidebar