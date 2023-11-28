import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const PrivateRoute = () => {
    const { userinfo } = useSelector((state : RootState) => state.auth)
    return userinfo ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute