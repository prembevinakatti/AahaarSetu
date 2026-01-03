import LandingPage from '@/components/LandingPage'
import React from 'react'
import { Route,Routes } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <div>
  
        <Routes>
            <Route path='/' element={<LandingPage/>}/>
        </Routes>
       
   
    </div>
  )
}

export default AppRoutes
