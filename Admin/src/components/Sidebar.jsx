import { NavLink } from 'react-router-dom';
import { Home, PlusCircle, ShoppingCart, List } from 'lucide-react';

const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-60 cursor-pointer dark:text-white 
    ${isActive ? 'bg-sky-200 text-black border-r-8 border-blue-600 dark:bg-gray-900' : ''}`;

  return (
    <div className="min-h-screen border-r dark:text-white">
      <ul className="text-black mt-5">
        <NavLink className={linkClasses} to="/">
          <Home size={20} />
          <p className="hidden md:block">Dashboard</p>
        </NavLink>

        <NavLink className={linkClasses} to="/add">
          <PlusCircle size={20} />
          <p className="hidden md:block">Add Product</p>
        </NavLink>

        <NavLink className={linkClasses} to="/orders">
          <ShoppingCart size={20} />
          <p className="hidden md:block">Orders</p>
        </NavLink>

        <NavLink className={linkClasses} to="/list">
          <List size={20} />
          <p className="hidden md:block">All Product</p>
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
