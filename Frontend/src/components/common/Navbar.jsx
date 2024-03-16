import React, { useEffect, useState } from 'react';
import { Link, NavLink, matchPath, useLocation } from 'react-router-dom';
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from '../../data/navbar-links';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from "react-icons/ai";
import CatalogDropDown from './CatalogDropDown';
import ProfileDropDownMenu from '../Auth/ProfileDropDownMenu';
  

function Navbar(props) {
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector( (state) => state.profile);
    const {totalItems} = useSelector( (state) => state.cart);
    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath( {path: route}, location.pathname);
    }
    return (
        <div className=' flex items-center justify-center h-14 border-b-2 border-b-richblack-700'>
            <div className=' w-10/12 max-w-maxContent flex items-center justify-between'>
                {/* Image  */}
                <Link to={'/'}>
                    <img src={logo} alt="" width={160} height={42} loading='lazy'/>
                </Link>

                {/* Nav Links  */}
                <nav>
                    <ul className=' flex gap-x-6 items-center text-richblack-25'>
                        {
                            NavbarLinks.map( (link,i) => (
                                <li key={i}>
                                    {
                                        link.title === "Catalog" ?
                                        (
                                            <CatalogDropDown link={link}/>

                                        )
                                        :
                                        (
                                            <NavLink to={link?.path}>
                                                <p className={`${matchRoute(link?.path) && "text-yellow-25"}`}>
                                                    {link?.title}
                                                </p>
                                            </NavLink>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                {/* LogIn/SignUp/DashBoard  */}
                <div className=' flex gap-x-4 items-center'>
                    {
                        user && user.accountType === "Student" &&
                        (
                            <Link to={"/dashboard/cart"} className=' relative text-richblack-5 text-2xl'>
                                <AiOutlineShoppingCart />
                                {
                                    totalItems > 0 && 
                                    <span 
                                    className=' animate-bounce absolute text-yellow-50 text-xs bg-richblack-600 rounded-full p-1 px-2 -top-2 left-2'>
                                        {totalItems}
                                    </span>
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && 
                        (
                            <Link to={"/login"}>
                                <button className=' border border-richblack-700 text-richblack-100 
                                bg-richblack-800 px-3 py-2 rounded-md'>
                                    Log In
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && 
                        (
                            <Link to={'/signup'}>
                                <button className=' border border-richblack-700 text-richblack-100 
                                bg-richblack-800 px-3 py-2 rounded-md'>
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropDownMenu />
                    }
                </div>
            </div>
        </div>
    );
}

export default Navbar;