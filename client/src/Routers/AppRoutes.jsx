import LandingPage from '@/components/LandingPage'
import AdminLoginPage from '@/Pages/Admin/AdminLoginPage'
import AdminRegisterPage from '@/Pages/Admin/AdminRegisterPage'
import UserLoginPage from '@/Pages/User/UserLoginPage'
import UserRegisterPage from '@/Pages/User/UserRegisterPage'
import VolunteerLoginPage from '@/Pages/Volunteer/VolunteerLoginPage'
import VolunteerRegisterPage from '@/Pages/Volunteer/VolunteerRegisterPage'
import React from 'react'
import { Route,Routes } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <div>
  
        <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/AdminLogin' element={<AdminLoginPage/>}/>
            <Route path='/AdminRegister' element={<AdminRegisterPage/>}/>
            <Route path='/UserLogin' element={<UserLoginPage/>}/>
            <Route path='/UserRegister' element={<UserRegisterPage/>}/>
            <Route path='/VolunteerLogin' element={<VolunteerLoginPage/>}/>
            <Route path='/VolunteerRegister' element={<VolunteerRegisterPage/>}/>
        </Routes>
       
   
    </div>
  )
}

export default AppRoutes
