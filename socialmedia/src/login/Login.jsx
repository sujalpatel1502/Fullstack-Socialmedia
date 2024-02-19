import React, { useContext, useState } from 'react'
import "./login.scss"
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Login = () => {
    const [inputs,setInputs]=useState({
      username:"",
      password:""
    })
    const [err,setErr]=useState(null)
    const navigate=useNavigate();
    const handleChange=(e)=>{
        setInputs((prev) => ({...prev,[e.target.name]:e.target.value}));
    }
  const {login}=useContext(AuthContext)
  const handleLogin=async(e)=>{
    e.preventDefault();
    try {
     await login(inputs)
     navigate("/")
    } catch (error) {
      setErr(error.response.data)
    }
    login(inputs)
  }
  return (
    <div className='login'>
    
      <div className="card">
        <div className="left">
          <h1>Hello world</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          </p>
          <span>Don`t you have an account?</span>
          <Link to="/register">
          <button>Register</button>

          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder='Username' name='username' onChange={handleChange} />
            <input type="Password" placeholder='Password' name='password' onChange={handleChange} />
            {err && <h1>{err}</h1>}
            <button onClick={handleLogin}>Login</button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
