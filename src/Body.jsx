import Navbar   from "./Navbar";

import React from 'react'

const Body = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default Body
