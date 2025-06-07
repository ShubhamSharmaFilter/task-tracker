import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Notfound from '../pages/notfound.js'
import UserLogin from '../pages/userLogin.js'
import Account from '../pages/account.js'
import ProtectedRoute from '../config/protectedRoute.js'
import Unauthorized from '../pages/unauthorized.js'
import Settings from '../pages/settings.js'
import ResetPassword from '../pages/resetPassword.js'
import Dashboard from '../pages/dashboard.js'
import Tasks from '../pages/tasks.js'
import Notifications from '../pages/notifications.js'
import ManageTask from '../pages/manageTask.js'
import CreateTask from '../pages/createTask.js'
import UserRegister from '../pages/userRegister.js'


const RoutesPage = () => {
    return (
        <Routes>
            <Route path="/" element={<UserLogin />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="*" element={<Notfound />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/settings" element={<ProtectedRoute ><Settings /></ProtectedRoute>}/>
            <Route path="/account" element={<ProtectedRoute ><Account /></ProtectedRoute>}/>


            <Route path="/dashboard" element={<ProtectedRoute ><Dashboard /></ProtectedRoute>}/>
            <Route path="/tasks" element={<ProtectedRoute ><Tasks /></ProtectedRoute>}/>
            <Route path="/tasks/create" element={<ProtectedRoute ><CreateTask /></ProtectedRoute>}/>
            <Route path="/tasks/:id" element={<ProtectedRoute ><ManageTask /></ProtectedRoute>}/>
            
            <Route path="/notifications" element={<ProtectedRoute ><Notifications /></ProtectedRoute>}/>
            
        
            <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
    )
}

export default RoutesPage