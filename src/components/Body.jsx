import Footer from "./Footer";
import Navbar   from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import {BASE_URL} from "../utls/constants";
import { useEffect } from "react";
import axios from "axios";

const Body = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const userData=useSelector((store)=>store.user);

  const fetchUser=async()=>{
    if(userData) return;
    try{
      const res=await axios.get(BASE_URL+"/profile/view",{
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    }catch(arr){
      if(err.staus==401){
      navigate('/login');
      }
      console.error(err);
    }
  };

  useEffect(()=>{
    
     fetchUser();
    
  },[])
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body
