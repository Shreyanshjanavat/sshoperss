import React, { useContext } from 'react'
import { Shopcontext } from '../components/Context/Shopcontext'
import { useParams } from 'react-router-dom';
import Breadcum from '../components/Breadcums/Breadcum';
import Productdisplay from '../components/Productdisplay/Productdisplay';
import Relatedproduct from '../components/Relatedproducts/Relatedproduct';

const Product = () => {
  const {all_product}=useContext(Shopcontext);
  const {product_id}=useParams();
  const product =all_product.find((e)=>e.id===Number(product_id))
  return (
    <div>
      <Breadcum product={product}/>
      <Productdisplay product={product}/>
      <Relatedproduct/>
      
    </div>
  )
}

export default Product
