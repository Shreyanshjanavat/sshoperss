import React from 'react'
import Hero from '../components/Hero/Hero'
import Popular from '../components/Popular/Popular'
import Offers from '../components/Offers/Offers'
import New_collection from '../components/Newcollections/New_collection'
import Newsletter from '../components/Newsletter/Newsletter'



const Shop = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
      <Offers/>
      {/* <New_collection/> */}
      <Newsletter/>
      
      
      

    </div>
  )
}

export default Shop
