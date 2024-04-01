import React from 'react'

import { Outlet } from 'react-router-dom'
import LoginPage from '../Pages/LoginPage'


function ProtectedRoutes() {
    const token = localStorage.getItem('token')
    if (token){
      
        return <Outlet/>
    } else {
      return <LoginPage/>
    }
}

export default ProtectedRoutes