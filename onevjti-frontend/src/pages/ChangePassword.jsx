import React, { useState } from 'react'
import api from "../api/axios"
import Card from '../components/Card';
import { Navigate, useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{

        e.preventDefault();

        setError("");
        setSuccess("");

        if(!oldPassword || !newPassword){
            setError("All the fields are required");
            return 
        }

        if(newPassword.length<6){
            setError("The new password must be at least 6 characters");
            return 
        }

        try{
            setLoading(true)

             await api.post("/users/change-password", {
                
                oldPassword,
                newPassword,
            });


            setSuccess("Password changes successfully")
            setOldPassword("")
            setNewPassword("");
            setTimeout(()=>{
              navigate("/users/login")
            },1500)
           
        }catch(err){
            setError(
                err?.response?.data?.message || "something went wrong"
            );
        }finally{
            setLoading(false);
        }

     };
    
  return (
    <div >
        <div className="min-h-screen bg-gradient-to-br flex items-center justify-center overflow-hidden">

       <div className="absolute w-[500px] h-[500px]  blur-3xl rounded-full" />

        <Card className>
            <h1 className="text-3xl font-bold text-purple-400 text-center mb-8 tracking-wide">
          Change Password
        </h1>
        <form
        className='space-y-4'
        onSubmit={handleSubmit}>

              
        {success && (
          <p className="text-green-500 text-sm mb-3">{success}</p>
        )}

            <input 
            type="password" 
            value = {oldPassword}
            onChange={(e)=>setOldPassword(e.target.value)}
            placeholder='Old password'
            className="w-full px-4 py-3 rounded-xl bg-zinc-50 shadow-inner"
            />
            <input 
            type="password" 
            value = {newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-zinc-50 shadow-inner"
            placeholder='New password'
            />

            {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

             <button
          type="submit"
          disabled={loading}
          className="
            w-full mt-2 py-3 rounded-xl
            bg-purple-400 text-white font-semibold
            border
            hover:bg-purple-300 hover:text-white
            active:scale-95
            transition-all
          ">
          {loading ? "Updating..." : "Change Password"}
        </button>

        </form>
        </Card>
      </div>
    </div>
  )

};
export default ChangePassword