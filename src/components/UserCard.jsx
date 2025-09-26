import React from 'react'

const UserCard = ({user}) => {
  const{Name,LastName,Age,Gender,PhotoUrl,About}=user;
  console.log(user)
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
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard
