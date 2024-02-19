import React, { useState } from 'react'
import "./register.scss"
import { Link } from 'react-router-dom'
import axios from "axios"

const Register = () => {
  const [inputs,setInputs]=useState({
    username:"",
    email:"",
    password:"",
    name:""
  })
  const [err,setErr]=useState(null)
  const handleChange=(e)=>{
      setInputs((prev) => ({...prev,[e.target.name]:e.target.value}));
  }
  const handleClick=async(e)=>{
    // console.log("cameeeeeeeeeee");
      e.preventDefault();

      try { 
        await axios.post("http://localhost:8800/api/auth/register",inputs)
      } catch (error) {
        // alert("error",error)
        setErr(error.response.data)
      }
      // console.log("cameeeee2222");
  }
  console.log("inputsssssssss",inputs);
  return (
    <div className='register'>
    
      <div className="card">
        <div className="left">
          <h1>Dev Social</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder='Username'name='username' onChange={handleChange}/>
            <input type="email" placeholder='Email' name='email' onChange={handleChange}/>
            <input type="password" placeholder='Password'name='password' onChange={handleChange}/>
            <input type="text" placeholder='Name' name='name' onChange={handleChange}/>
            {err && <h1>{err}</h1>}
            <button onClick={handleClick}>Register</button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
