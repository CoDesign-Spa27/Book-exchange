import React, { useEffect } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate  = useNavigate();
    useEffect(()=>{
    
        const token = localStorage.getItem('token')
        if(!token){
            navigate('/login')
        }
    })
    
  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col">
  
    <Header className="w-full" />
 
    
     <Hero />
    

   
  </div>
  )
}

export default Home
