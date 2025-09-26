import React, { useEffect } from 'react'
import { BASE_URL } from '../utls/constants'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addConnections } from '../utls/connectionSlice'

const Connections = () => {
    const dispatch=useDispatch();
    const fetchconnections=async()=>{
        try{
            const res=await axios.get(BASE_URL+"/user/connections",{
                withCredentials:true,
            });
            dispatch(addConnections(res.data.data));
        }catch(err){

        }
    }

    useEffect(()=>{
       fetchconnections();
    },[])
  return (
    <div className='flex justify-center my-10'>
      <h1 className='text-bold text-2xl'>Connections</h1>
    </div>
  )
}

export default Connections
