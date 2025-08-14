import React, { use, useContext } from 'react'
import { ShopContext } from '../context/ShopContext.jsx';

const RelatedProduct = () => {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = React.useState([]);

    useEffect(() => {
        if(products.length > 0) {
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter(item => category === item.category);
            productsCopy = productsCopy.filter(item => subCategory === item.subCategory);

            setRelated(productsCopy.slice(0, 5));
        }
    }, [products]);

  return (
    <div>RelatedProduct</div>
  )
}

export default RelatedProduct