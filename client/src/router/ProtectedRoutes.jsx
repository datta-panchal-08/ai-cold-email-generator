import React, { useContext } from 'react'
import {Navigate} from 'react-router-dom'
import { AuthContext } from '../auth/AuthProvider'

const ProtectedRoutes = ({children}) => {
    const {user} = useContext(AuthContext);
return user ? children : <Navigate to="/" replace />;
}

export default ProtectedRoutes