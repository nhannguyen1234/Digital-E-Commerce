import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import path from 'ultils/path';
import { useSelector } from 'react-redux';
import { AdminSidebar } from 'components';
const Admin = () => {
    const { isLoggedIn, current } = useSelector((state) => state.user);
    if (!isLoggedIn || !current || +current.role === 2001) return <Navigate to={`/${path.LOGIN}`} replace={true} />;
    return (
        <div className='w-full flex min-h-screen relative overflow-hidden'>
            <div className='w-[240px] h-full flex-none fixed'>
                <AdminSidebar />
            </div>
            <div className='flex-auto bg-gray-100 ml-[240px]'>
                <Outlet />
            </div>
        </div>
    );
};

export default Admin;
