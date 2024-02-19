import React, { useContext } from 'react'
import Login from './login/Login'
import Register from './register/Register'
import {createBrowserRouter,RouterProvider,Route, Outlet, Navigate} from "react-router-dom"
import NavBar from './components/navBar/NavBar'
import LeftBar from './components/leftBar/LeftBar'
import RightBar from './components/rightBar/RightBar'
import Home from './home/Home'
import Profile from './profile/Profile'
import "./style.scss"
import { DarkModeContext } from './context/darkModeContext'
import { AuthContext } from './context/authContext'
import { QueryClient,  QueryClientProvider,useQuery } from "@tanstack/react-query";
function App() {
  const {darkMode}=useContext(DarkModeContext);
  console.log(darkMode);
  const queryClient=new QueryClient();
  const {currentUser}=useContext(AuthContext);
  const Layout=()=>{
    return(
      <QueryClientProvider client={queryClient}>

      <div className={`theme-${darkMode? "dark":"light"}`}>
        <NavBar/>
        <div style={{display:"flex"}}>
          <LeftBar/>
          <div style={{flex:6}}>
          <Outlet/>
          </div>
          <RightBar/>

        </div>
      </div>
      </QueryClientProvider>
    )
  }
  const ProtectedRoute=({children})=>{
    if(!currentUser){
      return <Navigate to="login"/>
    }else{
      return children
    }
  }
  const router=createBrowserRouter([
    {
      path:"/",
      element:<ProtectedRoute><Layout/></ProtectedRoute>,
      // to decide which outlet we are using
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/profile/:id",
          element:<Profile/>
        }
      ]
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/register",
      element:<Register/>
    }
  ])
  return (
    <div>
    {/* <Login/> */}
    {/* <Register/> */}
    <RouterProvider router={router}/>
    </div>
  )
}

export default App