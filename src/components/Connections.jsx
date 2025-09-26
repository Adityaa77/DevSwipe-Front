import React, { useEffect } from 'react'
import { BASE_URL } from '../utls/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utls/connectionSlice'

const Connections = () => {
    const connections=useSelector(store=>store.connections);
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
    if(!connections) return;
    if(connections.length===0)return<h1>No Connections Found</h1>

  return (
    <div className='text center my-10'>
      <h1 className='text-bold text-2xl'>Connections</h1>
         {connections.map((connection) => {
        const { _id, Name, LastName, PhotoUrl, Age, Gender, About } =
          connection;

        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={PhotoUrl}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {Name + " " + LastName}
              </h2>
              {Age && Gender && <p>{Age + ", " + Gender}</p>}
              <p>{About}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Connections;