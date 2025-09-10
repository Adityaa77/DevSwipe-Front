import Footer from "./Footer";
import Navbar   from "./Navbar";
import { Outlet } from "react-router-dom";
import React from 'react'

const Body = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body
