import React, { useEffect } from 'react'
import reducer from '../utls/userslice'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utls/constants';
import { addFeed } from '../utls/feedslice';

const Feed = () => {
  const feed=useSelector((store)=>store.feed);
 const dispatch=useDispatch();
  const getFeed=async ()=>{
   try {const res=await axios.get(BASE_URL+"/feed",{withCredentials:true});
    dispatch(addFeed(res.data))
   }catch(err){
    //todo error
   }
  };

  useEffect(()=>{
    getFeed();
  },[])


  return (
    <div>
      Feed
    </div>
  )
}

export default Feed
