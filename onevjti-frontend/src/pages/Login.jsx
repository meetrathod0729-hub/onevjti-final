import React, { useState } from 'react'
import Card from '../components/Card'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {


  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const [error,setError] = useState("")
  const { fetchUser }=useAuth();
  const handleSubmit = async(e) => {
    e.preventDefault()

    if (!username || !password) {
      return setError("Username and password required");
    }

    try {
      const res=await api.post("/users/login", {
      username: username.toLowerCase(),
      password,
    });

    await fetchUser();
    navigate("/"); 
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  }
};

  return (
     
     <div className="min-h-screen bg-gradient-to-br flex items-center justify-center overflow-hidden">

       <div className="absolute w-[500px] h-[500px]  blur-3xl rounded-full" />
    
        <Card><h1 className="text-3xl font-bold text-purple-400 text-center mb-8 tracking-wide">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
            <input value={username} onChange={(e)=> setUsername(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-zinc-50 shadow-inner" placeholder='Username'/>
            <input type='password' value={password} onChange={(e)=> setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-zinc-50 shadow-inner" placeholder='Password'/>

            {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
            <div className='text-right'>
              <Link to='/users/forgotpass' className=' text-purple-300 hover:underline '>Forgot password?</Link>
              </div>
            <button className="
            w-full mt-2 py-3 rounded-xl
            bg-purple-400 text-white font-semibold
            border
            hover:bg-purple-300 hover:text-white
            active:scale-95
            transition-all
          ">
            login
          </button>
          <Link  className='block text-purple-300 hover:underline' to='/users/register'>Dont have an account? Register </Link>
        </form></Card>
    </div>
  )

}

export default Login
