import React from 'react';
import * as Icons from "react-icons/vsc";
import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';


function SideBarLink({link,iconName}) {
    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();
    
    const matchRoute = (route) => {
        return matchPath( {path: route}, location.pathname);
    }
    
    return (
        <NavLink 
            to={link.path}
            className={` ${matchRoute(link.path) ? "bg-yellow-800 border-l-yellow-50 text-yellow-50" : "bg-opacity-0 border-l-transparent"}  
            text-richblack-5 px-8 py-2 text-sm font-medium border-l-4`}
            >
                <div className=' flex items-center gap-2'>
                    <Icon className=" text-lg"/>
                    <span>{link.name}</span>
                </div>
        </NavLink>
    );
}

export default SideBarLink;