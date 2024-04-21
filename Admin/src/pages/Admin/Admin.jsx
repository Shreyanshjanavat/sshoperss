import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Route,Routes } from 'react-router-dom'
import Addproduct from '../../Components/Addproducts/Addproduct'
import Listproduct from '../../Components/Listproduct/Listproduct'
import AdminLogin from '../../pages/Admin/AdminLogin'

const Admin = () => {
  

  return (
    <div className='admin'>
      
      <Sidebar/>
        <Routes>
          <Route path='/addtoproduct' element={<Addproduct/>}/>
          <Route path='/listproduct' element={<Listproduct/>}/>
          
        </Routes>
      
    </div>
  )
}

export default Admin
