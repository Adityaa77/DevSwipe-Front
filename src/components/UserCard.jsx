import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utls/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utls/feedslice';

const UserCard = ({user}) => {
  const{_id, Name,LastName,Age,Gender,PhotoUrl,About}=user;
  const dispatch=useDispatch();

  const handleSendRequest=async(status,userId)=>{
    try{
    const res=await axios.post(
      BASE_URL + "/request/send/" + status +"/" + userId, {},
      {withCredentials:true}
    );
    dispatch(removeUserFromFeed(userId));
    }catch(err){

    }
  }


  return (
    <div className="card bg-base-300 w-96 shadow-sm">
  <figure className='my-2'>
    <img
      src={user.PhotoUrl}
      alt="Profile Photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{Name +" "+LastName}</h2>
    <p>{Age +" "+Gender}</p>
    <p>{About}</p>
    <div className="card-actions justify-center my-4">
      <button 
      className="btn btn-primary"
      onClick={()=>handleSendRequest("ignored",_id)}>Ignore</button>
      <button 
      className="btn btn-primary"
      onClick={()=>handleSendRequest("interested",_id)}>Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard
