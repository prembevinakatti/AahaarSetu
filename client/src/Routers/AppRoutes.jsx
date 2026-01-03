import LandingPage from '@/components/LandingPage'
import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <div>
     <Router/>
        <Routes>
            <Route path='/' element={<LandingPage/>}/>
        </Routes>
        <Router/>
   
    </div>
  )
}

export default AppRoutes
