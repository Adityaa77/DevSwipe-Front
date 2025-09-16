import axios from 'axios';
import React from 'react'
import { useState } from 'react';

const Login = () => {
  const [emailId,setEmailId]=useState("");
  const [password,setPassword]=useState("");

  const HandleLogin = async () => {
  try {
    const res = await axios.post("http://localhost:5173/login", {
      emailId,
      password,
    });
    console.log("Login successful:", res.data);
    // You can redirect or show a success message here
  } catch (err) {
    console.error("Login failed:", err.response?.data || err.message);
    // Optionally show an error message to the user
  }
};

  return (
  <div className='flex justify-center my-10'>
  <div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center ">Login</h2>
    <div>
    {/* email */}
            <label className="input validator">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <path d="M22 6l-10 7L2 6" />
                </g>
              </svg>
            <input
          type="email"
  required
  value={emailId}
  placeholder="Email"
  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$"
  title="Enter a valid email address"
  onChange={(e)=>setEmailId(e.target.value)}
/>
            </label>
            <p className="validator-hint">
              Enter a valid email address
            </p>

{/* password */}
<label className="input validator">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
      ></path>
      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
    </g>
  </svg>
  <input
    type="password"
    required
    value={password}
    placeholder="Password"
    minLength={8}
    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
    onChange={(e)=>setPassword(e.target.value)}
  /> 
</label>
<p className="validator-hint hidden">
  Must be more than 8 characters, including
  <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
</p>
    </div>
    <div className="card-actions justify-end">
      <button className="btn btn-primary"onClick={HandleLogin}>
        Login</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login
