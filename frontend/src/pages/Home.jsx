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
    {/* Ensure Header component takes up the full width */}
    <Header className="w-full" />

    {/* Main content area */}
    
     <Hero />
    

    {/* Optionally, you can add a footer or other elements */}
    {/* <footer className="p-4 text-center">
      Footer content
    </footer> */}
  </div>
  )
}

export default Home
