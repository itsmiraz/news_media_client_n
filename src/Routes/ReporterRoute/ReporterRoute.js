import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import useReporter from '../../Hooks/UseReporter/useReporter';
import { AuthContext } from '../Context/AuthContext/UserContext';

const Private = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()
    const [isReporter, isReporterLoading] = useReporter(user?.email)
    if (loading||isReporterLoading) {

        return <div className='flex justify-center m-80'><SyncLoader
            color="hsla(86, 0%, 100%, 1)"
            size={15}
        /></div>

    }

    if (user && user.uid && isReporter) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>





};

export default Private;