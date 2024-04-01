import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoutes from '../ProtectedRoutes/ProtectedRoutes'
import Homepage from '../Pages/Homepage'
import MyProfile from '../Pages/MyProfile'
import CreateArticle from '../Pages/CreateArticle'
import Preference from '../Pages/Preference'



function UserRoutes() {
  
  return (
    <Routes>
        
        <Route element={<ProtectedRoutes/>}>
            <Route path='/homepage/' element={<Homepage/>}/>
            <Route path='/profile/' element={<MyProfile/>}/>
            <Route path='/createarticle/' element={<CreateArticle/>}/>
            <Route path='/choosepreference/' element={<Preference/>}/>
            
        </Route>
    </Routes>
  )
}

export default UserRoutes