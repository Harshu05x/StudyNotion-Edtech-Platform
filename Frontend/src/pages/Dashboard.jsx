import SideBar from '@/components/core/Dashboard/SideBar';
import { sidebarLinks } from '@/data/dashboard-links';
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

function Dashboard(props) {
    const { loading: authLoading } = useSelector(state => state.auth);
    const { loading: profileLoading } = useSelector(state => state.profile);

    if(authLoading || profileLoading){
        return (
            <div className='loader'>
                Loading...
            </div>
        )
    }

    return (
        <div className=' flex relative min-h-[calc(100vh-3.5rem)]'>
            <SideBar />
            <div className='w-[90%] mx-auto'>
                <div className=' mx-auto w-10/12 max-w-[1100px] py-10'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;