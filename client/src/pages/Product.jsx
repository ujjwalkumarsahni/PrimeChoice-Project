import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx';
import { assets } from '../assets/assets.js';
import RelatedProduct from '../components/RelatedProduct.jsx';

const Product = () => {
  const { productId } = useParams();
  const { products,currency } = useContext(ShopContext);
  const [productData,setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  

  const fetchProductData = () => {
    products.map((item) =>{
      if(item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;  // Prevents returning anything from map
      }
    })
  }
  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div>
      {/* product data */}
      <div>

        {/* product image */}
        <div>
          <div>
            {
              productData.image.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Product ${index}`}
                  onClick={() => setImage(img)}
                />
              ))
            }
          </div>
          <div>
            <img src={image} alt="" />
          </div>
        </div>
        
        {/* product info */}
        <div>
          <h1>{productData.name}</h1>
          <div>
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_dull_icon} alt="" />
            <p>(122)</p>
          </div>
          <p>{currency}{productData.price}</p>
          <p>{productData.description}</p>
          <div>
            <p>Select Size</p>
            <div>
              {productData.size.map((item, index) => (
                <button onClick={()=> setSize(item)} key={index} className={`${item === size ? 'border-orange-500' : ''}`}>{item}</button>
              ))}
            </div>
          </div>
          <button>ADD TO CART</button>
          <hr />
          <div>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description and reviews section */}
      <div>
        <div>
          <b>Description</b>
          <p>Review (122)</p>
        </div>
        <div>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
    </div>

    {/* display related product */}
    <RelatedProduct category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      {/* Loding the page */}
    </div>
  );
}

export default Product