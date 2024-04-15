import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer/Footer.jsx'
import Navbar from './Navbar/Navbar.jsx'

export default function Layout({data,setUser}) {

 const navigate = useNavigate()
 
 function logOut()
  {
   localStorage.removeItem('userToken')
   setUser(null)
   navigate('/login')
  }


  return (
    <div>
        <Navbar data={data} logout={logOut}/>
        <div className="container">
        <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}
