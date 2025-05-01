import React, {  useEffect } from 'react'
import Home from './pages/Home/Home'
import { Routes,Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './components/firbase'
import { ToastContainer } from 'react-toastify';
const App = () => {

  const navigate=useNavigate();
  useEffect(()=>{
    onAuthStateChanged(auth,async(user)=>{
      if(user){
        console.log("logged in bitch");
        navigate('/');
      }
      else{
        console.log("loggin out bitch");
        navigate('/login')
      }
    })
  },[])
  return (
    <div>
      <ToastContainer  theme='dark'/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Player/:id' element={<Player/>}/>
      </Routes>
    </div>
  )
}

export default App
