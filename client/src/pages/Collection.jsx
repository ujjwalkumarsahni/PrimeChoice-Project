import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext.jsx';
import { assets } from '../assets/assets.js';
import { Title } from '../components/Title.jsx';

const Collection = () => {
  const {products} = useContext(ShopContext);
  const [showFilters, setShowFilters] = useState(false);
  return (
    <div>
      <div>
        {/* Filter  */}
      <div>
        <p onClick={() => setShowFilters(!showFilters)}>FILTERS
          <img className={`h-3 sm:hidden ${showFilters ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* Category Filter */}
        <div className={`${showFilters ? '' : 'hidden'} sm:block`}>
          <p>CATEGORIES</p>
          <div>
            <p>
              <input type="checkbox" value={'Men'} /> Men
            </p>
            <p>
              <input type="checkbox" value={'Men'} /> Women
            </p>
            <p>
              <input type="checkbox" value={'Men'} /> Kids
            </p>
          </div>
        </div>
      </div>
      {/* subCategory filter */}
      <div className={`${showFilters ? '' : 'hidden'} sm:block`}>
        <p>TYPE</p>
        <div>
          <p>
            <input type="checkbox" value={'Topwear'} /> Topwear
          </p>
          <p>
            <input type="checkbox" value={'Bottomwear'} /> Bottomwear
          </p>
          <p>
            <input type="checkbox" value={'Winterwear'} /> Winterwear
          </p>
        </div>
      </div>
      </div>

      {/* right side */}
      <div>
        <Title text1="ALL" text2="COLLECTION" />
        {/* product sort */}
        <select name="" id="">
          <option value="relavent">Sort by: Relavent</option>
          <option value="low-high">Sort by: Low to High</option>
          <option value="high-low">Sort by: High to Low</option>
        </select>
      </div>
    </div>
  )
}

export default Collection